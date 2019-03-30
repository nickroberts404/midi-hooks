import { useState, useEffect } from 'react';

export const useMIDI = () => {
	const [connections, changeConnections] = useState({
		inputs: [],
		outputs: [],
	});
	useEffect(() => {
		navigator.requestMIDIAccess().then((access) => {
			const inputs = enrichInputs([...access.inputs.values()]);
			changeConnections({
				inputs,
				outputs: [...access.outputs.values()],
			});
			access.onstatechange = (e) => {
				changeConnections({
					inputs: [...access.inputs.values()],
					outputs: [...access.outputs.values()],
				});
			};
		});
	}, []);
	return [connections.inputs, connections.outputs];
};

// If listeners were kept in a general .listeners field then 100 functions listening for a noteOn event would get
// called for every clock tick. I imagine this would affect performance. There must be a better way than this as well!
function handleMIDIMessage(message) {
	const action = message.data[0] & 0xf0; // Mask channel/least significant bits;
	const leastSig = message.data[0] & 0x0f; // Mask action bits;
	switch (action) {
		case 0xb0:
			for (const key in this.controlListeners) {
				this.controlListeners[key](message.data[2], message.data[1], leastSig + 1); // (value, control, channel)
			}
			break;
		case 0x90:
			for (const key in this.noteOnListeners) {
				this.noteOnListeners[key](message.data[1], message.data[2], leastSig + 1); // (note, velocity, channel)
			}
			break;
		case 0x80:
			for (const key in this.noteOffListeners) {
				this.noteOffListeners[key](message.data[1], message.data[2], leastSig + 1); // (note, velocity, channel)
			}
			break;
		case 0xf0:
			for (const key in this.clockListeners) {
				this.clockListeners[key](leastSig); // (type)
			}
			break;
		default:
			break;
	}
}

// Listeners can be added/deleted from individual inputs.
// This allows an input to have multiple 'onmidimessage' functions instead of setting/resetting one
const enrichInputs = (inputs) =>
	inputs.map((input) => {
		input.clockListeners = {};
		input.noteOnListeners = {};
		input.noteOffListeners = {};
		input.controlListeners = {};
		input.onmidimessage = handleMIDIMessage;
		return input;
	});

export const useMIDIClock = (input) => {
	const [step, setStep] = useState(0);

	useEffect(() => {
		const handleClockMessage = () => {
			// Keep track of count through closure. Is there a better way?
			let steps = step;
			return (type) => {
				if (type === 0x08) setStep(steps++);
			};
		};
		input.clockListeners['midiClock'] = handleClockMessage();
		return () => delete input.clockListeners['midiClock'];
	}, [input]);
	return step;
};

export const useMIDIControl = (input, control) => {
	const [value, setValue] = useState(0);
	const handleControlMessage = (value, control, channel) => setValue(value);

	useEffect(() => {
		input.controlListeners['control'] = handleControlMessage;
		return () => delete input.controlListeners['control'];
	}, [input, control]);
	return value;
};

export const useMIDIOutput = (output) => {
	if (!output) return {};
	const noteOn = (note, velocity = 127, channel = 1) => {
		const noteOnAndChannel = 0x90 | getChannel(channel);
		output.send([noteOnAndChannel, note, velocity]);
	};
	const noteOff = (note, velocity = 127, channel = 1) => {
		const noteOffAndChannel = 0x80 | getChannel(channel);
		output.send([noteOffAndChannel, note, velocity]);
	};
	const cc = (value, control = 0x14, channel = 1) => {
		const ccAndChannel = 0xb0 | getChannel(channel);
		output.send([ccAndChannel, control, value]);
	};
	return { noteOn, noteOff, cc };
};

const getChannel = (channel) => {
	if (channel < 1 || channel > 16) return 0; //Channel 1
	return channel - 1;
};

import { useState, useEffect } from 'react';

export const useMIDI = () => {
	const [connections, changeConnections] = useState({
		inputs: [],
		outputs: [],
	});
	useEffect(() => {
		navigator.requestMIDIAccess().then((access) => {
			changeConnections({
				inputs: [...access.inputs.values()],
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

export const useMIDIInput = (
	input,
	{ onClock, onControl, onNoteOn, onNoteOff, onStart, onStop }
) => {
	if (!input) return {};
	input.onmidimessage = (message) => {
		const action = message.data[0] & 0xf0; // Mask channel/least significant bits;
		const leastSig = message.data[0] & 0x0f; // Mask action bits;
		switch (action) {
			case 0xb0:
				onControl &&
					onControl(message.data[2], message.data[1], leastSig + 1); // onControl(value, control, channel)
				break;
			case 0x90:
				onNoteOn &&
					onNoteOn(message.data[1], message.data[2], leastSig + 1); // onControl(note, velocity, channel)
				break;
			case 0x80:
				onNoteOff &&
					onNoteOff(message.data[1], message.data[2], leastSig + 1); // onControl(note, velocity, channel)
				break;
			case 0xf0:
				console.log(leastSig);
				switch (leastSig) {
					case 0x08:
						onClock && onClock();
						break;
					case 0x0a:
						onStart && onStart();
						break;
					case 0x0c:
						onStop && onStop();
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	};
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

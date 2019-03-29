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

export const useMIDIOutput = (output) => {
	if (!output) return [null, null];
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

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
	const noteOn = (note, velocity = 127) => {
		output.send([0x9c, note, velocity]);
	};
	const noteOff = (note, velocity = 127) => {
		output.send([0x8c, note, velocity]);
	};
	const cc = (value, control = 0x14) => {
		output.send([0xbc, 0x06, value]);
	};
	return [noteOn, noteOff, cc];
};

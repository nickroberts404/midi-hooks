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
		output.send([0x90, note, velocity]);
	};
	const noteOff = (note, velocity = 127) => {
		output.send([0x80, note, velocity]);
	};
	return [noteOn, noteOff];
};

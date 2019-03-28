import React, { useState, useEffect } from 'react';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [noteOn, noteOff, connection] = useMIDIOutput(outputs[0]);
	console.log(inputs, outputs);
	return <div>midi</div>;
};

const useMIDI = () => {
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

const useMIDIOutput = (output) => {
	const [connection, setConnection] = useState(output.connection);
	useEffect(() => {
		output.onstatechange = () => setConnection(output.connection);
		return () => (output.onstatechange = null);
	}, []);
	const noteOn = (note) => {};
	const noteOff = (note) => {};
};

export default App;

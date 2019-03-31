import React, { useState, useEffect } from 'react';
import {
	useMIDI,
	useMIDIClock,
	useMIDIControl,
	useMIDINote,
	useMIDINotes,
	useMIDIOutput,
} from '../midi-hooks';
import MIDIConnectionSelector from './MIDIConnectionSelector';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [inputID, setInputID] = useState();
	const [outputID, setOutputID] = useState();
	if (inputs.length < 1) return <div>No MIDI inputs</div>;
	const input = inputs.find((i) => i.id === inputID);
	if (input === undefined) setInputID(inputs[0].id);
	const output = outputs.find((o) => o.id === outputID);
	if (output === undefined) setOutputID(outputs[0].id);
	const handleOutputChange = (e) => setOutputID(e.target.value);
	const handleInputChange = (e) => setInputID(e.target.value);
	return (
		<div>
			<MIDIConnectionSelector
				value={inputID}
				onChange={handleInputChange}
				connections={inputs}
			/>
			<MIDIConnectionSelector
				value={outputID}
				onChange={handleOutputChange}
				connections={outputs}
			/>
			<MIDILog input={input} output={output} />
		</div>
	);
};

const MIDILog = ({ input, output }) => {
	const control15 = useMIDIControl(input, { control: 15 });
	const control14 = useMIDIControl(input, { control: 14 });
	return (
		<div>
			Control 15: {control15} Control14: {control14}
		</div>
	);
};

export default App;

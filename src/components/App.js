import React, { useState, useEffect } from 'react';
import {
	useMIDI,
	useMIDIClock,
	useMIDIControl,
	useMIDIControls,
	useMIDINote,
	useMIDINotes,
	useMIDIOutput,
} from '../midi-hooks';
import MIDIKnob from './MIDIKnob';
import MIDIConnectionSelector from './MIDIConnectionSelector';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [inputID, setInputID] = useState();
	const [outputID, setOutputID] = useState();
	const [knobValue, setKnobValue] = useState(0);
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
			<MIDIKnob input={input} output={output} control={80} />
		</div>
	);
};

export default App;

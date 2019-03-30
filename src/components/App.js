import React, { useState } from 'react';
import { useMIDI, useMIDIClock, useMIDIControl } from '../midi-hooks';
import MIDIConnectionSelector from './MIDIConnectionSelector';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [inputID, setInputID] = useState();
	if (inputs.length < 1) return <div>No MIDI inputs</div>;
	if (inputID === undefined) setInputID(inputs[0].id);
	const handleInputChange = (e) => setInputID(e.target.value);
	return (
		<div>
			<MIDIConnectionSelector
				value={inputID}
				onChange={handleInputChange}
				connections={inputs}
			/>
			<MIDIInputLog input={inputs.find((i) => i.id === inputID)} />
		</div>
	);
};

const MIDIInputLog = ({ input }) => {
	const value = useMIDIControl(input);
	const step = useMIDIClock(input);
	return (
		<div>
			Steps: {step} Value: {value}
		</div>
	);
};

export default App;

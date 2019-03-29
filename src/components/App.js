import React, { useState } from 'react';
import { useMIDI, useMIDIInput } from '../midi-hooks';
import MIDIConnectionSelector from './MIDIConnectionSelector';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [inputID, setInputID] = useState(0);
	if (inputs.length < 1) return <div>No MIDI inputs</div>;
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
	const [value, setValue] = useState(0);
	const [steps, setSteps] = useState(0);
	const onClock = () => setSteps(steps + 1);
	const onStop = () => setSteps(0);
	useMIDIInput(input, { onClock, onStop });
	return <div>Steps: {Math.floor(steps / 24)}</div>;
};

export default App;

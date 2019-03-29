import React, { useState } from 'react';
import { useMIDI } from '../midi-hooks';
import MIDIKnob from './MIDIKnob';
import MIDISwitch from './MIDISwitch';
import MIDIOutputSelector from './MIDIOutputSelector';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [outputIndex, setOutputIndex] = useState(0);
	if (outputs.length < 1) return <div>No MIDI outputs</div>;
	const handleOutputChange = (e) => setOutputIndex(e.target.value);
	return (
		<div>
			<MIDIOutputSelector
				value={outputIndex}
				outputs={outputs}
				onChange={handleOutputChange}
			/>
			<MIDISwitch output={outputs[outputIndex]} control={6} />
			<MIDIKnob output={outputs[outputIndex]} control={80} />
			<MIDIKnob output={outputs[outputIndex]} control={81} />
		</div>
	);
};

export default App;

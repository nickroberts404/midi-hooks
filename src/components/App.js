import React, { useState } from 'react';
import MIDIKnob from './MIDIKnob';
import { useMIDI } from '../midi-hooks';

const App = () => {
	const [inputs, outputs] = useMIDI();
	if (outputs.length < 1) return <div>No MIDI outputs</div>;
	return (
		<div>
			<MIDIKnob output={outputs[0]} control={6} />
			<MIDIKnob output={outputs[0]} control={7} />
		</div>
	);
};

export default App;

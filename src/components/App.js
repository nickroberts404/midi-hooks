import React, { useState } from 'react';
import Knob from './Knob';
import { useMIDI, useMIDIOutput } from '../midi-hooks';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [noteOn, noteOff, cc] = useMIDIOutput(outputs[0]);
	if (noteOn) noteOn(69);
	if (noteOff) window.setTimeout(() => noteOff(69), 200);
	const handleKnobChange = (v) => {
		if (cc) cc(v);
	};
	return (
		<div>
			<Knob initial={0} min={0} max={127} onChange={handleKnobChange} />
		</div>
	);
};

export default App;

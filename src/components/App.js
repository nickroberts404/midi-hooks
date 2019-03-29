import React from 'react';
import Knob from './Knob';
import { useMIDI, useMIDIOutput } from '../midi-hooks';

const App = () => {
	// const [inputs, outputs] = useMIDI();
	// const [noteOn, noteOff] = useMIDIOutput(outputs[0]);
	// if (noteOn) noteOn(69);
	// if (noteOff) window.setTimeout(() => noteOff(69), 200);
	return (
		<div>
			<Knob initial={0} min={0} max={255} />
		</div>
	);
};

export default App;

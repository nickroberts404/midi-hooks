import React from 'react';
import { useMIDI, useMIDIOutput } from '../midi-hooks';

const App = () => {
	const [inputs, outputs] = useMIDI();
	const [noteOn, noteOff] = useMIDIOutput(outputs[0]);
	if (noteOn) noteOn(69);
	if (noteOff) window.setTimeout(() => noteOff(69), 200);
	return <div>midi</div>;
};

export default App;

import React from 'react';
import { useMIDIOutput } from '../midi-hooks.js';

import Knob from './Knob';

const MIDIKnob = ({ output, control = 6, channel = 1 }) => {
	const { cc } = useMIDIOutput(output);
	const handleChange = (value) => {
		cc(value, control, channel);
	};
	return <Knob initial={0} min={0} max={127} onChange={handleChange} />;
};

export default MIDIKnob;

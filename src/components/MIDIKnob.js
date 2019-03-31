import React, { useEffect, useState } from 'react';
import { useMIDIOutput, useMIDIControl } from '../midi-hooks.js';

import Knob from './Knob';

const MIDIKnob = ({ output, input, control = 6, channel = 1 }) => {
	const [v, setv] = useState(0);
	const { cc } = useMIDIOutput(output);
	const controlInput = useMIDIControl(input, { control, channel });
	useEffect(() => {
		setv(controlInput.value);
	}, [controlInput.value]);
	const handleChange = (value) => {
		setv(value);
		cc(value, control, channel);
	};
	return <Knob value={v} min={0} max={127} onChange={handleChange} />;
};

export default MIDIKnob;

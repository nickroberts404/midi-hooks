import React from 'react';
import { useMIDIOutput } from '../midi-hooks';
import Switch from './Switch.js';

const MIDISwitch = ({ output, control, channel = 1 }) => {
	const { cc } = useMIDIOutput(output);
	const handleChange = (value) => {
		cc(value, control, channel);
	};
	return <Switch offValue={0} onValue={127} onChange={handleChange} />;
};

export default MIDISwitch;

import { useState, useEffect, useCallback } from 'react';

export const useKnobBehavior = (onChange, knobValue, min = 0, max = 100) => {
	// console.log(knobValue);
	const [value, setValue] = useState(knobValue || 0);
	const [active, setActive] = useState(false);
	const [movement, setMovement] = useState([0, 0]);
	const handleMouseDown = (e) => {
		setActive(true);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};
	const handleDoubleClick = (e) => {
		setValue(0);
	};
	const handleMouseMove = (e) => {
		setMovement([e.movementX, e.movementY]);
	};
	const handleMouseUp = (e) => {
		setActive(false);
		setMovement([0, 0]);
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};
	const cb = useCallback((ref) => {
		ref.addEventListener('mousedown', handleMouseDown);
		ref.addEventListener('dblclick', handleDoubleClick);
	}, []);
	useEffect(() => {
		if (movement[0] !== 0) {
			const useThis = knobValue === undefined ? value : knobValue;
			const newValue = Math.min(Math.max(useThis + movement[0], min), max);
			if (knobValue !== undefined) {
				setValue(newValue);
				onChange(newValue);
			} else setValue(newValue);
		}
	}, [movement]);
	useEffect(() => {
		if (knobValue === undefined) onChange(value);
	}, [value]);
	return [cb, knobValue !== undefined ? knobValue : value, active];
};

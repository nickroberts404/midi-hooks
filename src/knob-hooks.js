import { useState, useEffect, useCallback } from 'react';

export const useKnobBehavior = (
	onChange,
	initialValue = 0,
	min = 0,
	max = 100
) => {
	const [value, setValue] = useState(initialValue);
	const [active, setActive] = useState(false);
	const [movement, setMovement] = useState([0, 0]);
	const handleMouseDown = (e) => {
		setActive(true);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};
	const handleDoubleClick = (e) => {
		setValue(initialValue);
	};
	const handleMouseMove = (e) => {
		setMovement([e.movementX, e.movementY]);
	};
	const handleMouseUp = (e) => {
		setActive(false);
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};
	const cb = useCallback((ref) => {
		ref.addEventListener('mousedown', handleMouseDown);
		ref.addEventListener('dblclick', handleDoubleClick);
	}, []);
	useEffect(() => {
		if (movement[0] !== 0) {
			const newValue = Math.min(Math.max(value + movement[0], min), max);
			setValue(newValue);
		}
	}, [movement]);
	useEffect(() => onChange(value), [value]);
	return [cb, value, active];
};

import React from 'react';
import styled from 'styled-components';
import { useKnobBehavior } from '../knob-hooks';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const KnobBody = styled.div`
	height: 40px;
	width: 40px;
	background: ${(props) => props.gradient};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const KnobInner = styled.div`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background: #fff;
`;

// transform: rotate(${(props) => props.rotate}deg);
const Value = styled.div`
	font-family: Avenir;
	font-size: 0.75rem;
	color: #333;
`;
const convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
	return (
		((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
	);
};

const Knob = ({ initial, min, max }) => {
	const [ref, value, active] = useKnobBehavior(initial, min, max);

	const fullAngle = 270;
	const startAngle = (360 - fullAngle) / 2;
	const endAngle = startAngle + fullAngle;
	const currentDeg = Math.floor(
		convertRange(min, max, startAngle, endAngle, value)
	);

	const gradient = getGradient(startAngle, fullAngle, currentDeg);

	return (
		<Container>
			<KnobBody ref={ref} gradient={gradient} rotate={currentDeg}>
				<KnobInner />
			</KnobBody>
			<Value>{value}</Value>
		</Container>
	);
};

const getGradient = (
	startAngle,
	fullAngle,
	currentDeg,
	activeColor = 'orange',
	inactiveColor = '#eee',
	backgroundColor = '#fff'
) =>
	`conic-gradient(from ${startAngle - 180}deg, ${activeColor} ${currentDeg -
		startAngle}deg, ${inactiveColor} ${currentDeg -
		startAngle}deg ${fullAngle}deg, ${backgroundColor} ${fullAngle}deg)`;

export default Knob;

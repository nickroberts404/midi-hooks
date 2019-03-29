import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background: #eee;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const InnerSwitch = styled.div`
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background: ${(props) => (props.active ? 'orange' : '#ddd')};
`;
const Switch = ({ offValue = false, onValue = true, onChange }) => {
	const [value, setValue] = useState(offValue);
	const handleToggle = () => {
		const newValue = value === onValue ? offValue : onValue;
		setValue(newValue);
		onChange(newValue);
	};
	return (
		<Container onClick={handleToggle}>
			<InnerSwitch active={value === onValue} />
		</Container>
	);
};

export default Switch;

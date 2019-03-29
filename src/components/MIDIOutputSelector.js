import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const MIDIOutputSelector = ({ value, outputs, onChange }) => (
	<Container>
		<select onChange={onChange} value={value}>
			{outputs.map((output, i) => (
				<option value={i}>{output.name}</option>
			))}
		</select>
	</Container>
);

export default MIDIOutputSelector;

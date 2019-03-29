import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const MIDIConnectionSelector = ({ value, connections, onChange }) => (
	<Container>
		<select onChange={onChange} value={value}>
			{connections.map((connection) => (
				<option value={connection.id}>{connection.name}</option>
			))}
		</select>
	</Container>
);

export default MIDIConnectionSelector;

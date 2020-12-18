import React from 'react';
import ExpandTableComponent from '../components/Table';
import TableWrapper from '../components/TableWrapper';
import styled from 'styled-components';

const Styles = styled.div`
  // background-color: #fef5ec;
`;

const Payments = () => (
  <Styles>
    <TableWrapper>
      <ExpandTableComponent></ExpandTableComponent>
    </TableWrapper>
  </Styles>
);

export default Payments;

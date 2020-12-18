import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
  .headerRows {
    color: #6f1f88;
    border: none;
  }
  .table {
    display: inline-block;
    color: #bd036c;
    font-size: 0.95em;
  }
  .container {
    padding-top: 100px;
    display: flex;
    align-items: center;
    background-color: white;
  }
`;

const TableWrapper = props => {
  return (
    <StyledTable>
      <div className="container">{props.children}</div>
    </StyledTable>
  );
};

export default TableWrapper;

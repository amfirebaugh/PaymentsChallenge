import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  text-align: center;
  padding: 200px;
`;

const ErrorPage = () => (
  <Styles>
    <h3>"Error. Please return to Payments page."</h3>
  </Styles>
);

export default ErrorPage;

import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  background-color: #ffffff;
  a {
    font-size: 1.25rem;
    color: #466e84;
    &:hover {
      color: #4f758b;
    }
  }
  align-items: center;
`;

const MyNavbar = () => {
  return (
    <Styles>
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Payments Page
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className="nav-link disabled"
                aria-disabled="true"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </nav>
    </Styles>
  );
};

export default MyNavbar;

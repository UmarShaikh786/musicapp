import React from 'react';

function Navbar({ handleClick, setsong }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Ringtones</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex w-100" role="search">
            <input className="form-control me-2" onChange={(e) => setsong(e.target.value)} type="search" placeholder="Search Music Name" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit" onClick={handleClick}>Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
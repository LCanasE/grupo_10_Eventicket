import React from 'react';
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import SearchMovies from './SearchMovies';

function App() {
  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar />
        </div>
        <SearchMovies />
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import Row from './Row.js';
import Banner from './Banner.js';
import Nav from './Nav.js';
import requests from './requests.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Top Rated TV" fetchUrl={requests.fetchTopRatedTv} />
      <Row title="Drama Movies" fetchUrl={requests.fetchDramaMovies} />
      <Row title="Crime Movies" fetchUrl={requests.fetchCrimeMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Mystery Movies" fetchUrl={requests.fetchMysteryMovies} />
    </div>
  );
}

export default App;

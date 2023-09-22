import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './Layout';
import Home from './Home';
import SearchForm from './SearchForm';
import UserList from './UserList';
import UserDetails from './UserDetails';
import Chart from './Chart';
import Error from './Error';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className='container mt-4'>
                  {error && <Error message={error} />}
                </div>
                <Home setSearchResults={setSearchResults} setError={setError} />
              </div>
            }
          />
          <Route path="/search-form" element={<SearchForm setSearchResults={setSearchResults} />} />
          <Route path="/user-list" element={<UserList users={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/user-details/:username" element={<UserDetails />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

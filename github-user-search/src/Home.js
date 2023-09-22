import React from 'react';
import SearchForm from './SearchForm';

function Home({ setSearchResults, setError }) {
    return (
        <div className='container py-4'>
            <div className='row'>
                <div className='col-12'>
                    <SearchForm setSearchResults={setSearchResults} setError={setError} />
                </div>
            </div>
        </div>
    );
};

export default Home;

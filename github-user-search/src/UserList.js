import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import ReactApexChart from 'react-apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

function UserList({ users, setSearchResults }) {
  const [sBar, setSBar] = useState(null);

  useEffect(() => {
    const categories = [];
    const promises = users.map((user) => {
      categories.push(user.login);

      return axios.get(`https://api.github.com/users/${user.login}/followers`)
        .then((response) => response.data.length)
        .catch((error) => {
          console.error(`Error al obtener seguidores de ${user.login}: ${error.message}`);
          return 0;
        });
    });

    Promise.all(promises)
      .then((followerCounts) => {
        const newSBar = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          series: [
            {
              data: followerCounts,
            },
          ],
          xaxis: {
            categories: categories,
          },
        };

        setSBar(newSBar);
      })
      .catch((error) => {
        console.error('Error al obtener seguidores:', error);
      });
  }, [users]);

  if (users.length === 0) {
    return (
      <div className='container py-4'>
        <div className='row'>
          <div className='col-12 mb-4'>
            <SearchForm setSearchResults={setSearchResults} />
          </div>
          <div className='col-md-6 col-12'>
            <div>No se encontraron usuarios.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 mb-4'>
          <SearchForm setSearchResults={setSearchResults} />
        </div>
        <div className='col-md-6 col-12'>
          <div className='statbox widget box box-shadow'>
            <div className='widget-header'>
              <h4>Resultados</h4>
            </div>
            <div className='widget-content widget-content-area'>
              <div className="table-responsive">
                <table className="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                            {user.id}
                        </td>
                        <td>
                          <Link to={`/user-details/${user.login}`}>
                            {user.login}
                          </Link>
                        </td>
                        <td className="text-center">
                          <Link to={`/user-details/${user.login}`}>
                            <FontAwesomeIcon icon={faEye} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-6 col-12'>
          <div className="bar-chart">
            {sBar && (
              <ReactApexChart options={sBar} series={sBar.series} type="bar" height={350} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserList;

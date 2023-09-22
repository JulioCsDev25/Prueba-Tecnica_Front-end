import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faLocationPin, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function UserDetails() {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    }

    if (username) {
      fetchUser();
    }
  }, [username]);

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-12 user-profile'>
          <div className='widget-content widget-content-area'>
            {user ? (
              <div>
                <div class="text-center user-info">
                  <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
                  <p class="">{user.name}</p>
                </div>
                <div class="user-info-list">
                  <div class="">
                    <ul class="contacts-block list-unstyled">
                      <li class="contacts-block__item">
                        <FontAwesomeIcon icon={faCoffee} />
                        Web Developer
                      </li>
                      <li class="contacts-block__item">
                        <FontAwesomeIcon icon={faLocationPin} />
                        {user.location}
                      </li>
                      {user.email && user.email.trim() !== '' ? (
                        <li className="contacts-block__item">
                          <FontAwesomeIcon icon={faEnvelope} />
                          <Link to={`mailto:${user.email}`}>{user.email}</Link>
                        </li>
                      ) : (
                        <li className="contacts-block__item">
                          <FontAwesomeIcon icon={faEnvelope} />
                          Correo no proporcionado
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
// import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import { json, useRouteLoaderData } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import { getTokenPayload } from 'util/auth';

const animatedComponents = makeAnimated();

const SelectGenresModal = ({ innerRef, options }) => {
  const token = useRouteLoaderData('root');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [username, setUsername] = useState('');

  const handleGenresSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        genres: selectedGenres,
      };

      const response = await fetch('http://localhost:5000/store-user-genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast.success('Genres saved!', { position: 'bottom-right', autoClose: 2000, toastId: 'select-genres-toast' });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      const tokenPayload = getTokenPayload(token);
      setUsername(tokenPayload.username);
    }
  }, [token]);

  return (
    <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true' ref={innerRef}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Genres Selection
            </h5>
          </div>
          <div className='modal-body'>
            <p className='text-center'>Please select up to five genres based on your personal taste. This selection will help us to recommend films to you.</p>
            <div className='d-grid px-2'>
              <Select
                closeMenuOnSelect={false}
                onChange={(genre) => setSelectedGenres(genre)}
                components={animatedComponents}
                isMulti
                options={options}
                className='basic-multi-select'
                classNamePrefix='select'
                isOptionDisabled={() => selectedGenres.length >= 5}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={handleGenresSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectGenresModal;

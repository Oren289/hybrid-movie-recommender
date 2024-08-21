// import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { toast } from 'react-toastify';

const UpdateRatingModal = ({ rating, title, filmId, _id, innerRef }) => {
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newValue) => {
    setUserRating(newValue);
  };

  const handleUpdateRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        filmId: filmId,
        newRating: userRating,
        prevRating: rating,
        _id: _id,
      };

      const response = await fetch('http://localhost:5000/update-rating', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      toast.success('Rating updated!', { position: 'bottom-right', autoClose: 2000, toastId: 'submit-rating-toast' });
      window.location.reload();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    setUserRating(rating * 2);
  }, [rating]);

  return (
    <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true' ref={innerRef}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Update Rating
            </h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body text-center'>
            <h5>{title}</h5>
            <div className='d-flex justify-content-center align-items-center'>
              <div style={{ color: 'gold', fontSize: '2rem' }}>
                <Rating
                  start={0}
                  stop={10}
                  initialRating={userRating}
                  fractions={1}
                  onChange={(newValue) => handleRatingChange(newValue)}
                  fullSymbol={<i className='fa-solid fa-star'></i>}
                  emptySymbol={<i className='fa-regular fa-star'></i>}
                ></Rating>
              </div>
              <span className='ml-2' style={{ fontSize: '1.5rem' }}>
                ({userRating})
              </span>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-dismiss='modal'>
              Close
            </button>
            <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={handleUpdateRatingSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRatingModal;

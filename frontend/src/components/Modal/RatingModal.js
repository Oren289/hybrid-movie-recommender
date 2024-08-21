// import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ratingActions } from 'store/rating-slice';
import { getTokenPayload } from 'util/auth';

const RatingModal = ({ title, filmId, _id }) => {
  const [userRating, setUserRating] = useState(0);
  const { username } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleRatingChange = (newValue) => {
    setUserRating(newValue);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    const tokenPayload = getTokenPayload(localStorage.getItem('token'));
    try {
      if (userRating === 0) {
        return toast.error('Rating was not provided!', { position: 'bottom-right', autoClose: 2000, toastId: 'error-submit-rating-toast' });
      }

      const data = {
        username: username || tokenPayload.username,
        movieId: filmId,
        _id: _id,
        rating: userRating,
      };

      const response = await fetch('http://localhost:5000/store-rating', {
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

      dispatch(ratingActions.setUserRating(userRating / 2));
      toast.success('Rating saved!', { position: 'bottom-right', autoClose: 2000, toastId: 'submit-rating-toast' });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    console.log(userRating);
  }, [userRating]);

  return (
    <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Add to Watched List
            </h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body text-center'>
            <h5>{title}</h5>
            <p>Please rate this movie to add it into the watched list :)</p>
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
            <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={handleRatingSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;

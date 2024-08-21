import React from 'react';

const ConfirmModal = ({ title, innerRef, text, action }) => {
  return (
    <div class='modal fade' tabindex='-1' ref={innerRef}>
      <div class='modal-dialog modal-dialog-centered'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title'>{title}</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <p>{text}</p>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal'>
              Cancel
            </button>
            <button type='button' class='btn btn-danger' data-dismiss='modal' onClick={action}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

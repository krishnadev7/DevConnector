import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NotFound = () => {
  return(
      <Fragment>
          <h1 className='x-large text-primary'>
              <i className='fas fa-exclamation-triangle'>Page Not Found </i>
          </h1>
          <p className='large'>Sorry, this page does not exist </p>
      </Fragment>
  )
};

NotFound.propTypes = {};

export default NotFound;

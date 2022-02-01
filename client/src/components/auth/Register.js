import React, {Fragment, useState} from 'react';
// import axios from "axios";
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux'; //connect react app to redux S1:
import {setAlert} from '../../actions/alert'; //importing actions to perform S3:
import PropTypes from 'prop-types';
import {register} from '../../actions/auth';
const Register = (props) => {
  // set alert is actually props.setalert
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
  });
  //destructuring
  const {name, email, password} = formData;

  const onChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value}); // using onchange for every field
  };
  // tripple dot denotes all other data inside form data remains same and [] denotesto target name tag of all ccalling this function

  const onSubmit = async (e) => {
    e.preventDefault();
    props.register({name, email, password});
  };

  if (props.isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      {/* in REACT ACTION IS NOT USED WITH FORM  */}
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
//whenever we deal with props
Register.propTypes = {
  setAlert: PropTypes.func.isRequired, // func as setAlert is a function
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProp, {setAlert, register})(Register); // exporting connect S2:

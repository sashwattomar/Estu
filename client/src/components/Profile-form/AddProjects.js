import React, {Fragment, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addProjects} from '../../actions/profile';

const AddProjects = ({addProjects}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectTitle: ' ',
    projectDescription: ' ',
  });

  const {projectTitle, projectDescription} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'> Add New Project</h1>
        <p className='lead'>
          <i className='fas ' /> Great Projects standout your Resume
        </p>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addProjects(formData, navigate);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='projectTitle'
              value={projectTitle}
              onChange={onChange}
              required
            />
            <small className='form-text'>Enter your Role at Internship</small>
          </div>

          <div className='form-group'>
            <textarea
              name='projectDescription'
              cols='30'
              rows='5'
              placeholder='Job Description'
              // name={projectDescription}
              value={projectDescription}
              onChange={onChange}
            />
            <small className='form-text'>
              enter Key points seperated by commas example: My projects can help
              farmers, This project uses two servo motors
            </small>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddProjects.propTypes = {
  addprojects: PropTypes.func.isRequired,
};

export default connect(null, {addProjects})(AddProjects);

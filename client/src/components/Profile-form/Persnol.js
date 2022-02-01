import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPersnol} from '../../actions/profile';
import {withRouter} from 'react-router-dom';
const Persnol = ({addPersnol, history}) => {
  const [formData, setFormData] = useState({
    caste: '',
    address: '',
    age: '',
    tenthschool: '',
    twelfthschool: '',
    twelvethpercentage: ' ',
    temthpercentage: '',
    achivements: ' ',
    WEO: '',
    cno: '',
    iro: '',
    wet: '',
    cnt: '',
    irt: '',
    wett: '',
    cntt: '',
    irtt: '',
    projects: '',
    projectTitle: '',
    projectstwo: '',
    projectTitletwo: '',
    projectsthree: '',
    projectTitleThree: '',
  });
  const {
    age,
    tenthschool,
    twelfthschool,
    twelvethpercentage,
    temthpercentage,
    achivements,
    WEO,
    cno,
    iro,
    wet,
    cnt,
    irt,
    wett,
    cntt,
    irtt,
    projects,

    projectTitle,
    projectstwo,
    projectTitletwo,
  } = formData;

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPersnol(formData, history);
  };

  return (
    <Fragment>
      <h1
        className='large text-primary'
        style={{textAlign: 'center', textDecoration: 'underline'}}
      >
        Resume Details
      </h1>

      <small className='form-text lead' style={{color: 'red'}}>
        {' '}
        *Following details once enterd cannot be changed*{' '}
      </small>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder=' Enter your class 10 school name   '
            name='tenthschool'
            value={tenthschool}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your class 10th school name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder=' Enter your class 12 school name  '
            name='twelfthschool'
            value={twelfthschool}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>Enter your class 12th school name</small>
        </div>
        <div>
          <div class='mycontainer'>
            <div class='row'>
              <div class='col'>
                <div className='form-group'>
                  <input
                    type='text'
                    id='widthcontrol'
                    placeholder=' Enter your 12th percentage'
                    name='twelvethpercentage'
                    value={twelvethpercentage}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className='form-text'>
                    Enter your 12th percentage
                  </small>
                </div>
              </div>
              <div class='col'>
                <div className='form-group'>
                  <input
                    type='text'
                    id='widthcontrol'
                    placeholder=' Enter your 10 percentage '
                    name='temthpercentage'
                    value={temthpercentage}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className='form-text'>
                    Enter your 10th percentage
                  </small>
                </div>
              </div>
              <div class='col'>
                <div className='form-group'>
                  <input
                    type='text'
                    id='widthcontrol'
                    placeholder=' Enter your age'
                    name='age'
                    value={age}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className='form-text'> Enter your Age</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder=' Enter your college achievements'
            name='achivements'
            value={achivements}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Mention your college achievements if any seperated by commas
          </small>
        </div>
        <h1 className='large text-primary' style={{textAlign: 'center'}}>
          Work Experience:{' '}
        </h1>
        <small className='form-text lead'>
          For designing a single page resume your work experience must not be
          more than 3
        </small>
        <div className='row'>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder=' Enter work experience'
                name='WEO'
                value={WEO}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention keypoints of your Internship experience seperated by
                commas example: The project was as chat application, we are
                required to handle the database
              </small>
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Comapany Name'
                name='cno'
                value={cno}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention your Role as an Intern
              </small>
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Role/Position'
                name='iro'
                value={iro}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention your Role as an Intern
              </small>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder=' enter work experience'
                name='wet'
                value={wet}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Comapany Name'
                name='cnt'
                value={cnt}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention your Role as an Intern
              </small>
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Role/Position'
                name='irt'
                value={irt}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention your Role as an Intern
              </small>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder=' enter work experiencet'
                name='wett'
                value={wett}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Comapany Name'
                name='irtt'
                value={irtt}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention your Role as an Intern
              </small>
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Role/Position'
                name='cntt'
                value={cntt}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Mention your Role as an Intern
              </small>
            </div>
          </div>
        </div>

        <h1 className='large text-primary' style={{textAlign: 'center'}}>
          {' '}
          Projects Description:{' '}
        </h1>
        <small className='form-text lead'>
          Enter your best designed 2 projects
        </small>

        <div className='row'>
          <div className='col-10'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='   Mention your projects'
                name='projects'
                value={projects}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                {' '}
                Describe your projects seperated commas example : our machine
                can uses xyz technolgy , the machine can work without manual
                input{' '}
              </small>
            </div>
          </div>
          <div className='col-2'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Project Title'
                name='projectTitle'
                value={projectTitle}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'> Mention your Project Title</small>
            </div>
          </div>
          {/* <div className="col-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Project Title"
                name="projectTitle"
                value={projectTitle}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text"> Mention your Project Title</small>
            </div>
          </div> */}
        </div>

        <div className='row'>
          <div className='col-10'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='   Mention your projects'
                name='projectstwo'
                value={projectstwo}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='col-2'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Project Title'
                name='projectTitletwo'
                value={projectTitletwo}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          {/* <div className="col-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Project Title"
                name="projectTitletwo"
                value={projectTitletwo}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text"> Mention your Project Title</small>
            </div>
          </div> */}
        </div>
        {/* <div className="row">
          <div className="col-10">
            <div className="form-group">
              <input
                type="text"
                placeholder="   Mention your projects"
                name="projectsthree"
                value={projectsthree}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text"> Mention your Projects </small>
            </div>
          </div>
          <div className="col-2">
            <div className="form-group">
              <input
                type="text"
                placeholder="Project Title"
                name="projectTitlethree"
                value={projectTitleThree}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text"> Mention your Project Title</small>
            </div>
          </div>
        </div> */}

        {/* IMAGE SECTION OR FILE SECTION */}
        {/* <div className="form-group">
          <input
            type="file"
            name="userImage"
            className="custom-file-input"
            id="customFile"
            onChange={(e) => onChganeImage(e)}
           
          />
          <label className="custom-file-label" htmlFor="customFile">
            {" "}
            {fileName}{" "}
          </label>
        </div> */}

        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};
Persnol.propTypes = {
  addPersnol: PropTypes.func.isRequired,
};
export default connect(null, {addPersnol})(withRouter(Persnol));

/**  const onSubmit = (e) => {
    e.preventDefault();
    const formDataForFile = new FormData();
    formDataForFile.append("file", file); // check for this name 'file' in backend
    formDataForFile.append("age", age);
    formDataForFile.append("tenthschool", tenthschool);
    formDataForFile.append("twelfthschool", twelfthschool);
    formDataForFile.append("temthpercentage", temthpercentage);
    formDataForFile.append("achivements", achivements);
    formDataForFile.append("WEO", WEO);
    formDataForFile.append("iro", iro);
    formDataForFile.append("wet", wet);
    formDataForFile.append("irt", irt);
    formDataForFile.append("wett", wett);
    formDataForFile.append("irtt", irtt);
    formDataForFile.append("projects", projects);
    formDataForFile.append("projectTitle", projectTitle);
    formDataForFile.append("projectstwo", projectstwo);
    formDataForFile.append("projectTitletwo", projectTitletwo);
    formDataForFile.append("projectsthree", projectsthree);
    formDataForFile.append("projectTitleThree", projectTitleThree);
    addPersnol(formDataForFile, history); // Action
  }; */

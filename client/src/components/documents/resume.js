import React, {Fragment, useEffect, useRef} from 'react';
import {useReactToPrint} from 'react-to-print';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {Navigate} from 'react-router';
import Moment from 'react-moment';
const Resume = ({profile: {profile}, auth: {isAuthenticated}}) => {
  useEffect(() => {
    setAlert(
      'Make changes in your Edit profile section to see changes in your resume',
      'danger'
    );
  }, []);
  //printing pdf code
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });
  // if (!isAuthenticated) {
  //   return <Navigate to='/dashboard' />;
  // }
  return (
    <Fragment>
      <div style={{backgroundColor: '#e6e6e6'}}>
        <link
          rel='stylesheet'
          type='text/css'
          href='http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css'
          media='all'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css'
        />
        <link rel='stylesheet' type='text/css' href='resume.css' media='all' />
        <div id='doc2' className='yui-t7 container' ref={componentRef}>
          <br clear='all' />
          <div id='inner'>
            <div id='hd'>
              <div className='yui-gc'>
                <div className='yui-u first'>
                  <h1 className='ui header'>{profile.user.name}</h1>
                </div>

                <div className='yui-u'>
                  <div>
                    <a>{profile.user.email}</a> <br />
                    +91{profile.social.telegram} <br />
                    <a href=''>{profile.social.linkedin}</a>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{border: '1px solid black'}} />

            {/* <br /> */}
            {/* header complete */}
            <br />
            <div id='bd'>
              <div id='yui-main'>
                <div className='yui-b'>
                  <div className='yui-gf'>
                    <div className='yui-u first'>
                      <h3 className='ui header'>About</h3>
                      {/* <hr style={{border: '1px solid black'}} /> */}
                    </div>
                    <div className='yui-u'>
                      <p className='enlarge'>{profile.bio}</p>
                      {/* <hr style={{border: '1px solid black'}} /> */}
                    </div>
                  </div>

                  <br />
                  <div className='yui-gf'>
                    <div className='yui-u first'>
                      <h3 className='ui header'>Skills</h3>
                      {/* <hr style={{border: '1px solid black'}} /> */}
                    </div>
                    {/* /************************************************************************skill loop */}
                    <p className='yui-u enlarge'>
                      {profile.skills.map((skill, index) => (
                        <div key={index}>{skill}</div>
                      ))}
                    </p>
                  </div>
                  <br />
                  {/* <hr style={{border: '1px solid black'}} /> */}
                  {/* <br /> */}
                  {/* _______________________________________________________________Experience loop */}
                  <div className='yui-gf'>
                    <div className='yui-u first'>
                      <h3 className='ui header'>Experience</h3>
                    </div>

                    <div className='yui-u'>
                      <div className='job'>
                        {profile.experience.map((exp, index) => (
                          <div key={index}>
                            <div class='ui grid'>
                              <div class='three wide column'>
                                <h3>{exp.company}</h3>
                              </div>
                              <div class='three wide column'>
                                <h4>{exp.title}</h4>
                              </div>
                              <div class='three wide column'>
                                <h5>
                                  <Moment format='YYY/MM/DD'>{exp.from}</Moment>
                                  -
                                  {!exp.to ? (
                                    'Now'
                                  ) : (
                                    <Moment format='YYY/MM/DD'>{exp.to}</Moment>
                                  )}
                                </h5>
                              </div>
                            </div>
                            <br />

                            {exp.description.map((des, ind) => (
                              <div key={ind}>
                                <l>{des}</l>
                              </div>
                            ))}

                            <br></br>
                          </div>
                        ))}
                      </div>
                      <br />
                    </div>
                  </div>
                  {/* _____________________________________________________________________________projects loop */}
                  <div className='yui-gf'>
                    <div className='yui-u first'>
                      <h3 className='ui header'>Projects</h3>
                    </div>

                    <div className='yui-u'>
                      <div className='job'>
                        {profile.projects.map((proj, index) => (
                          <div key={index}>
                            <div class='ui grid'>
                              <div class='three wide column'>
                                <h3>{proj.projectTitle}</h3>
                              </div>
                              <div class='three wide column'>
                                <h5>
                                  <Moment format='YYY/MM/DD'>
                                    {proj.from}
                                  </Moment>
                                  -
                                  {!proj.to ? (
                                    'Now'
                                  ) : (
                                    <Moment format='YYY/MM/DD'>
                                      {proj.to}
                                    </Moment>
                                  )}
                                </h5>
                              </div>
                            </div>
                            <br />
                            <ul>
                              {proj.projectDescription.map((des, ind) => (
                                <l>
                                  <div key={ind}>{des}</div>
                                </l>
                              ))}
                            </ul>
                            <br></br>
                          </div>
                        ))}
                      </div>
                      <br />
                    </div>
                  </div>

                  {/* ___________________________________________________________________projects loop end */}
                  <div className='yui-gf'>
                    <div className='yui-u first'>
                      <h3 className='ui header'>Education</h3>
                    </div>

                    <div className='yui-u'>
                      <div className='job'>
                        <div class='ui grid'>
                          <div class='three wide column'>
                            <h4>{profile.collegeName}</h4>
                          </div>
                          <div class='three wide column'>
                            <h5>{profile.persnol.collegepercentage}</h5>
                          </div>
                          <div class='three wide column'>
                            <h5>{profile.stream}</h5>
                          </div>
                        </div>
                      </div>

                      <br />
                      <div className='job'>
                        <div class='ui grid'>
                          <div class='three wide column'>
                            <h4>{profile.persnol.tenthschool}</h4>
                          </div>
                          <div class='three wide column'>
                            <h5>{profile.persnol.temthpercentage}</h5>
                          </div>
                          {/* <div class='three wide column'>
                            <h5>2005-2007</h5>
                          </div> */}
                        </div>
                        <br />
                      </div>
                      <div className='job'>
                        <div class='ui grid'>
                          <div class='three wide column'>
                            <h4>{profile.persnol.twelfthschool}</h4>
                          </div>
                          <div class='three wide column'>
                            <h5>{profile.persnol.twelvethpercentage}</h5>
                          </div>
                          {/* <div class='three wide column'>
                            <h5>2005-2007</h5>
                          </div> */}
                        </div>
                        <br />
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleprint} className='btn btn-primary'>
        Print Resume
      </button>
    </Fragment>
  );
};
Resume.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps)(Resume);

// {profile.experience.map((exp, index) => (
//   <div key={index}>
// {exp.description.map((des, ind) => (
//   <div key={ind}>{des}</div>
// ))}
//   </div>
// ))}

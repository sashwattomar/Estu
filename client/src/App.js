import React, {Fragment} from 'react';
import Alert from './components/layout/alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/Profile-form/CreateProfile';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profile';
import EditProfile from './components/Profile-form/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/Profile-form/AddExperience';
import AddProjects from './components/Profile-form/AddProjects';
import Resume from './components/documents/resume';
import {Provider} from 'react-redux';
import store from './store';
import NotFound from './components/layout/NotFound';
// import Upload from './components/assignments/Upload';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <section className='container'>
            <Alert />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              {/* <Route exact path='/upload' element={<Upload />} /> */}
              <Route path='profiles' element={<Profiles />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route
                path='/dashboard'
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path='/resume'
                // element={<Resume />}
                element={<PrivateRoute component={Resume} />}
              />
              <Route
                path='/create-profile'
                element={<PrivateRoute component={CreateProfile} />}
              />
              <Route
                path='/edit-profile'
                element={<PrivateRoute component={EditProfile} />}
              />
              <Route
                path='/add-experience'
                element={<PrivateRoute component={AddExperience} />}
              />
              <Route
                path='/add-projects'
                element={<PrivateRoute component={AddProjects} />}
              />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

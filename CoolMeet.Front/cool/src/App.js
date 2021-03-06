import React, { Component } from 'react';
import MainMenu from './components/MainMenu/MainMenu'
import LoginPage from './components/LoginPage/LoginPage'
import EventInfo from './components/EventInfo/EventInfo';
import axios from "axios"
import RegisterPage from './components/RegisterPage/RegisterPage'
import './App.css';
import { history } from './helpers/history';
import { connect } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import LoggedUserEventList from './components/LoggedUserEventList/LoggedUserEventList';
import {authService} from './services/AuthService';
import EventAdminPanel from './components/EventAdminPanel/EventAdminPanel';
import moment from 'moment';
import 'moment/locale/pl';
import AllEvents from './components/AllEvents/AllEvents';
import AddEventForm from './components/AddEventForm/AddEventForm';
import UserSettingsPage from './components/UserSettingsPage/UserSettingsPage';
import TagPage from './components/TagPage/TagPage';
import { userActions } from './actions/userActions';
import UserPage from './components/UserPage/UserPage';
import CityMap from './components/Map/CityMap';
class App extends Component {

  constructor(props){
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
 
    });

    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = `bearer ${authService.getToken()}`
        return config;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      // Do something with response error
      if(error.response.status === 401){
        dispatch(userActions.logout());
        // authService.logout();
        history.replace('/login')
      }
      return Promise.reject(error);
    });

    moment.locale('pl'); 
  }

  

  render() {
      return (
        <Router history={history}>
        <div className="container-fluid mainContainer" style={{height : "100%"}}>
        <MainMenu/>
            <div className="col-12">
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/LoggedUserEventList" component={LoggedUserEventList} />
                <Route exact path="/events" component={AllEvents} /> 
                <Route path="/newEvent" component={AddEventForm}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route exact path="/eventInfo/:id" component={EventInfo} />
                <Route exact path="/eventAdministrationPanel/:id" component={EventAdminPanel} />
                <Route path="/userSettings" component={UserSettingsPage} />
                <Route exact path="/events/tag/:tagName" component={TagPage}/>
                <Route exact path="/user/:id" component={UserPage}/>
                <Route path="/cityMap" component={CityMap} />
              </Switch>
            </div>
        </div>
        </Router>
      );
     }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
      loggedIn,
      user
  };
}

export default connect(mapStateToProps)(App);

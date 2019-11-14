import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from 'app/AppContext';
import jwtService from 'app/services/jwtService';

class FuseAuthorization extends Component {

   constructor(props, context) {
      super(props);
      const { routes } = context;
      this.state = {
         accessGranted: true,
         routes
      };
   }

   componentDidMount() {
      if (!this.state.accessGranted) {
         this.redirectRoute();
      }
   }

   componentDidUpdate() {
      if (!this.state.accessGranted) {
         this.redirectRoute();
      }
   }

   static getDerivedStateFromProps(props, state) {
      const { location } = props;
      const { pathname } = location;
      const access_token = jwtService.getAccessToken();

      return {
         accessGranted: !access_token && pathname !== '/login' ? false : access_token && pathname === '/login' ? false : true
      };
   }

   shouldComponentUpdate(nextProps, nextState) {
      return nextState.accessGranted !== this.state.accessGranted;
   }

   redirectRoute() {
      const { location, history } = this.props;
      const { pathname, state } = location;
      const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';
      const access_token = jwtService.getAccessToken();

      if (!access_token) {
         history.push({
            pathname: '/login',
            state: {
               redirectUrl: pathname
            }
         });
      } else {
         history.push({
            pathname: redirectUrl
         });
      }
   }

   render() {
      return this.state.accessGranted ? <React.Fragment>{this.props.children}</React.Fragment> : null;
   }
}

FuseAuthorization.contextType = AppContext;

export default withRouter((FuseAuthorization));
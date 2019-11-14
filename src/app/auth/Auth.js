import React, { Component } from 'react';
import { FuseSplashScreen } from '@fuse';
import { connect } from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';

class Auth extends Component {

   state = {
      waitAuthCheck: true
   }

   componentDidMount() {
      return Promise.all([
         // Comment the lines which you do not use
         this.jwtCheck()
      ]).then(() => {
         this.setState({ waitAuthCheck: false });
      });
   }

   jwtCheck = () => new Promise(resolve => {

      jwtService.on('onAutoLogin', () => {

         jwtService.signInWithToken()
         .then(() => {
            resolve();
         })
         .catch(error => {
            this.props.showMessage({ 
               message: error, 
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'error'
            });

            resolve();
         })
      });

      jwtService.on('onAutoLogout', (message) => {

         if (message) {
            this.props.showMessage({ 
               message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning' 
            });
         }

         this.props.logout();

         resolve();
      });

      jwtService.on('onNoAccessToken', () => {
         resolve();
      });
      jwtService.init();

      return Promise.resolve();
   })

   render() {
      return this.state.waitAuthCheck ? <FuseSplashScreen /> : <React.Fragment children={this.props.children} />;
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({
      logout: userActions.logoutUser,
      showMessage: Actions.showMessage
   }, dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
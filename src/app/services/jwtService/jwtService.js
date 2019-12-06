import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import settingConfig from '../../fuse-configs/settingsConfig';

class jwtService extends FuseUtils.EventEmitter {

   init() {
      this.handleAuthentication();
   }

   handleAuthentication = () => {

      let access_token = this.getAccessToken();
      
      if (!access_token) {
         this.emit('onNoAccessToken');
         return;
      }

      if (this.isAuthTokenValid(access_token)) {
         this.setSession(access_token);
         this.emit('onAutoLogin', true);
      } else {
         this.setSession(null);
         this.emit('onAutoLogout', 'Access token expired');
      }
   };

   signInWithEmailAndPassword = (username, password) => {
      return new Promise((resolve, reject) => {
         axios.post(`${settingConfig.apiServerURL}/admin/signin`, { 
            username,
            password
         }).then(response => {
            if (response.data.success) {
               this.setSession(response.data.result);
               resolve();
            } else {
               var error = {
                  username: 'Check your username/email',
                  password: 'Check your password'
               }
               reject(error);
            }
         });
      });
   };

   signInWithToken = () => {
      return new Promise((resolve, reject) => {
         axios.post(`${settingConfig.apiServerURL}/admin/autoSignInWithToken`, {
            access_token: this.getAccessToken()
         })
         .then(response => {
            if (response.data.success) {
               this.setSession(response.data.result);
               resolve();
            } else {
               this.logout();
               reject('Failed to login with token.');
            }
         })
         .catch(error => {
            this.logout();
            reject('Failed to login with token.');
         });
      });
   };

   updateUserData = (user) => {
      return axios.post('/api/auth/user/update', {
         user: user
      });
   };

   setSession = access_token => {
      if (access_token) {
         localStorage.setItem('jwt_access_token', access_token);
         axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      } else {
         localStorage.removeItem('jwt_access_token');
         delete axios.defaults.headers.common['Authorization'];
      }
   };

   logout = () => {
      this.setSession(null);
   };

   isAuthTokenValid = access_token => {
      if (!access_token) {
         return false;
      }
      const decoded = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
         return false;
      } else {
         return true;
      }
   };

   getAccessToken = () => {
      return window.localStorage.getItem('jwt_access_token');
   };
}

const instance = new jwtService();

export default instance;
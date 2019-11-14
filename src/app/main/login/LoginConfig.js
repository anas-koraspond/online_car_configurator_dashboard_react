import Login from './Login';

export const LoginConfig = {
   settings: {
      layout: {
         config: {
            navbar: {
               display: false
            },
            toolbar: {
               display: false
            },
            footer: {
               display: false
            },
            leftSidePanel: {
               display: false
            },
            rightSidePanel: {
               display: false
            }
         }
      }
   },
   routes: [{
      path: '/login',
      component: Login
   }]
};
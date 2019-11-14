import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions';

export const LogoutConfig = {
   routes: [
      {
         path     : '/logout',
         component: () => {
            store.dispatch(logoutUser());
            return 'Logging out..';
         }
      }
   ]
};


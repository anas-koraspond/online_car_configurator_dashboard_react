import * as Actions from '../actions';

const initialState = {
   data: {
      'displayName': 'Admin',
      'photoURL': 'assets/images/avatars/profile.jpg',
      'email': 'admin@configurator.com',
      shortcuts: [
         'vehicles',
         'wheels',
         'tires'
      ]
   }
};

const user = function (state = initialState, action) {
   switch (action.type) {
      case Actions.SET_USER_DATA: {
         return {
            ...initialState,
            ...action.payload
         };
      }
      case Actions.REMOVE_USER_DATA: {
         return {
            ...initialState
         };
      }
      case Actions.USER_LOGGED_OUT: {
         return initialState;
      }
      default: {
         return state
      }
   }
};

export default user;
import jwtService from 'app/services/jwtService';
import { setInitialSettings } from 'app/store/actions';
import history from '@history';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({username, password})
{
   return (dispatch) =>
      jwtService.signInWithEmailAndPassword(username, password)
      .then(() => {
         dispatch(setInitialSettings());

         if (history.location.state && history.location.state.redirectUrl) {
            history.push(history.location.state.redirectUrl);
         } else {
            history.push('/');
         }

         return dispatch({
            type: LOGIN_SUCCESS
         });
      })
      .catch(error => {
         return dispatch({
            type   : LOGIN_ERROR,
            payload: error
         });
      });
}

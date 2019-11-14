import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import history from '@history';

export const GET_WHEELS = '[WHEELS] GET WHEELS';
export const SET_SEARCH_TEXT = '[WHEELS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_WHEELS = '[WHEELS] TOGGLE IN SELECTED WHEELS';
export const SELECT_ALL_WHEELS = '[WHEELS] SELECT ALL WHEELS';
export const DESELECT_ALL_WHEELS = '[WHEELS] DESELECT ALL WHEELS';
export const OPEN_NEW_WHEEL_DIALOG = '[WHEELS] OPEN NEW WHEEL DIALOG';
export const CLOSE_NEW_WHEEL_DIALOG = '[WHEELS] CLOSE NEW WHEEL DIALOG';
export const OPEN_EDIT_WHEEL_DIALOG = '[WHEELS] OPEN EDIT WHEEL DIALOG';
export const CLOSE_EDIT_WHEEL_DIALOG = '[WHEELS] CLOSE EDIT WHEEL DIALOG';

export function getWheels() {
   const request = axios.get('/admin/getWheels');

   return (dispatch) =>
      request.then((response) => {
         if (response.data.code === 400) {
            dispatch(showMessage({
               message: response.data.message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else if (response.data.code === 406) {
            jwtService.emit('onAutoLogout', response.data.message);
            history.push('/login');
         } else {
            dispatch({
               type: GET_WHEELS,
               payload: response.data.result
            });
         }
      });
}

export function setSearchText(event) {
   return {
      type: SET_SEARCH_TEXT,
      searchText: event.target.value
   };
}

export function toggleInSelectedWheels(wheelId) {
   return {
      type: TOGGLE_IN_SELECTED_WHEELS,
      wheelId
   };
}

export function selectAllWheels() {
   return {
      type: SELECT_ALL_WHEELS
   };
}

export function deSelectAllWheels() {
   return {
      type: DESELECT_ALL_WHEELS
   };
}

export function openNewWheelDialog() {
   return {
      type: OPEN_NEW_WHEEL_DIALOG
   };
}

export function closeNewWheelDialog() {
   return {
      type: CLOSE_NEW_WHEEL_DIALOG
   };
}

export function openEditWheelDialog(data) {
   return {
      type: OPEN_EDIT_WHEEL_DIALOG,
      data
   };
}

export function closeEditWheelDialog() {
   return {
      type: CLOSE_EDIT_WHEEL_DIALOG
   };
}

export function addWheel(newWheel) {
   return (dispatch) => {

      const request = axios.post('/admin/addWheel', {
         newWheel
      });

      return request.then((response) => {
         if (response.data.code === 400) {
            dispatch(showMessage({
               message: response.data.message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else if (response.data.code === 406) {
            jwtService.emit('onAutoLogout', response.data.message);
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Added a New Wheel!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getWheels());
         }
      })
      .catch(err => {
         dispatch(showMessage({
            message: err.message,
            autoHideDuration: 2000,
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'right'
            },
            variant: 'error'
         }));
      });
   };
}

export function updateWheel(wheel) {
   return (dispatch) => {

      const request = axios.post('/admin/updateWheel', {
         wheel
      });

      return request.then((response) => {
         if (response.data.code === 400) {
            dispatch(showMessage({
               message: response.data.message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else if (response.data.code === 406) {
            jwtService.emit('onAutoLogout', response.data.message);
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Updated a Wheel!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getWheels());
         }
      })
      .catch(err => {
         dispatch(showMessage({
            message: err.message,
            autoHideDuration: 2000,
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'right'
            },
            variant: 'error'
         }));
      });
   };
}

export function removeWheel(wheelId) {
   return (dispatch) => {

      const request = axios.post('/admin/removeWheel', {
         wheelId
      });

      return request.then((response) => {
         if (response.data.code === 400) {
            dispatch(showMessage({
               message: response.data.message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else if (response.data.code === 406) {
            jwtService.emit('onAutoLogout', response.data.message);
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Removed a Wheel!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getWheels());
         }
      })
      .catch(err => {
         dispatch(showMessage({
            message: err.message,
            autoHideDuration: 2000,
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'right'
            },
            variant: 'error'
         }));
      });
   };
}

export function removeWheels(wheelIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removeWheels', {
         wheelIds
      });

      return request.then((response) => {
         if (response.data.code === 400) {
            dispatch(showMessage({
               message: response.data.message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else if (response.data.code === 406) {
            jwtService.emit('onAutoLogout', response.data.message);
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Removed the Wheels!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_WHEELS
               })
            ]).then(() => dispatch(getWheels()));
         }
      })
      .catch(err => {
         dispatch(showMessage({
            message: err.message,
            autoHideDuration: 2000,
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'right'
            },
            variant: 'error'
         }));
      });
   };
}

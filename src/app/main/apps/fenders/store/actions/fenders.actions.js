import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_FENDERS = '[FENDERS] GET FENDERS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[FENDERS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_FENDERS = '[FENDERS] TOGGLE IN SELECTED FENDERS';
export const SELECT_ALL_FENDERS = '[FENDERS] SELECT ALL FENDERS';
export const DESELECT_ALL_FENDERS = '[FENDERS] DESELECT ALL FENDERS';
export const OPEN_NEW_FENDER_DIALOG = '[FENDERS] OPEN NEW FENDER DIALOG';
export const CLOSE_NEW_FENDER_DIALOG = '[FENDERS] CLOSE NEW FENDER DIALOG';
export const OPEN_EDIT_FENDER_DIALOG = '[FENDERS] OPEN EDIT FENDER DIALOG';
export const CLOSE_EDIT_FENDER_DIALOG = '[FENDERS] CLOSE EDIT FENDER DIALOG';

export function getFenders() {
   const request = axios.post('/admin/getPartials', {
      type: 'fender'
   });

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
         } else {
            dispatch({
               type: GET_FENDERS,
               payload: response.data.result
            });
         }
      });
}

export function getVehicleTypes() {
   const request = axios.post('/admin/getVehicleTypes');

   return (dispatch) => 
      request.then((response) => {
         if (response.data.success) {
            dispatch({
               type: GET_VEHICLE_TYPES,
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

export function toggleInSelectedFenders(fenderId) {
   return {
      type: TOGGLE_IN_SELECTED_FENDERS,
      fenderId
   };
}

export function selectAllFenders() {
   return {
      type: SELECT_ALL_FENDERS
   };
}

export function deSelectAllFenders() {
   return {
      type: DESELECT_ALL_FENDERS
   };
}

export function openNewFenderDialog() {
   return {
      type: OPEN_NEW_FENDER_DIALOG
   };
}

export function closeNewFenderDialog() {
   return {
      type: CLOSE_NEW_FENDER_DIALOG
   };
}

export function openEditFenderDialog(data) {
   return {
      type: OPEN_EDIT_FENDER_DIALOG,
      data
   };
}

export function closeEditFenderDialog() {
   return {
      type: CLOSE_EDIT_FENDER_DIALOG
   };
}

export function addFender(newFender) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newFender
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
         } else {
            dispatch(showMessage({
               message: 'Successfully Added a New Fender!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getFenders());
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

export function updateFender(fender) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: fender
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
         } else {
            dispatch(showMessage({
               message: 'Successfully Updated a Fender!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getFenders());
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

export function removeFender(fenderId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: fenderId
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
         } else {
            dispatch(showMessage({
               message: 'Successfully Removed a Fender!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getFenders());
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

export function removeFenders(fenderIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: fenderIds
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
         } else {
            dispatch(showMessage({
               message: 'Successfully Removed the Fenders!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_FENDERS
               })
            ]).then(() => dispatch(getFenders()));
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

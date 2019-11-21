import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_HEADLIGHTS = '[HEADLIGHTS] GET HEADLIGHTS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[HEADLIGHTS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_HEADLIGHTS = '[HEADLIGHTS] TOGGLE IN SELECTED HEADLIGHTS';
export const SELECT_ALL_HEADLIGHTS = '[HEADLIGHTS] SELECT ALL HEADLIGHTS';
export const DESELECT_ALL_HEADLIGHTS = '[HEADLIGHTS] DESELECT ALL HEADLIGHTS';
export const OPEN_NEW_HEADLIGHT_DIALOG = '[HEADLIGHTS] OPEN NEW HEADLIGHT DIALOG';
export const CLOSE_NEW_HEADLIGHT_DIALOG = '[HEADLIGHTS] CLOSE NEW HEADLIGHT DIALOG';
export const OPEN_EDIT_HEADLIGHT_DIALOG = '[HEADLIGHTS] OPEN EDIT HEADLIGHT DIALOG';
export const CLOSE_EDIT_HEADLIGHT_DIALOG = '[HEADLIGHTS] CLOSE EDIT HEADLIGHT DIALOG';

export function getHeadlights() {
   const request = axios.post('/admin/getPartials', {
      type: 'headlight'
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
               type: GET_HEADLIGHTS,
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

export function toggleInSelectedHeadlights(headlightId) {
   return {
      type: TOGGLE_IN_SELECTED_HEADLIGHTS,
      headlightId
   };
}

export function selectAllHeadlights() {
   return {
      type: SELECT_ALL_HEADLIGHTS
   };
}

export function deSelectAllHeadlights() {
   return {
      type: DESELECT_ALL_HEADLIGHTS
   };
}

export function openNewHeadlightDialog() {
   return {
      type: OPEN_NEW_HEADLIGHT_DIALOG
   };
}

export function closeNewHeadlightDialog() {
   return {
      type: CLOSE_NEW_HEADLIGHT_DIALOG
   };
}

export function openEditHeadlightDialog(data) {
   return {
      type: OPEN_EDIT_HEADLIGHT_DIALOG,
      data
   };
}

export function closeEditHeadlightDialog() {
   return {
      type: CLOSE_EDIT_HEADLIGHT_DIALOG
   };
}

export function addHeadlight(newHeadlight) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newHeadlight
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
               message: 'Successfully Added a New Headlight!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHeadlights());
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

export function updateHeadlight(headlight) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: headlight
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
               message: 'Successfully Updated a Headlight!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHeadlights());
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

export function removeHeadlight(headlightId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: headlightId
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
               message: 'Successfully Removed a Headlight!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHeadlights());
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

export function removeHeadlights(headlightIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: headlightIds
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
               message: 'Successfully Removed the Headlights!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_HEADLIGHTS
               })
            ]).then(() => dispatch(getHeadlights()));
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

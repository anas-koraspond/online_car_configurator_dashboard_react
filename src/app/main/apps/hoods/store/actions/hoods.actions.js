import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_HOODS = '[HOODS] GET HOODS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[HOODS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_HOODS = '[HOODS] TOGGLE IN SELECTED HOODS';
export const SELECT_ALL_HOODS = '[HOODS] SELECT ALL HOODS';
export const DESELECT_ALL_HOODS = '[HOODS] DESELECT ALL HOODS';
export const OPEN_NEW_HOOD_DIALOG = '[HOODS] OPEN NEW HOOD DIALOG';
export const CLOSE_NEW_HOOD_DIALOG = '[HOODS] CLOSE NEW HOOD DIALOG';
export const OPEN_EDIT_HOOD_DIALOG = '[HOODS] OPEN EDIT HOOD DIALOG';
export const CLOSE_EDIT_HOOD_DIALOG = '[HOODS] CLOSE EDIT HOOD DIALOG';

export function getHoods() {
   const request = axios.post('/admin/getPartials', {
      type: 'hood'
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
               type: GET_HOODS,
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

export function toggleInSelectedHoods(hoodId) {
   return {
      type: TOGGLE_IN_SELECTED_HOODS,
      hoodId
   };
}

export function selectAllHoods() {
   return {
      type: SELECT_ALL_HOODS
   };
}

export function deSelectAllHoods() {
   return {
      type: DESELECT_ALL_HOODS
   };
}

export function openNewHoodDialog() {
   return {
      type: OPEN_NEW_HOOD_DIALOG
   };
}

export function closeNewHoodDialog() {
   return {
      type: CLOSE_NEW_HOOD_DIALOG
   };
}

export function openEditHoodDialog(data) {
   return {
      type: OPEN_EDIT_HOOD_DIALOG,
      data
   };
}

export function closeEditHoodDialog() {
   return {
      type: CLOSE_EDIT_HOOD_DIALOG
   };
}

export function addHood(newHood) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newHood
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
               message: 'Successfully Added a New Hood!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHoods());
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

export function updateHood(hood) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: hood
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
               message: 'Successfully Updated a Hood!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHoods());
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

export function removeHood(hoodId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: hoodId
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
               message: 'Successfully Removed a Hood!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHoods());
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

export function removeHoods(hoodIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: hoodIds
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
               message: 'Successfully Removed the Hoods!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_HOODS
               })
            ]).then(() => dispatch(getHoods()));
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

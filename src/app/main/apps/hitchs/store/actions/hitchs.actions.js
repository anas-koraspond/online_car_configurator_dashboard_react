import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_HITCHS = '[HITCHS] GET HITCHS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[HITCHS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_HITCHS = '[HITCHS] TOGGLE IN SELECTED HITCHS';
export const SELECT_ALL_HITCHS = '[HITCHS] SELECT ALL HITCHS';
export const DESELECT_ALL_HITCHS = '[HITCHS] DESELECT ALL HITCHS';
export const OPEN_NEW_HITCH_DIALOG = '[HITCHS] OPEN NEW HITCH DIALOG';
export const CLOSE_NEW_HITCH_DIALOG = '[HITCHS] CLOSE NEW HITCH DIALOG';
export const OPEN_EDIT_HITCH_DIALOG = '[HITCHS] OPEN EDIT HITCH DIALOG';
export const CLOSE_EDIT_HITCH_DIALOG = '[HITCHS] CLOSE EDIT HITCH DIALOG';

export function getHitchs() {
   const request = axios.post('/admin/getPartials', {
      type: 'hitch'
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
               type: GET_HITCHS,
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

export function toggleInSelectedHitchs(hitchId) {
   return {
      type: TOGGLE_IN_SELECTED_HITCHS,
      hitchId
   };
}

export function selectAllHitchs() {
   return {
      type: SELECT_ALL_HITCHS
   };
}

export function deSelectAllHitchs() {
   return {
      type: DESELECT_ALL_HITCHS
   };
}

export function openNewHitchDialog() {
   return {
      type: OPEN_NEW_HITCH_DIALOG
   };
}

export function closeNewHitchDialog() {
   return {
      type: CLOSE_NEW_HITCH_DIALOG
   };
}

export function openEditHitchDialog(data) {
   return {
      type: OPEN_EDIT_HITCH_DIALOG,
      data
   };
}

export function closeEditHitchDialog() {
   return {
      type: CLOSE_EDIT_HITCH_DIALOG
   };
}

export function addHitch(newHitch) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newHitch
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
               message: 'Successfully Added a New Hitch!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHitchs());
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

export function updateHitch(hitch) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: hitch
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
               message: 'Successfully Updated a Hitch!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHitchs());
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

export function removeHitch(hitchId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: hitchId
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
               message: 'Successfully Removed a Hitch!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getHitchs());
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

export function removeHitchs(hitchIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: hitchIds
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
               message: 'Successfully Removed the Hitchs!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_HITCHS
               })
            ]).then(() => dispatch(getHitchs()));
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

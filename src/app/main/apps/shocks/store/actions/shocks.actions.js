import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_SHOCKS = '[SHOCKS] GET SHOCKS';
export const SET_SEARCH_TEXT = '[SHOCKS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SHOCKS = '[SHOCKS] TOGGLE IN SELECTED SHOCKS';
export const SELECT_ALL_SHOCKS = '[SHOCKS] SELECT ALL SHOCKS';
export const DESELECT_ALL_SHOCKS = '[SHOCKS] DESELECT ALL SHOCKS';
export const OPEN_NEW_SHOCK_DIALOG = '[SHOCKS] OPEN NEW SHOCK DIALOG';
export const CLOSE_NEW_SHOCK_DIALOG = '[SHOCKS] CLOSE NEW SHOCK DIALOG';
export const OPEN_EDIT_SHOCK_DIALOG = '[SHOCKS] OPEN EDIT SHOCK DIALOG';
export const CLOSE_EDIT_SHOCK_DIALOG = '[SHOCKS] CLOSE EDIT SHOCK DIALOG';

export function getShocks() {
   const request = axios.post('/admin/getPartials', {
      type: 'shock'
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
               type: GET_SHOCKS,
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

export function toggleInSelectedShocks(shockId) {
   return {
      type: TOGGLE_IN_SELECTED_SHOCKS,
      shockId
   };
}

export function selectAllShocks() {
   return {
      type: SELECT_ALL_SHOCKS
   };
}

export function deSelectAllShocks() {
   return {
      type: DESELECT_ALL_SHOCKS
   };
}

export function openNewShockDialog() {
   return {
      type: OPEN_NEW_SHOCK_DIALOG
   };
}

export function closeNewShockDialog() {
   return {
      type: CLOSE_NEW_SHOCK_DIALOG
   };
}

export function openEditShockDialog(data) {
   return {
      type: OPEN_EDIT_SHOCK_DIALOG,
      data
   };
}

export function closeEditShockDialog() {
   return {
      type: CLOSE_EDIT_SHOCK_DIALOG
   };
}

export function addShock(newShock) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newShock
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
               message: 'Successfully Added a New Shock!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getShocks());
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

export function updateShock(shock) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: shock
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
               message: 'Successfully Updated a Shock!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getShocks());
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

export function removeShock(shockId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: shockId
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
               message: 'Successfully Removed a Shock!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getShocks());
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

export function removeShocks(shockIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: shockIds
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
               message: 'Successfully Removed the Shocks!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_SHOCKS
               })
            ]).then(() => dispatch(getShocks()));
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

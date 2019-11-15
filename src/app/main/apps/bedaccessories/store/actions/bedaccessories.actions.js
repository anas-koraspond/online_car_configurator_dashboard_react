import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_BEDCOVERS = '[BEDCOVERS] GET BEDCOVERS';
export const SET_SEARCH_TEXT = '[BEDCOVERS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BEDCOVERS = '[BEDCOVERS] TOGGLE IN SELECTED BEDCOVERS';
export const SELECT_ALL_BEDCOVERS = '[BEDCOVERS] SELECT ALL BEDCOVERS';
export const DESELECT_ALL_BEDCOVERS = '[BEDCOVERS] DESELECT ALL BEDCOVERS';
export const OPEN_NEW_BEDCOVER_DIALOG = '[BEDCOVERS] OPEN NEW BEDCOVER DIALOG';
export const CLOSE_NEW_BEDCOVER_DIALOG = '[BEDCOVERS] CLOSE NEW BEDCOVER DIALOG';
export const OPEN_EDIT_BEDCOVER_DIALOG = '[BEDCOVERS] OPEN EDIT BEDCOVER DIALOG';
export const CLOSE_EDIT_BEDCOVER_DIALOG = '[BEDCOVERS] CLOSE EDIT BEDCOVER DIALOG';

export function getBedAccessories() {
   const request = axios.post('/admin/getPartials', {
      type: 'bedaccessory'
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
               type: GET_BEDCOVERS,
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

export function toggleInSelectedBedAccessories(bedaccessoryId) {
   return {
      type: TOGGLE_IN_SELECTED_BEDCOVERS,
      bedaccessoryId
   };
}

export function selectAllBedAccessories() {
   return {
      type: SELECT_ALL_BEDCOVERS
   };
}

export function deSelectAllBedAccessories() {
   return {
      type: DESELECT_ALL_BEDCOVERS
   };
}

export function openNewBedAccessoryDialog() {
   return {
      type: OPEN_NEW_BEDCOVER_DIALOG
   };
}

export function closeNewBedAccessoryDialog() {
   return {
      type: CLOSE_NEW_BEDCOVER_DIALOG
   };
}

export function openEditBedAccessoryDialog(data) {
   return {
      type: OPEN_EDIT_BEDCOVER_DIALOG,
      data
   };
}

export function closeEditBedAccessoryDialog() {
   return {
      type: CLOSE_EDIT_BEDCOVER_DIALOG
   };
}

export function addBedAccessory(newBedAccessory) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newBedAccessory
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
               message: 'Successfully Added a New Bed Accessory!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getBedAccessories());
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

export function updateBedAccessory(bedaccessory) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: bedaccessory
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
               message: 'Successfully Updated a Bed Accessory!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getBedAccessories());
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

export function removeBedAccessory(bedaccessoryId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: bedaccessoryId
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
               message: 'Successfully Removed a Bed Accessory!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getBedAccessories());
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

export function removeBedAccessories(bedaccessoryIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: bedaccessoryIds
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
               message: 'Successfully Removed the Bed Accessories!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_BEDCOVERS
               })
            ]).then(() => dispatch(getBedAccessories()));
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

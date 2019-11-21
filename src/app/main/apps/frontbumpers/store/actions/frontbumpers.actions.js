import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_FRONTBUMPERS = '[FRONTBUMPERS] GET FRONTBUMPERS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[FRONTBUMPERS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_FRONTBUMPERS = '[FRONTBUMPERS] TOGGLE IN SELECTED FRONTBUMPERS';
export const SELECT_ALL_FRONTBUMPERS = '[FRONTBUMPERS] SELECT ALL FRONTBUMPERS';
export const DESELECT_ALL_FRONTBUMPERS = '[FRONTBUMPERS] DESELECT ALL FRONTBUMPERS';
export const OPEN_NEW_FRONTBUMPER_DIALOG = '[FRONTBUMPERS] OPEN NEW FRONTBUMPER DIALOG';
export const CLOSE_NEW_FRONTBUMPER_DIALOG = '[FRONTBUMPERS] CLOSE NEW FRONTBUMPER DIALOG';
export const OPEN_EDIT_FRONTBUMPER_DIALOG = '[FRONTBUMPERS] OPEN EDIT FRONTBUMPER DIALOG';
export const CLOSE_EDIT_FRONTBUMPER_DIALOG = '[FRONTBUMPERS] CLOSE EDIT FRONTBUMPER DIALOG';

export function getFrontBumpers() {
   const request = axios.post('/admin/getPartials', {
      type: 'frontbumper'
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
               type: GET_FRONTBUMPERS,
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

export function toggleInSelectedFrontBumpers(frontbumperId) {
   return {
      type: TOGGLE_IN_SELECTED_FRONTBUMPERS,
      frontbumperId
   };
}

export function selectAllFrontBumpers() {
   return {
      type: SELECT_ALL_FRONTBUMPERS
   };
}

export function deSelectAllFrontBumpers() {
   return {
      type: DESELECT_ALL_FRONTBUMPERS
   };
}

export function openNewFrontBumperDialog() {
   return {
      type: OPEN_NEW_FRONTBUMPER_DIALOG
   };
}

export function closeNewFrontBumperDialog() {
   return {
      type: CLOSE_NEW_FRONTBUMPER_DIALOG
   };
}

export function openEditFrontBumperDialog(data) {
   return {
      type: OPEN_EDIT_FRONTBUMPER_DIALOG,
      data
   };
}

export function closeEditFrontBumperDialog() {
   return {
      type: CLOSE_EDIT_FRONTBUMPER_DIALOG
   };
}

export function addFrontBumper(newFrontBumper) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newFrontBumper
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
               message: 'Successfully Added a New Front Bumper!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getFrontBumpers());
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

export function updateFrontBumper(frontbumper) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: frontbumper
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
               message: 'Successfully Updated a Front Bumper!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getFrontBumpers());
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

export function removeFrontBumper(frontbumperId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: frontbumperId
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
               message: 'Successfully Removed a Front Bumper!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getFrontBumpers());
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

export function removeFrontBumpers(frontbumperIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: frontbumperIds
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
               message: 'Successfully Removed the Front Bumpers!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_FRONTBUMPERS
               })
            ]).then(() => dispatch(getFrontBumpers()));
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

import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_REARBUMPERS = '[REARBUMPERS] GET REARBUMPERS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[REARBUMPERS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_REARBUMPERS = '[REARBUMPERS] TOGGLE IN SELECTED REARBUMPERS';
export const SELECT_ALL_REARBUMPERS = '[REARBUMPERS] SELECT ALL REARBUMPERS';
export const DESELECT_ALL_REARBUMPERS = '[REARBUMPERS] DESELECT ALL REARBUMPERS';
export const OPEN_NEW_REARBUMPER_DIALOG = '[REARBUMPERS] OPEN NEW REARBUMPER DIALOG';
export const CLOSE_NEW_REARBUMPER_DIALOG = '[REARBUMPERS] CLOSE NEW REARBUMPER DIALOG';
export const OPEN_EDIT_REARBUMPER_DIALOG = '[REARBUMPERS] OPEN EDIT REARBUMPER DIALOG';
export const CLOSE_EDIT_REARBUMPER_DIALOG = '[REARBUMPERS] CLOSE EDIT REARBUMPER DIALOG';

export function getRearBumpers() {
   const request = axios.post('/admin/getPartials', {
      type: 'rearbumper'
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
               type: GET_REARBUMPERS,
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

export function toggleInSelectedRearBumpers(rearbumperId) {
   return {
      type: TOGGLE_IN_SELECTED_REARBUMPERS,
      rearbumperId
   };
}

export function selectAllRearBumpers() {
   return {
      type: SELECT_ALL_REARBUMPERS
   };
}

export function deSelectAllRearBumpers() {
   return {
      type: DESELECT_ALL_REARBUMPERS
   };
}

export function openNewRearBumperDialog() {
   return {
      type: OPEN_NEW_REARBUMPER_DIALOG
   };
}

export function closeNewRearBumperDialog() {
   return {
      type: CLOSE_NEW_REARBUMPER_DIALOG
   };
}

export function openEditRearBumperDialog(data) {
   return {
      type: OPEN_EDIT_REARBUMPER_DIALOG,
      data
   };
}

export function closeEditRearBumperDialog() {
   return {
      type: CLOSE_EDIT_REARBUMPER_DIALOG
   };
}

export function addRearBumper(newRearBumper) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newRearBumper
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
               message: 'Successfully Added a New Rear Bumper!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getRearBumpers());
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

export function updateRearBumper(rearbumper) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: rearbumper
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
               message: 'Successfully Updated a Rear Bumper!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getRearBumpers());
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

export function removeRearBumper(rearbumperId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: rearbumperId
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
               message: 'Successfully Removed a Rear Bumper!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getRearBumpers());
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

export function removeRearBumpers(rearbumperIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: rearbumperIds
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
               message: 'Successfully Removed the Rear Bumpers!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_REARBUMPERS
               })
            ]).then(() => dispatch(getRearBumpers()));
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

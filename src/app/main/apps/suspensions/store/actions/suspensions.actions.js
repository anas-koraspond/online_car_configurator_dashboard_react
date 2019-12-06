import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_SUSPENSIONS = '[SUSPENSIONS] GET SUSPENSIONS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[SUSPENSIONS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SUSPENSIONS = '[SUSPENSIONS] TOGGLE IN SELECTED SUSPENSIONS';
export const SELECT_ALL_SUSPENSIONS = '[SUSPENSIONS] SELECT ALL SUSPENSIONS';
export const DESELECT_ALL_SUSPENSIONS = '[SUSPENSIONS] DESELECT ALL SUSPENSIONS';
export const OPEN_NEW_SUSPENSION_DIALOG = '[SUSPENSIONS] OPEN NEW SUSPENSION DIALOG';
export const CLOSE_NEW_SUSPENSION_DIALOG = '[SUSPENSIONS] CLOSE NEW SUSPENSION DIALOG';
export const OPEN_EDIT_SUSPENSION_DIALOG = '[SUSPENSIONS] OPEN EDIT SUSPENSION DIALOG';
export const CLOSE_EDIT_SUSPENSION_DIALOG = '[SUSPENSIONS] CLOSE EDIT SUSPENSION DIALOG';

export function getSuspensions() {
   const request = axios.post(`${settingConfig.apiServerURL}/admin/getPartials`, {
      type: 'suspension'
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
               type: GET_SUSPENSIONS,
               payload: response.data.result
            });
         }
      });
}

export function getVehicleTypes() {
   const request = axios.post(`${settingConfig.apiServerURL}/admin/getVehicleTypes`);

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

export function toggleInSelectedSuspensions(suspensionId) {
   return {
      type: TOGGLE_IN_SELECTED_SUSPENSIONS,
      suspensionId
   };
}

export function selectAllSuspensions() {
   return {
      type: SELECT_ALL_SUSPENSIONS
   };
}

export function deSelectAllSuspensions() {
   return {
      type: DESELECT_ALL_SUSPENSIONS
   };
}

export function openNewSuspensionDialog() {
   return {
      type: OPEN_NEW_SUSPENSION_DIALOG
   };
}

export function closeNewSuspensionDialog() {
   return {
      type: CLOSE_NEW_SUSPENSION_DIALOG
   };
}

export function openEditSuspensionDialog(data) {
   return {
      type: OPEN_EDIT_SUSPENSION_DIALOG,
      data
   };
}

export function closeEditSuspensionDialog() {
   return {
      type: CLOSE_EDIT_SUSPENSION_DIALOG
   };
}

export function addSuspension(newSuspension) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/addPartial`, {
         newPartial: newSuspension
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
               message: 'Successfully Added a New Suspension!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getSuspensions());
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

export function updateSuspension(suspension) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/updatePartial`, {
         partial: suspension
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
               message: 'Successfully Updated a Suspension!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getSuspensions());
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

export function removeSuspension(suspensionId) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartial`, {
         partialId: suspensionId
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
               message: 'Successfully Removed a Suspension!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getSuspensions());
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

export function removeSuspensions(suspensionIds) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartials`, {
         partialIds: suspensionIds
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
               message: 'Successfully Removed the Suspensions!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_SUSPENSIONS
               })
            ]).then(() => dispatch(getSuspensions()));
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

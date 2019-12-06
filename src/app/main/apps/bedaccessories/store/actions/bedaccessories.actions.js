import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_BEDACCESSORIES = '[BEDACCESSORIES] GET BEDACCESSORIES';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[BEDACCESSORIES] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BEDACCESSORIES = '[BEDACCESSORIES] TOGGLE IN SELECTED BEDACCESSORIES';
export const SELECT_ALL_BEDACCESSORIES = '[BEDACCESSORIES] SELECT ALL BEDACCESSORIES';
export const DESELECT_ALL_BEDACCESSORIES = '[BEDACCESSORIES] DESELECT ALL BEDACCESSORIES';
export const OPEN_NEW_BEDACCESSORY_DIALOG = '[BEDACCESSORIES] OPEN NEW BEDACCESSORY DIALOG';
export const CLOSE_NEW_BEDACCESSORY_DIALOG = '[BEDACCESSORIES] CLOSE NEW BEDACCESSORY DIALOG';
export const OPEN_EDIT_BEDACCESSORY_DIALOG = '[BEDACCESSORIES] OPEN EDIT BEDACCESSORY DIALOG';
export const CLOSE_EDIT_BEDACCESSORY_DIALOG = '[BEDACCESSORIES] CLOSE EDIT BEDACCESSORY DIALOG';

export function getBedAccessories() {
   const request = axios.post(`${settingConfig.apiServerURL}/admin/getPartials`, {
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
               type: GET_BEDACCESSORIES,
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

export function toggleInSelectedBedAccessories(bedaccessoryId) {
   return {
      type: TOGGLE_IN_SELECTED_BEDACCESSORIES,
      bedaccessoryId
   };
}

export function selectAllBedAccessories() {
   return {
      type: SELECT_ALL_BEDACCESSORIES
   };
}

export function deSelectAllBedAccessories() {
   return {
      type: DESELECT_ALL_BEDACCESSORIES
   };
}

export function openNewBedAccessoryDialog() {
   return {
      type: OPEN_NEW_BEDACCESSORY_DIALOG
   };
}

export function closeNewBedAccessoryDialog() {
   return {
      type: CLOSE_NEW_BEDACCESSORY_DIALOG
   };
}

export function openEditBedAccessoryDialog(data) {
   return {
      type: OPEN_EDIT_BEDACCESSORY_DIALOG,
      data
   };
}

export function closeEditBedAccessoryDialog() {
   return {
      type: CLOSE_EDIT_BEDACCESSORY_DIALOG
   };
}

export function addBedAccessory(newBedAccessory) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/addPartial`, {
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

      const request = axios.post(`${settingConfig.apiServerURL}/admin/updatePartial`, {
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

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartial`, {
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

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartials`, {
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
                  type: DESELECT_ALL_BEDACCESSORIES
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

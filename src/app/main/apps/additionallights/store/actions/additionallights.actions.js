import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const GET_ADDITIONALLIGHTS = '[ADDITIONALLIGHTS] GET ADDITIONALLIGHTS';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[ADDITIONALLIGHTS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ADDITIONALLIGHTS = '[ADDITIONALLIGHTS] TOGGLE IN SELECTED ADDITIONALLIGHTS';
export const SELECT_ALL_ADDITIONALLIGHTS = '[ADDITIONALLIGHTS] SELECT ALL ADDITIONALLIGHTS';
export const DESELECT_ALL_ADDITIONALLIGHTS = '[ADDITIONALLIGHTS] DESELECT ALL ADDITIONALLIGHTS';
export const OPEN_NEW_ADDITIONALLIGHT_DIALOG = '[ADDITIONALLIGHTS] OPEN NEW ADDITIONALLIGHT DIALOG';
export const CLOSE_NEW_ADDITIONALLIGHT_DIALOG = '[ADDITIONALLIGHTS] CLOSE NEW ADDITIONALLIGHT DIALOG';
export const OPEN_EDIT_ADDITIONALLIGHT_DIALOG = '[ADDITIONALLIGHTS] OPEN EDIT ADDITIONALLIGHT DIALOG';
export const CLOSE_EDIT_ADDITIONALLIGHT_DIALOG = '[ADDITIONALLIGHTS] CLOSE EDIT ADDITIONALLIGHT DIALOG';

export function getAdditionalLights() {
   const request = axios.post('/admin/getPartials', {
      type: 'additionallight'
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
               type: GET_ADDITIONALLIGHTS,
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

export function toggleInSelectedAdditionalLights(additionallightId) {
   return {
      type: TOGGLE_IN_SELECTED_ADDITIONALLIGHTS,
      additionallightId
   };
}

export function selectAllAdditionalLights() {
   return {
      type: SELECT_ALL_ADDITIONALLIGHTS
   };
}

export function deSelectAllAdditionalLights() {
   return {
      type: DESELECT_ALL_ADDITIONALLIGHTS
   };
}

export function openNewAdditionalLightDialog() {
   return {
      type: OPEN_NEW_ADDITIONALLIGHT_DIALOG
   };
}

export function closeNewAdditionalLightDialog() {
   return {
      type: CLOSE_NEW_ADDITIONALLIGHT_DIALOG
   };
}

export function openEditAdditionalLightDialog(data) {
   return {
      type: OPEN_EDIT_ADDITIONALLIGHT_DIALOG,
      data
   };
}

export function closeEditAdditionalLightDialog() {
   return {
      type: CLOSE_EDIT_ADDITIONALLIGHT_DIALOG
   };
}

export function addAdditionalLight(newAdditionalLight) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newAdditionalLight
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
               message: 'Successfully Added a New Additional Light!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getAdditionalLights());
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

export function updateAdditionalLight(additionallight) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: additionallight
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
               message: 'Successfully Updated a Additional Light!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getAdditionalLights());
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

export function removeAdditionalLight(additionallightId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: additionallightId
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
               message: 'Successfully Removed a Additional Light!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getAdditionalLights());
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

export function removeAdditionalLights(additionallightIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: additionallightIds
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
               message: 'Successfully Removed the Additional Lights!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_ADDITIONALLIGHTS
               })
            ]).then(() => dispatch(getAdditionalLights()));
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

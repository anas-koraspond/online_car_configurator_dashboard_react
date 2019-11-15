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

export function toggleInSelectedAdditionalLights(additionallightId) {
   return {
      type: TOGGLE_IN_SELECTED_BEDCOVERS,
      additionallightId
   };
}

export function selectAllAdditionalLights() {
   return {
      type: SELECT_ALL_BEDCOVERS
   };
}

export function deSelectAllAdditionalLights() {
   return {
      type: DESELECT_ALL_BEDCOVERS
   };
}

export function openNewAdditionalLightDialog() {
   return {
      type: OPEN_NEW_BEDCOVER_DIALOG
   };
}

export function closeNewAdditionalLightDialog() {
   return {
      type: CLOSE_NEW_BEDCOVER_DIALOG
   };
}

export function openEditAdditionalLightDialog(data) {
   return {
      type: OPEN_EDIT_BEDCOVER_DIALOG,
      data
   };
}

export function closeEditAdditionalLightDialog() {
   return {
      type: CLOSE_EDIT_BEDCOVER_DIALOG
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
                  type: DESELECT_ALL_BEDCOVERS
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

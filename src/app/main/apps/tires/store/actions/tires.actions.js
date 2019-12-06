import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_TIRES = '[TIRES] GET TIRES';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[TIRES] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_TIRES = '[TIRES] TOGGLE IN SELECTED TIRES';
export const SELECT_ALL_TIRES = '[TIRES] SELECT ALL TIRES';
export const DESELECT_ALL_TIRES = '[TIRES] DESELECT ALL TIRES';
export const OPEN_NEW_TIRE_DIALOG = '[TIRES] OPEN NEW TIRE DIALOG';
export const CLOSE_NEW_TIRE_DIALOG = '[TIRES] CLOSE NEW TIRE DIALOG';
export const OPEN_EDIT_TIRE_DIALOG = '[TIRES] OPEN EDIT TIRE DIALOG';
export const CLOSE_EDIT_TIRE_DIALOG = '[TIRES] CLOSE EDIT TIRE DIALOG';

export function getTires() {
   const request = axios.post(`${settingConfig.apiServerURL}/admin/getPartials`, {
      type: 'tire'
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
               type: GET_TIRES,
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

export function toggleInSelectedTires(tireId) {
   return {
      type: TOGGLE_IN_SELECTED_TIRES,
      tireId
   };
}

export function selectAllTires() {
   return {
      type: SELECT_ALL_TIRES
   };
}

export function deSelectAllTires() {
   return {
      type: DESELECT_ALL_TIRES
   };
}

export function openNewTireDialog() {
   return {
      type: OPEN_NEW_TIRE_DIALOG
   };
}

export function closeNewTireDialog() {
   return {
      type: CLOSE_NEW_TIRE_DIALOG
   };
}

export function openEditTireDialog(data) {
   return {
      type: OPEN_EDIT_TIRE_DIALOG,
      data
   };
}

export function closeEditTireDialog() {
   return {
      type: CLOSE_EDIT_TIRE_DIALOG
   };
}

export function addTire(newTire) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/addPartial`, {
         newPartial: newTire
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
               message: 'Successfully Added a New Tire!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getTires());
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

export function updateTire(tire) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/updatePartial`, {
         partial: tire
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
               message: 'Successfully Updated a Tire!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getTires());
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

export function removeTire(tireId) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartial`, {
         partialId: tireId
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
               message: 'Successfully Removed a Tire!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getTires());
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

export function removeTires(tireIds) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartials`, {
         partialIds: tireIds
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
               message: 'Successfully Removed the Tires!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_TIRES
               })
            ]).then(() => dispatch(getTires()));
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

import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import history from '@history';

export const GET_VEHICLES = '[VEHICLES] GET VEHICLES';
export const SET_SEARCH_TEXT = '[VEHICLES] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_VEHICLES = '[VEHICLES] TOGGLE IN SELECTED VEHICLES';
export const SELECT_ALL_VEHICLES = '[VEHICLES] SELECT ALL VEHICLES';
export const DESELECT_ALL_VEHICLES = '[VEHICLES] DESELECT ALL VEHICLES';
export const OPEN_NEW_VEHICLE_DIALOG = '[VEHICLES] OPEN NEW VEHICLE DIALOG';
export const CLOSE_NEW_VEHICLE_DIALOG = '[VEHICLES] CLOSE NEW VEHICLE DIALOG';
export const OPEN_EDIT_VEHICLE_DIALOG = '[VEHICLES] OPEN EDIT VEHICLE DIALOG';
export const CLOSE_EDIT_VEHICLE_DIALOG = '[VEHICLES] CLOSE EDIT VEHICLE DIALOG';

export function getVehicles() {
   const request = axios.get('/admin/getVehicles');

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
            history.push('/login');
         } else {
            dispatch({
               type: GET_VEHICLES,
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

export function toggleInSelectedVehicles(vehicleId) {
   return {
      type: TOGGLE_IN_SELECTED_VEHICLES,
      vehicleId
   };
}

export function selectAllVehicles() {
   return {
      type: SELECT_ALL_VEHICLES
   };
}

export function deSelectAllVehicles() {
   return {
      type: DESELECT_ALL_VEHICLES
   };
}

export function openNewVehicleDialog() {
   return {
      type: OPEN_NEW_VEHICLE_DIALOG
   };
}

export function closeNewVehicleDialog() {
   return {
      type: CLOSE_NEW_VEHICLE_DIALOG
   };
}

export function openEditVehicleDialog(data) {
   return {
      type: OPEN_EDIT_VEHICLE_DIALOG,
      data
   };
}

export function closeEditVehicleDialog() {
   return {
      type: CLOSE_EDIT_VEHICLE_DIALOG
   };
}

export function addVehicle(newVehicle) {
   return (dispatch) => {

      const request = axios.post('/admin/addVehicle', {
         newVehicle
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
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Added a New Vehicle!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getVehicles());
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

export function updateVehicle(vehicle) {
   return (dispatch) => {

      const request = axios.post('/admin/updateVehicle', {
         vehicle
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
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Updated a Vehicle!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getVehicles());
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

export function removeVehicle(vehicleId) {
   return (dispatch) => {

      const request = axios.post('/admin/removeVehicle', {
         vehicleId
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
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Removed a Vehicle!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getVehicles());
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

export function removeVehicles(vehicleIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removeVehicles', {
         vehicleIds
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
            history.push('/login');
         } else {
            dispatch(showMessage({
               message: 'Successfully Removed the Vehicles!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_VEHICLES
               })
            ]).then(() => dispatch(getVehicles()));
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

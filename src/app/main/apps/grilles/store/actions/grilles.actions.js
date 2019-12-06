import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_GRILLES = '[GRILLES] GET GRILLES';
export const GET_VEHICLE_TYPES = '[TIRES] GET VEHICLE TYPES';
export const SET_SEARCH_TEXT = '[GRILLES] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_GRILLES = '[GRILLES] TOGGLE IN SELECTED GRILLES';
export const SELECT_ALL_GRILLES = '[GRILLES] SELECT ALL GRILLES';
export const DESELECT_ALL_GRILLES = '[GRILLES] DESELECT ALL GRILLES';
export const OPEN_NEW_GRILLE_DIALOG = '[GRILLES] OPEN NEW GRILLE DIALOG';
export const CLOSE_NEW_GRILLE_DIALOG = '[GRILLES] CLOSE NEW GRILLE DIALOG';
export const OPEN_EDIT_GRILLE_DIALOG = '[GRILLES] OPEN EDIT GRILLE DIALOG';
export const CLOSE_EDIT_GRILLE_DIALOG = '[GRILLES] CLOSE EDIT GRILLE DIALOG';

export function getGrilles() {
   const request = axios.post(`${settingConfig.apiServerURL}/admin/getPartials`, {
      type: 'grille'
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
               type: GET_GRILLES,
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

export function toggleInSelectedGrilles(grilleId) {
   return {
      type: TOGGLE_IN_SELECTED_GRILLES,
      grilleId
   };
}

export function selectAllGrilles() {
   return {
      type: SELECT_ALL_GRILLES
   };
}

export function deSelectAllGrilles() {
   return {
      type: DESELECT_ALL_GRILLES
   };
}

export function openNewGrilleDialog() {
   return {
      type: OPEN_NEW_GRILLE_DIALOG
   };
}

export function closeNewGrilleDialog() {
   return {
      type: CLOSE_NEW_GRILLE_DIALOG
   };
}

export function openEditGrilleDialog(data) {
   return {
      type: OPEN_EDIT_GRILLE_DIALOG,
      data
   };
}

export function closeEditGrilleDialog() {
   return {
      type: CLOSE_EDIT_GRILLE_DIALOG
   };
}

export function addGrille(newGrille) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/addPartial`, {
         newPartial: newGrille
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
               message: 'Successfully Added a New Grille!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getGrilles());
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

export function updateGrille(grille) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/updatePartial`, {
         partial: grille
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
               message: 'Successfully Updated a Grille!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getGrilles());
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

export function removeGrille(grilleId) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartial`, {
         partialId: grilleId
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
               message: 'Successfully Removed a Grille!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getGrilles());
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

export function removeGrilles(grilleIds) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removePartials`, {
         partialIds: grilleIds
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
               message: 'Successfully Removed the Grilles!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_GRILLES
               })
            ]).then(() => dispatch(getGrilles()));
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

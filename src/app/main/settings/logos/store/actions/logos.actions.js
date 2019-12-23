import axios from 'axios';
import {showMessage} from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import settingConfig from '../../../../../fuse-configs/settingsConfig';

export const GET_LOGOS = '[LOGOS] GET LOGOS';
export const SET_SEARCH_TEXT = '[LOGOS] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_LOGOS = '[LOGOS] TOGGLE IN SELECTED LOGOS';
export const SELECT_ALL_LOGOS = '[LOGOS] SELECT ALL LOGOS';
export const DESELECT_ALL_LOGOS = '[LOGOS] DESELECT ALL LOGOS';
export const OPEN_NEW_LOGO_DIALOG = '[LOGOS] OPEN NEW LOGO DIALOG';
export const CLOSE_NEW_LOGO_DIALOG = '[LOGOS] CLOSE NEW LOGO DIALOG';
export const OPEN_EDIT_LOGO_DIALOG = '[LOGOS] OPEN EDIT LOGO DIALOG';
export const CLOSE_EDIT_LOGO_DIALOG = '[LOGOS] CLOSE EDIT LOGO DIALOG';

export function getLogos() {
   const request = axios.post(`${settingConfig.apiServerURL}/admin/getLogos`);

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
               type: GET_LOGOS,
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

export function toggleInSelectedLogos(logoId) {
   return {
      type: TOGGLE_IN_SELECTED_LOGOS,
      logoId
   };
}

export function selectAllLogos() {
   return {
      type: SELECT_ALL_LOGOS
   };
}

export function deSelectAllLogos() {
   return {
      type: DESELECT_ALL_LOGOS
   };
}

export function openNewLogoDialog() {
   return {
      type: OPEN_NEW_LOGO_DIALOG
   };
}

export function closeNewLogoDialog() {
   return {
      type: CLOSE_NEW_LOGO_DIALOG
   };
}

export function openEditLogoDialog(data) {
   return {
      type: OPEN_EDIT_LOGO_DIALOG,
      data
   };
}

export function closeEditLogoDialog() {
   return {
      type: CLOSE_EDIT_LOGO_DIALOG
   };
}

export function addLogo(newLogo) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/addLogo`, {
         newLogo: newLogo
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
               message: 'Successfully Added a New Logo!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getLogos());
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

export function updateLogo(logo) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/updateLogo`, {
         logo: logo
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
               message: 'Successfully Updated a Logo!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getLogos());
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

export function setLogo(logo) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/setLogo`, {
         logo: logo
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
               message: 'Successfully Set a Logo!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getLogos());
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

export function removeLogo(logoId) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removeLogo`, {
         logoId: logoId
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
               message: 'Successfully Removed a Logo!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getLogos());
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

export function removeLogos(logoIds) {
   return (dispatch) => {

      const request = axios.post(`${settingConfig.apiServerURL}/admin/removeLogos`, {
         logoIds: logoIds
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
               message: 'Successfully Removed the Logos!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            Promise.all([
               dispatch({
                  type: DESELECT_ALL_LOGOS
               })
            ]).then(() => dispatch(getLogos()));
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
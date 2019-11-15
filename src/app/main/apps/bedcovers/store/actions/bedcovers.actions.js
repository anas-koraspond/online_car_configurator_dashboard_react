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

export function getBedCovers() {
   const request = axios.post('/admin/getPartials', {
      type: 'bedcover'
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

export function toggleInSelectedBedCovers(bedcoverId) {
   return {
      type: TOGGLE_IN_SELECTED_BEDCOVERS,
      bedcoverId
   };
}

export function selectAllBedCovers() {
   return {
      type: SELECT_ALL_BEDCOVERS
   };
}

export function deSelectAllBedCovers() {
   return {
      type: DESELECT_ALL_BEDCOVERS
   };
}

export function openNewBedCoverDialog() {
   return {
      type: OPEN_NEW_BEDCOVER_DIALOG
   };
}

export function closeNewBedCoverDialog() {
   return {
      type: CLOSE_NEW_BEDCOVER_DIALOG
   };
}

export function openEditBedCoverDialog(data) {
   return {
      type: OPEN_EDIT_BEDCOVER_DIALOG,
      data
   };
}

export function closeEditBedCoverDialog() {
   return {
      type: CLOSE_EDIT_BEDCOVER_DIALOG
   };
}

export function addBedCover(newBedCover) {
   return (dispatch) => {

      const request = axios.post('/admin/addPartial', {
         newPartial: newBedCover
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
               message: 'Successfully Added a New Bed Cover!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getBedCovers());
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

export function updateBedCover(bedcover) {
   return (dispatch) => {

      const request = axios.post('/admin/updatePartial', {
         partial: bedcover
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
               message: 'Successfully Updated a Bed Cover!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getBedCovers());
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

export function removeBedCover(bedcoverId) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartial', {
         partialId: bedcoverId
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
               message: 'Successfully Removed a Bed Cover!',
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));
            dispatch(getBedCovers());
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

export function removeBedCovers(bedcoverIds) {
   return (dispatch) => {

      const request = axios.post('/admin/removePartials', {
         partialIds: bedcoverIds
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
               message: 'Successfully Removed the Bed Covers!',
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
            ]).then(() => dispatch(getBedCovers()));
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

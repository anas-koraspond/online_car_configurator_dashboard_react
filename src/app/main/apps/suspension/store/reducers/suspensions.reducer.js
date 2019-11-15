import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedSuspensionIds: [],
   suspensionDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const suspensionsReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_SUSPENSIONS: {
         return {
            ...state,
            entities: _.keyBy(action.payload, '_id')
         };
      }
      case Actions.SET_SEARCH_TEXT: {
         return {
            ...state,
            searchText: action.searchText
         };
      }
      case Actions.TOGGLE_IN_SELECTED_SUSPENSIONS: {

         const suspensionId = action.suspensionId;

         let selectedSuspensionIds = [...state.selectedSuspensionIds];

         if (selectedSuspensionIds.find(id => id === suspensionId) !== undefined) {
            selectedSuspensionIds = selectedSuspensionIds.filter(id => id !== suspensionId);
         } else {
            selectedSuspensionIds = [...selectedSuspensionIds, suspensionId];
         }

         return {
            ...state,
            selectedSuspensionIds: selectedSuspensionIds
         };
      }
      case Actions.SELECT_ALL_SUSPENSIONS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedSuspensionIds = arr.map(suspension => suspension._id);

         return {
            ...state,
            selectedSuspensionIds: selectedSuspensionIds
         };
      }
      case Actions.DESELECT_ALL_SUSPENSIONS: {
         return {
            ...state,
            selectedSuspensionIds: []
         };
      }
      case Actions.OPEN_NEW_SUSPENSION_DIALOG: {
         return {
            ...state,
            suspensionDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_SUSPENSION_DIALOG: {
         return {
            ...state,
            suspensionDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_SUSPENSION_DIALOG: {
         return {
            ...state,
            suspensionDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_SUSPENSION_DIALOG: {
         return {
            ...state,
            suspensionDialog: {
               type: 'edit',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      default: {
         return state;
      }
   }
};

export default suspensionsReducer;
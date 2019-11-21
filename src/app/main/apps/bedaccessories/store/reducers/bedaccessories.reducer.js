import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedBedAccessoryIds: [],
   bedaccessoryDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   },
   vehicleTypes: []
};

const bedaccessoriesReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_BEDACCESSORIES: {
         return {
            ...state,
            entities: _.keyBy(action.payload, '_id')
         };
      }
      case Actions.GET_VEHICLE_TYPES: {
         return {
            ...state,
            vehicleTypes: action.payload
         };
      }
      case Actions.SET_SEARCH_TEXT: {
         return {
            ...state,
            searchText: action.searchText
         };
      }
      case Actions.TOGGLE_IN_SELECTED_BEDACCESSORIES: {

         const bedaccessoryId = action.bedaccessoryId;

         let selectedBedAccessoryIds = [...state.selectedBedAccessoryIds];

         if (selectedBedAccessoryIds.find(id => id === bedaccessoryId) !== undefined) {
            selectedBedAccessoryIds = selectedBedAccessoryIds.filter(id => id !== bedaccessoryId);
         } else {
            selectedBedAccessoryIds = [...selectedBedAccessoryIds, bedaccessoryId];
         }

         return {
            ...state,
            selectedBedAccessoryIds: selectedBedAccessoryIds
         };
      }
      case Actions.SELECT_ALL_BEDACCESSORIES: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedBedAccessoryIds = arr.map(bedaccessory => bedaccessory._id);

         return {
            ...state,
            selectedBedAccessoryIds: selectedBedAccessoryIds
         };
      }
      case Actions.DESELECT_ALL_BEDACCESSORIES: {
         return {
            ...state,
            selectedBedAccessoryIds: []
         };
      }
      case Actions.OPEN_NEW_BEDACCESSORY_DIALOG: {
         return {
            ...state,
            bedaccessoryDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_BEDACCESSORY_DIALOG: {
         return {
            ...state,
            bedaccessoryDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_BEDACCESSORY_DIALOG: {
         return {
            ...state,
            bedaccessoryDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_BEDACCESSORY_DIALOG: {
         return {
            ...state,
            bedaccessoryDialog: {
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

export default bedaccessoriesReducer;
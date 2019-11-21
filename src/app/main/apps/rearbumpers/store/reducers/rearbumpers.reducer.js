import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedRearBumperIds: [],
   rearbumperDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   },
   vehicleTypes: []
};

const rearbumpersReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_REARBUMPERS: {
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
      case Actions.TOGGLE_IN_SELECTED_REARBUMPERS: {

         const rearbumperId = action.rearbumperId;

         let selectedRearBumperIds = [...state.selectedRearBumperIds];

         if (selectedRearBumperIds.find(id => id === rearbumperId) !== undefined) {
            selectedRearBumperIds = selectedRearBumperIds.filter(id => id !== rearbumperId);
         } else {
            selectedRearBumperIds = [...selectedRearBumperIds, rearbumperId];
         }

         return {
            ...state,
            selectedRearBumperIds: selectedRearBumperIds
         };
      }
      case Actions.SELECT_ALL_REARBUMPERS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedRearBumperIds = arr.map(rearbumper => rearbumper._id);

         return {
            ...state,
            selectedRearBumperIds: selectedRearBumperIds
         };
      }
      case Actions.DESELECT_ALL_REARBUMPERS: {
         return {
            ...state,
            selectedRearBumperIds: []
         };
      }
      case Actions.OPEN_NEW_REARBUMPER_DIALOG: {
         return {
            ...state,
            rearbumperDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_REARBUMPER_DIALOG: {
         return {
            ...state,
            rearbumperDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_REARBUMPER_DIALOG: {
         return {
            ...state,
            rearbumperDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_REARBUMPER_DIALOG: {
         return {
            ...state,
            rearbumperDialog: {
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

export default rearbumpersReducer;
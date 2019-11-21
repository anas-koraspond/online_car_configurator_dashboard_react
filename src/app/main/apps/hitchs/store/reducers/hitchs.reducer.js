import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedHitchIds: [],
   hitchDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   },
   vehicleTypes: []
};

const hitchsReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_HITCHS: {
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
      case Actions.TOGGLE_IN_SELECTED_HITCHS: {

         const hitchId = action.hitchId;

         let selectedHitchIds = [...state.selectedHitchIds];

         if (selectedHitchIds.find(id => id === hitchId) !== undefined) {
            selectedHitchIds = selectedHitchIds.filter(id => id !== hitchId);
         } else {
            selectedHitchIds = [...selectedHitchIds, hitchId];
         }

         return {
            ...state,
            selectedHitchIds: selectedHitchIds
         };
      }
      case Actions.SELECT_ALL_HITCHS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedHitchIds = arr.map(hitch => hitch._id);

         return {
            ...state,
            selectedHitchIds: selectedHitchIds
         };
      }
      case Actions.DESELECT_ALL_HITCHS: {
         return {
            ...state,
            selectedHitchIds: []
         };
      }
      case Actions.OPEN_NEW_HITCH_DIALOG: {
         return {
            ...state,
            hitchDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_HITCH_DIALOG: {
         return {
            ...state,
            hitchDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_HITCH_DIALOG: {
         return {
            ...state,
            hitchDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_HITCH_DIALOG: {
         return {
            ...state,
            hitchDialog: {
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

export default hitchsReducer;
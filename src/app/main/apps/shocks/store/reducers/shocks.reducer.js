import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedShockIds: [],
   shockDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   },
   vehicleTypes: []
};

const shocksReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_SHOCKS: {
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
      case Actions.TOGGLE_IN_SELECTED_SHOCKS: {

         const shockId = action.shockId;

         let selectedShockIds = [...state.selectedShockIds];

         if (selectedShockIds.find(id => id === shockId) !== undefined) {
            selectedShockIds = selectedShockIds.filter(id => id !== shockId);
         } else {
            selectedShockIds = [...selectedShockIds, shockId];
         }

         return {
            ...state,
            selectedShockIds: selectedShockIds
         };
      }
      case Actions.SELECT_ALL_SHOCKS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedShockIds = arr.map(shock => shock._id);

         return {
            ...state,
            selectedShockIds: selectedShockIds
         };
      }
      case Actions.DESELECT_ALL_SHOCKS: {
         return {
            ...state,
            selectedShockIds: []
         };
      }
      case Actions.OPEN_NEW_SHOCK_DIALOG: {
         return {
            ...state,
            shockDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_SHOCK_DIALOG: {
         return {
            ...state,
            shockDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_SHOCK_DIALOG: {
         return {
            ...state,
            shockDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_SHOCK_DIALOG: {
         return {
            ...state,
            shockDialog: {
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

export default shocksReducer;
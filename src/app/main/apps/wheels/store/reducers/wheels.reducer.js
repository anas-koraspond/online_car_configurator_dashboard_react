import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedWheelIds: [],
   wheelDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const wheelsReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_WHEELS: {
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
      case Actions.TOGGLE_IN_SELECTED_WHEELS: {

         const wheelId = action.wheelId;

         let selectedWheelIds = [...state.selectedWheelIds];

         if (selectedWheelIds.find(id => id === wheelId) !== undefined) {
            selectedWheelIds = selectedWheelIds.filter(id => id !== wheelId);
         } else {
            selectedWheelIds = [...selectedWheelIds, wheelId];
         }

         return {
            ...state,
            selectedWheelIds: selectedWheelIds
         };
      }
      case Actions.SELECT_ALL_WHEELS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedWheelIds = arr.map(wheel => wheel._id);

         return {
            ...state,
            selectedWheelIds: selectedWheelIds
         };
      }
      case Actions.DESELECT_ALL_WHEELS: {
         return {
            ...state,
            selectedWheelIds: []
         };
      }
      case Actions.OPEN_NEW_WHEEL_DIALOG: {
         return {
            ...state,
            wheelDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_WHEEL_DIALOG: {
         return {
            ...state,
            wheelDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_WHEEL_DIALOG: {
         return {
            ...state,
            wheelDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_WHEEL_DIALOG: {
         return {
            ...state,
            wheelDialog: {
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

export default wheelsReducer;
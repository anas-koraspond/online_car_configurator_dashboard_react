import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedTireIds: [],
   tireDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const tiresReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_TIRES: {
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
      case Actions.TOGGLE_IN_SELECTED_TIRES: {

         const tireId = action.tireId;

         let selectedTireIds = [...state.selectedTireIds];

         if (selectedTireIds.find(id => id === tireId) !== undefined) {
            selectedTireIds = selectedTireIds.filter(id => id !== tireId);
         } else {
            selectedTireIds = [...selectedTireIds, tireId];
         }

         return {
            ...state,
            selectedTireIds: selectedTireIds
         };
      }
      case Actions.SELECT_ALL_TIRES: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedTireIds = arr.map(tire => tire._id);

         return {
            ...state,
            selectedTireIds: selectedTireIds
         };
      }
      case Actions.DESELECT_ALL_TIRES: {
         return {
            ...state,
            selectedTireIds: []
         };
      }
      case Actions.OPEN_NEW_TIRE_DIALOG: {
         return {
            ...state,
            tireDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_TIRE_DIALOG: {
         return {
            ...state,
            tireDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_TIRE_DIALOG: {
         return {
            ...state,
            tireDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_TIRE_DIALOG: {
         return {
            ...state,
            tireDialog: {
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

export default tiresReducer;
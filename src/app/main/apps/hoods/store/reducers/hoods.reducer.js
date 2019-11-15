import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedHoodIds: [],
   hoodDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const hoodsReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_HOODS: {
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
      case Actions.TOGGLE_IN_SELECTED_HOODS: {

         const hoodId = action.hoodId;

         let selectedHoodIds = [...state.selectedHoodIds];

         if (selectedHoodIds.find(id => id === hoodId) !== undefined) {
            selectedHoodIds = selectedHoodIds.filter(id => id !== hoodId);
         } else {
            selectedHoodIds = [...selectedHoodIds, hoodId];
         }

         return {
            ...state,
            selectedHoodIds: selectedHoodIds
         };
      }
      case Actions.SELECT_ALL_HOODS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedHoodIds = arr.map(hood => hood._id);

         return {
            ...state,
            selectedHoodIds: selectedHoodIds
         };
      }
      case Actions.DESELECT_ALL_HOODS: {
         return {
            ...state,
            selectedHoodIds: []
         };
      }
      case Actions.OPEN_NEW_HOOD_DIALOG: {
         return {
            ...state,
            hoodDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_HOOD_DIALOG: {
         return {
            ...state,
            hoodDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_HOOD_DIALOG: {
         return {
            ...state,
            hoodDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_HOOD_DIALOG: {
         return {
            ...state,
            hoodDialog: {
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

export default hoodsReducer;
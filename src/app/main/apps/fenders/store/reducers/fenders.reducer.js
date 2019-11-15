import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedFenderIds: [],
   fenderDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const fendersReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_FENDERS: {
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
      case Actions.TOGGLE_IN_SELECTED_FENDERS: {

         const fenderId = action.fenderId;

         let selectedFenderIds = [...state.selectedFenderIds];

         if (selectedFenderIds.find(id => id === fenderId) !== undefined) {
            selectedFenderIds = selectedFenderIds.filter(id => id !== fenderId);
         } else {
            selectedFenderIds = [...selectedFenderIds, fenderId];
         }

         return {
            ...state,
            selectedFenderIds: selectedFenderIds
         };
      }
      case Actions.SELECT_ALL_FENDERS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedFenderIds = arr.map(fender => fender._id);

         return {
            ...state,
            selectedFenderIds: selectedFenderIds
         };
      }
      case Actions.DESELECT_ALL_FENDERS: {
         return {
            ...state,
            selectedFenderIds: []
         };
      }
      case Actions.OPEN_NEW_FENDER_DIALOG: {
         return {
            ...state,
            fenderDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_FENDER_DIALOG: {
         return {
            ...state,
            fenderDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_FENDER_DIALOG: {
         return {
            ...state,
            fenderDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_FENDER_DIALOG: {
         return {
            ...state,
            fenderDialog: {
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

export default fendersReducer;
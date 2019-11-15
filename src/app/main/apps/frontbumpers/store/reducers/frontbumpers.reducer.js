import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedFrontBumperIds: [],
   frontbumperDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const frontbumpersReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_FRONTBUMPERS: {
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
      case Actions.TOGGLE_IN_SELECTED_FRONTBUMPERS: {

         const frontbumperId = action.frontbumperId;

         let selectedFrontBumperIds = [...state.selectedFrontBumperIds];

         if (selectedFrontBumperIds.find(id => id === frontbumperId) !== undefined) {
            selectedFrontBumperIds = selectedFrontBumperIds.filter(id => id !== frontbumperId);
         } else {
            selectedFrontBumperIds = [...selectedFrontBumperIds, frontbumperId];
         }

         return {
            ...state,
            selectedFrontBumperIds: selectedFrontBumperIds
         };
      }
      case Actions.SELECT_ALL_FRONTBUMPERS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedFrontBumperIds = arr.map(frontbumper => frontbumper._id);

         return {
            ...state,
            selectedFrontBumperIds: selectedFrontBumperIds
         };
      }
      case Actions.DESELECT_ALL_FRONTBUMPERS: {
         return {
            ...state,
            selectedFrontBumperIds: []
         };
      }
      case Actions.OPEN_NEW_FRONTBUMPER_DIALOG: {
         return {
            ...state,
            frontbumperDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_FRONTBUMPER_DIALOG: {
         return {
            ...state,
            frontbumperDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_FRONTBUMPER_DIALOG: {
         return {
            ...state,
            frontbumperDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_FRONTBUMPER_DIALOG: {
         return {
            ...state,
            frontbumperDialog: {
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

export default frontbumpersReducer;
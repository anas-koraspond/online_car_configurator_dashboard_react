import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedHeadlightIds: [],
   headlightDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const headlightsReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_HEADLIGHTS: {
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
      case Actions.TOGGLE_IN_SELECTED_HEADLIGHTS: {

         const headlightId = action.headlightId;

         let selectedHeadlightIds = [...state.selectedHeadlightIds];

         if (selectedHeadlightIds.find(id => id === headlightId) !== undefined) {
            selectedHeadlightIds = selectedHeadlightIds.filter(id => id !== headlightId);
         } else {
            selectedHeadlightIds = [...selectedHeadlightIds, headlightId];
         }

         return {
            ...state,
            selectedHeadlightIds: selectedHeadlightIds
         };
      }
      case Actions.SELECT_ALL_HEADLIGHTS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedHeadlightIds = arr.map(headlight => headlight._id);

         return {
            ...state,
            selectedHeadlightIds: selectedHeadlightIds
         };
      }
      case Actions.DESELECT_ALL_HEADLIGHTS: {
         return {
            ...state,
            selectedHeadlightIds: []
         };
      }
      case Actions.OPEN_NEW_HEADLIGHT_DIALOG: {
         return {
            ...state,
            headlightDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_HEADLIGHT_DIALOG: {
         return {
            ...state,
            headlightDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_HEADLIGHT_DIALOG: {
         return {
            ...state,
            headlightDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_HEADLIGHT_DIALOG: {
         return {
            ...state,
            headlightDialog: {
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

export default headlightsReducer;
import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedLogoIds: [],
   logoDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const logosReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_LOGOS: {
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
      case Actions.TOGGLE_IN_SELECTED_LOGOS: {

         const logoId = action.logoId;

         let selectedLogoIds = [...state.selectedLogoIds];

         if (selectedLogoIds.find(id => id === logoId) !== undefined) {
            selectedLogoIds = selectedLogoIds.filter(id => id !== logoId);
         } else {
            selectedLogoIds = [...selectedLogoIds, logoId];
         }

         return {
            ...state,
            selectedLogoIds: selectedLogoIds
         };
      }
      case Actions.SELECT_ALL_LOGOS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedLogoIds = arr.map(logo => logo._id);

         return {
            ...state,
            selectedLogoIds: selectedLogoIds
         };
      }
      case Actions.DESELECT_ALL_LOGOS: {
         return {
            ...state,
            selectedLogoIds: []
         };
      }
      case Actions.OPEN_NEW_LOGO_DIALOG: {
         return {
            ...state,
            logoDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_LOGO_DIALOG: {
         return {
            ...state,
            logoDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_LOGO_DIALOG: {
         return {
            ...state,
            logoDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_LOGO_DIALOG: {
         return {
            ...state,
            logoDialog: {
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

export default logosReducer;
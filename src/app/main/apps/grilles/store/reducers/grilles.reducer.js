import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedGrilleIds: [],
   grilleDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const grillesReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_GRILLES: {
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
      case Actions.TOGGLE_IN_SELECTED_GRILLES: {

         const grilleId = action.grilleId;

         let selectedGrilleIds = [...state.selectedGrilleIds];

         if (selectedGrilleIds.find(id => id === grilleId) !== undefined) {
            selectedGrilleIds = selectedGrilleIds.filter(id => id !== grilleId);
         } else {
            selectedGrilleIds = [...selectedGrilleIds, grilleId];
         }

         return {
            ...state,
            selectedGrilleIds: selectedGrilleIds
         };
      }
      case Actions.SELECT_ALL_GRILLES: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedGrilleIds = arr.map(grille => grille._id);

         return {
            ...state,
            selectedGrilleIds: selectedGrilleIds
         };
      }
      case Actions.DESELECT_ALL_GRILLES: {
         return {
            ...state,
            selectedGrilleIds: []
         };
      }
      case Actions.OPEN_NEW_GRILLE_DIALOG: {
         return {
            ...state,
            grilleDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_GRILLE_DIALOG: {
         return {
            ...state,
            grilleDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_GRILLE_DIALOG: {
         return {
            ...state,
            grilleDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_GRILLE_DIALOG: {
         return {
            ...state,
            grilleDialog: {
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

export default grillesReducer;
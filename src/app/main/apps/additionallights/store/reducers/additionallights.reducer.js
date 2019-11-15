import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedAdditionalLightIds: [],
   additionallightDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const additionallightsReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_BEDCOVERS: {
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
      case Actions.TOGGLE_IN_SELECTED_BEDCOVERS: {

         const additionallightId = action.additionallightId;

         let selectedAdditionalLightIds = [...state.selectedAdditionalLightIds];

         if (selectedAdditionalLightIds.find(id => id === additionallightId) !== undefined) {
            selectedAdditionalLightIds = selectedAdditionalLightIds.filter(id => id !== additionallightId);
         } else {
            selectedAdditionalLightIds = [...selectedAdditionalLightIds, additionallightId];
         }

         return {
            ...state,
            selectedAdditionalLightIds: selectedAdditionalLightIds
         };
      }
      case Actions.SELECT_ALL_BEDCOVERS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedAdditionalLightIds = arr.map(additionallight => additionallight._id);

         return {
            ...state,
            selectedAdditionalLightIds: selectedAdditionalLightIds
         };
      }
      case Actions.DESELECT_ALL_BEDCOVERS: {
         return {
            ...state,
            selectedAdditionalLightIds: []
         };
      }
      case Actions.OPEN_NEW_BEDCOVER_DIALOG: {
         return {
            ...state,
            additionallightDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_BEDCOVER_DIALOG: {
         return {
            ...state,
            additionallightDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_BEDCOVER_DIALOG: {
         return {
            ...state,
            additionallightDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_BEDCOVER_DIALOG: {
         return {
            ...state,
            additionallightDialog: {
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

export default additionallightsReducer;
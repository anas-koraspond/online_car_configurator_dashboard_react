import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedBedCoverIds: [],
   bedcoverDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   },
   vehicleTypes: []
};

const bedcoversReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_BEDCOVERS: {
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
      case Actions.TOGGLE_IN_SELECTED_BEDCOVERS: {

         const bedcoverId = action.bedcoverId;

         let selectedBedCoverIds = [...state.selectedBedCoverIds];

         if (selectedBedCoverIds.find(id => id === bedcoverId) !== undefined) {
            selectedBedCoverIds = selectedBedCoverIds.filter(id => id !== bedcoverId);
         } else {
            selectedBedCoverIds = [...selectedBedCoverIds, bedcoverId];
         }

         return {
            ...state,
            selectedBedCoverIds: selectedBedCoverIds
         };
      }
      case Actions.SELECT_ALL_BEDCOVERS: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedBedCoverIds = arr.map(bedcover => bedcover._id);

         return {
            ...state,
            selectedBedCoverIds: selectedBedCoverIds
         };
      }
      case Actions.DESELECT_ALL_BEDCOVERS: {
         return {
            ...state,
            selectedBedCoverIds: []
         };
      }
      case Actions.OPEN_NEW_BEDCOVER_DIALOG: {
         return {
            ...state,
            bedcoverDialog: {
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
            bedcoverDialog: {
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
            bedcoverDialog: {
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
            bedcoverDialog: {
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

export default bedcoversReducer;
import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
   entities: null,
   searchText: '',
   selectedVehicleIds: [],
   vehicleDialog: {
      type: 'new',
      props: {
         open: false
      },
      data: null
   }
};

const vehiclesReducer = function (state = initialState, action) {
   switch (action.type) {
      case Actions.GET_VEHICLES: {
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
      case Actions.TOGGLE_IN_SELECTED_VEHICLES: {

         const vehicleId = action.vehicleId;

         let selectedVehicleIds = [...state.selectedVehicleIds];

         if (selectedVehicleIds.find(id => id === vehicleId) !== undefined) {
            selectedVehicleIds = selectedVehicleIds.filter(id => id !== vehicleId);
         } else {
            selectedVehicleIds = [...selectedVehicleIds, vehicleId];
         }

         return {
            ...state,
            selectedVehicleIds: selectedVehicleIds
         };
      }
      case Actions.SELECT_ALL_VEHICLES: {
         const arr = Object.keys(state.entities).map(k => state.entities[k]);

         const selectedVehicleIds = arr.map(vehicle => vehicle._id);

         return {
            ...state,
            selectedVehicleIds: selectedVehicleIds
         };
      }
      case Actions.DESELECT_ALL_VEHICLES: {
         return {
            ...state,
            selectedVehicleIds: []
         };
      }
      case Actions.OPEN_NEW_VEHICLE_DIALOG: {
         return {
            ...state,
            vehicleDialog: {
               type: 'new',
               props: {
                  open: true
               },
               data: null
            }
         };
      }
      case Actions.CLOSE_NEW_VEHICLE_DIALOG: {
         return {
            ...state,
            vehicleDialog: {
               type: 'new',
               props: {
                  open: false
               },
               data: null
            }
         };
      }
      case Actions.OPEN_EDIT_VEHICLE_DIALOG: {
         return {
            ...state,
            vehicleDialog: {
               type: 'edit',
               props: {
                  open: true
               },
               data: action.data
            }
         };
      }
      case Actions.CLOSE_EDIT_VEHICLE_DIALOG: {
         return {
            ...state,
            vehicleDialog: {
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

export default vehiclesReducer;
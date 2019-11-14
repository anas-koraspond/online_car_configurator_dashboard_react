import React, {useEffect, useState} from 'react';
import {Checkbox, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import VehiclesMultiSelectMenu from './VehiclesMultiSelectMenu';

function VehiclesList(props)
{
   const dispatch = useDispatch();
   const vehicles = useSelector(({vehiclesApp}) => vehiclesApp.vehicles.entities);
   const selectedVehicleIds = useSelector(({vehiclesApp}) => vehiclesApp.vehicles.selectedVehicleIds);
   const searchText = useSelector(({vehiclesApp}) => vehiclesApp.vehicles.searchText);

   const [filteredData, setFilteredData] = useState(null);

   useEffect(() => {
      function getFilteredArray(entities, searchText)
      {
         const arr = Object.keys(entities).map((id) => entities[id]);
         if ( searchText.length === 0 )
         {
            return arr;
         }
         return FuseUtils.filterArrayByString(arr, searchText);
      }

      if ( vehicles )
      {
         setFilteredData(getFilteredArray(vehicles, searchText));
      }
   }, [vehicles, searchText]);


   if ( !filteredData )
   {
      return null;
   }

   if ( filteredData.length === 0 )
   {
      return (
         <FuseAnimate animation="transition.expandIn" delay={300}>
            <div className="flex flex-1 items-center justify-center h-full">
               <Typography color="textSecondary" variant="h5">
                  There are no Vehicles!
               </Typography>
            </div>
         </FuseAnimate>
      );
   }

   return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
         <ReactTable
            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
            getTrProps={(state, rowInfo, column) => {
               return {
                  className: "cursor-pointer",
                  onClick  : (e, handleOriginal) => {
                     if ( rowInfo )
                     {
                        dispatch(Actions.openEditVehicleDialog(rowInfo.original));
                     }
                  }
               }
            }}
            data={filteredData}
            columns={[
               {
                  Header   : () => (
                     <Checkbox
                        onClick={(event) => {
                           event.stopPropagation();
                        }}
                        onChange={(event) => {
                           event.target.checked ? dispatch(Actions.selectAllVehicles()) : dispatch(Actions.deSelectAllVehicles());
                        }}
                        checked={selectedVehicleIds.length === Object.keys(vehicles).length && selectedVehicleIds.length > 0}
                        indeterminate={selectedVehicleIds.length !== Object.keys(vehicles).length && selectedVehicleIds.length > 0}
                     />
                  ),
                  accessor : "",
                  Cell     : row => {
                     return (<Checkbox
                           onClick={(event) => {
                              event.stopPropagation();
                           }}
                           checked={selectedVehicleIds.includes(row.value._id)}
                           onChange={() => dispatch(Actions.toggleInSelectedVehicles(row.value._id))}
                        />
                     )
                  },
                  className: "justify-center",
                  sortable : false,
                  width    : 64
               },
               {
                  Header   : () => (
                     selectedVehicleIds.length > 0 && (
                        <VehiclesMultiSelectMenu/>
                     )
                  ),
                  accessor : "image",
                  Cell     : row => (
                     <img src={row.value} alt={row.original.name} className='rounded-4'></img>
                  ),
                  className: "justify-center",
                  width    : 112,
                  sortable : false
               },
               {
                  Header    : "Brand",
                  accessor  : "brand",
                  filterable: true,
                  className : "font-bold"
               },
               {
                  Header    : "Type",
                  accessor  : "type",
                  filterable: true,
                  className : "font-bold"
               },
               {
                  Header    : "Model File Name",
                  accessor  : "model",
                  Cell     : row => (
                     <p>{row.value.split('/')[row.value.split('/').length-1]}</p>
                  ),
                  filterable: true
               },
               {
                  Header    : "Image File Name",
                  accessor  : "image",
                  Cell     : row => (
                     <p>{row.value.split('/')[row.value.split('/').length-1]}</p>
                  ),
                  filterable: true
               },
               {
                  Header    : "Upload Date",
                  accessor  : "lastUpdate",
                  filterable: true
               },
               {
                  Header: "",
                  width : 64,
                  Cell  : row => (
                     <div className="flex items-center">
                        <IconButton
                           onClick={(ev) => {
                              ev.stopPropagation();
                              dispatch(Actions.removeVehicle(row.original._id));
                           }}
                        >
                           <Icon>delete</Icon>
                        </IconButton>
                     </div>
                  ),
                  className: "justify-center",
               }
            ]}
            defaultPageSize={10}
            noDataText="No vehicles found"
         />
      </FuseAnimate>
   );
}

export default VehiclesList;

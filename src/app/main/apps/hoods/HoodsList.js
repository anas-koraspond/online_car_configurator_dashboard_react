import React, {useEffect, useState} from 'react';
import {Checkbox, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';
import HoodsMultiSelectMenu from './HoodsMultiSelectMenu';

function HoodsList(props)
{
   const dispatch = useDispatch();
   const hoods = useSelector(({hoodsApp}) => hoodsApp.hoods.entities);
   const selectedHoodIds = useSelector(({hoodsApp}) => hoodsApp.hoods.selectedHoodIds);
   const searchText = useSelector(({hoodsApp}) => hoodsApp.hoods.searchText);

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

      if ( hoods )
      {
         setFilteredData(getFilteredArray(hoods, searchText));
      }
   }, [hoods, searchText]);


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
                  There are no Hoods!
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
                        dispatch(Actions.openEditHoodDialog(rowInfo.original));
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
                           event.target.checked ? dispatch(Actions.selectAllHoods()) : dispatch(Actions.deSelectAllHoods());
                        }}
                        checked={selectedHoodIds.length === Object.keys(hoods).length && selectedHoodIds.length > 0}
                        indeterminate={selectedHoodIds.length !== Object.keys(hoods).length && selectedHoodIds.length > 0}
                     />
                  ),
                  accessor : "",
                  Cell     : row => {
                     return (<Checkbox
                           onClick={(event) => {
                              event.stopPropagation();
                           }}
                           checked={selectedHoodIds.includes(row.value._id)}
                           onChange={() => dispatch(Actions.toggleInSelectedHoods(row.value._id))}
                        />
                     )
                  },
                  className: "justify-center",
                  sortable : false,
                  width    : 64
               },
               {
                  Header   : () => (
                     selectedHoodIds.length > 0 && (
                        <HoodsMultiSelectMenu/>
                     )
                  ),
                  accessor : "image",
                  Cell     : row => (
                     <img src={row.value} alt={row.original.name} className='rounded-4'></img>
                  ),
                  className: "justify-center",
                  width    : 61,
                  sortable : false
               },
               {
                  Header    : "Name",
                  accessor  : "name",
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
                              dispatch(Actions.removeHood(row.original._id));
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
            noDataText="No hoods found"
         />
      </FuseAnimate>
   );
}

export default HoodsList;

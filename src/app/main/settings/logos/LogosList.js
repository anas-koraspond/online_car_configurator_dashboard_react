import React, {useEffect, useState} from 'react';
import Checkbox                     from '@material-ui/core/Checkbox';
import Icon                         from '@material-ui/core/Icon';
import IconButton                   from '@material-ui/core/IconButton';
import Typography                   from '@material-ui/core/Typography';
import Switch                       from '@material-ui/core/Switch';
import {FuseUtils, FuseAnimate}     from '@fuse';
import {useDispatch, useSelector}   from 'react-redux';
import ReactTable                   from "react-table";
import * as Actions                 from './store/actions';
import LogosMultiSelectMenu         from './LogosMultiSelectMenu';
import settingConfig                from '../../../fuse-configs/settingsConfig';

function LogosList(props)
{
   const dispatch = useDispatch();
   const logos = useSelector(({logosApp}) => logosApp.logos.entities);
   const selectedLogoIds = useSelector(({logosApp}) => logosApp.logos.selectedLogoIds);
   const searchText = useSelector(({logosApp}) => logosApp.logos.searchText);

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

      if ( logos )
      {
         setFilteredData(getFilteredArray(logos, searchText));
      }
   }, [logos, searchText]);


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
                  There are no Logos!
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
                        dispatch(Actions.openEditLogoDialog(rowInfo.original));
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
                           event.target.checked ? dispatch(Actions.selectAllLogos()) : dispatch(Actions.deSelectAllLogos());
                        }}
                        checked={selectedLogoIds.length === Object.keys(logos).length && selectedLogoIds.length > 0}
                        indeterminate={selectedLogoIds.length !== Object.keys(logos).length && selectedLogoIds.length > 0}
                     />
                  ),
                  accessor : "",
                  Cell     : row => {
                     return (<Checkbox
                           onClick={(event) => {
                              event.stopPropagation();
                           }}
                           checked={selectedLogoIds.includes(row.value._id)}
                           onChange={() => dispatch(Actions.toggleInSelectedLogos(row.value._id))}
                        />
                     )
                  },
                  className: "justify-center",
                  sortable : false,
                  width    : 64
               },
               {
                  Header   : () => (
                     selectedLogoIds.length > 0 && (
                        <LogosMultiSelectMenu/>
                     )
                  ),
                  accessor : "image",
                  Cell     : row => (
                     <img src={`${settingConfig.apiServerURL}${row.value}`} alt={row.original.name} className='rounded-4'></img>
                  ),
                  className: "justify-center",
                  width    : 320,
                  sortable : false
               },
               {
                  Header    : "Name",
                  accessor  : "name",
                  filterable: true,
                  className : "font-bold"
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
                  Header: "Action",
                  width : 120,
                  Cell  : row => (
                     <div className="flex items-center">
                        <Switch
                           checked={row.original.active}
                           onClick={(ev) => {
                              ev.stopPropagation();
                              row.original.active = ev.target.checked;
                              dispatch(Actions.setLogo(row.original));
                           }}
                           color="secondary"
                        />
                        <IconButton
                           onClick={(ev) => {
                              ev.stopPropagation();
                              dispatch(Actions.removeLogo(row.original._id));
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
            noDataText="No bed covers found"
         />
      </FuseAnimate>
   );
}

export default LogosList;

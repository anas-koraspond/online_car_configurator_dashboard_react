import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function VehiclesMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedVehicleIds = useSelector(({vehiclesApp}) => vehiclesApp.vehicles.selectedVehicleIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedVehicleMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedVehiclesMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedVehiclesMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedVehicleMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedVehiclesMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedVehiclesMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeVehicles(selectedVehicleIds));
                     closeSelectedVehiclesMenu();
                  }}
               >
                  <ListItemIcon className="min-w-40">
                     <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Remove"/>
               </MenuItem>
            </MenuList>
         </Menu>
      </React.Fragment>
   );
}

export default VehiclesMultiSelectMenu;


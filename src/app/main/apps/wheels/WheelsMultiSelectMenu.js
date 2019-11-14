import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function WheelsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedWheelIds = useSelector(({wheelsApp}) => wheelsApp.wheels.selectedWheelIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedWheelMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedWheelsMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedWheelsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedWheelMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedWheelsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedWheelsMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeWheels(selectedWheelIds));
                     closeSelectedWheelsMenu();
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

export default WheelsMultiSelectMenu;


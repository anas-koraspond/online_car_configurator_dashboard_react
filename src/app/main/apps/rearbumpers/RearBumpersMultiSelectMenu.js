import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function RearBumpersMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedRearBumperIds = useSelector(({rearbumpersApp}) => rearbumpersApp.rearbumpers.selectedRearBumperIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedRearBumperMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedRearBumpersMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedRearBumpersMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedRearBumperMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedRearBumpersMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedRearBumpersMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeRearBumpers(selectedRearBumperIds));
                     closeSelectedRearBumpersMenu();
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

export default RearBumpersMultiSelectMenu;


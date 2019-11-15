import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SuspensionsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedSuspensionIds = useSelector(({suspensionsApp}) => suspensionsApp.suspensions.selectedSuspensionIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedSuspensionMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedSuspensionsMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedSuspensionsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedSuspensionMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedSuspensionsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedSuspensionsMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeSuspensions(selectedSuspensionIds));
                     closeSelectedSuspensionsMenu();
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

export default SuspensionsMultiSelectMenu;


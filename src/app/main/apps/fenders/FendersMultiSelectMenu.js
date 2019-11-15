import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function FendersMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedFenderIds = useSelector(({fendersApp}) => fendersApp.fenders.selectedFenderIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedFenderMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedFendersMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedFendersMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedFenderMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedFendersMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedFendersMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeFenders(selectedFenderIds));
                     closeSelectedFendersMenu();
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

export default FendersMultiSelectMenu;


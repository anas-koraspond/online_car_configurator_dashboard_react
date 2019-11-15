import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function FrontBumpersMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedFrontBumperIds = useSelector(({frontbumpersApp}) => frontbumpersApp.frontbumpers.selectedFrontBumperIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedFrontBumperMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedFrontBumpersMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedFrontBumpersMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedFrontBumperMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedFrontBumpersMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedFrontBumpersMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeFrontBumpers(selectedFrontBumperIds));
                     closeSelectedFrontBumpersMenu();
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

export default FrontBumpersMultiSelectMenu;


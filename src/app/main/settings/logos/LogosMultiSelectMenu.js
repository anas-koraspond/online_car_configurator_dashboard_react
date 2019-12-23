import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function LogosMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedLogoIds = useSelector(({logosApp}) => logosApp.logos.selectedLogoIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedLogoMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedLogosMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedLogosMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedLogoMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedLogosMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedLogosMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeLogos(selectedLogoIds));
                     closeSelectedLogosMenu();
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

export default LogosMultiSelectMenu;


import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function BedAccessoriesMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedBedAccessoryIds = useSelector(({bedaccessoriesApp}) => bedaccessoriesApp.bedaccessories.selectedBedAccessoryIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedBedAccessoryMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedBedAccessoriesMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedBedAccessoriesMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedBedAccessoryMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedBedAccessoriesMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedBedAccessoriesMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeBedAccessories(selectedBedAccessoryIds));
                     closeSelectedBedAccessoriesMenu();
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

export default BedAccessoriesMultiSelectMenu;


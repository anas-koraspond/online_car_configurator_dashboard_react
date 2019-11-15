import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function HoodsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedHoodIds = useSelector(({hoodsApp}) => hoodsApp.hoods.selectedHoodIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedHoodMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedHoodsMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedHoodsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedHoodMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedHoodsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedHoodsMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeHoods(selectedHoodIds));
                     closeSelectedHoodsMenu();
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

export default HoodsMultiSelectMenu;


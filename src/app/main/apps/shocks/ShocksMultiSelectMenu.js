import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function ShocksMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedShockIds = useSelector(({shocksApp}) => shocksApp.shocks.selectedShockIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedShockMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedShocksMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedShocksMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedShockMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedShocksMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedShocksMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeShocks(selectedShockIds));
                     closeSelectedShocksMenu();
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

export default ShocksMultiSelectMenu;


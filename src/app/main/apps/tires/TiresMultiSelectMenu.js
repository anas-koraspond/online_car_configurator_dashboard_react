import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function TiresMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedTireIds = useSelector(({tiresApp}) => tiresApp.tires.selectedTireIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedTireMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedTiresMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedTiresMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedTireMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedTiresMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedTiresMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeTires(selectedTireIds));
                     closeSelectedTiresMenu();
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

export default TiresMultiSelectMenu;


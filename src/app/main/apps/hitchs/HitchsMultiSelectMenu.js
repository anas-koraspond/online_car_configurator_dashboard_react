import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function HitchsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedHitchIds = useSelector(({hitchsApp}) => hitchsApp.hitchs.selectedHitchIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedHitchMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedHitchsMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedHitchsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedHitchMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedHitchsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedHitchsMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeHitchs(selectedHitchIds));
                     closeSelectedHitchsMenu();
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

export default HitchsMultiSelectMenu;


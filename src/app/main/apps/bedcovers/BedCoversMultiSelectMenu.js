import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function BedCoversMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedBedCoverIds = useSelector(({bedcoversApp}) => bedcoversApp.bedcovers.selectedBedCoverIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedBedCoverMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedBedCoversMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedBedCoversMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedBedCoverMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedBedCoversMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedBedCoversMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeBedCovers(selectedBedCoverIds));
                     closeSelectedBedCoversMenu();
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

export default BedCoversMultiSelectMenu;


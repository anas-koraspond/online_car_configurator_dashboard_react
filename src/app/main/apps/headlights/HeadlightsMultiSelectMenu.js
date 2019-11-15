import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function HeadlightsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedHeadlightIds = useSelector(({headlightsApp}) => headlightsApp.headlights.selectedHeadlightIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedHeadlightMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedHeadlightsMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedHeadlightsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedHeadlightMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedHeadlightsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedHeadlightsMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeHeadlights(selectedHeadlightIds));
                     closeSelectedHeadlightsMenu();
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

export default HeadlightsMultiSelectMenu;


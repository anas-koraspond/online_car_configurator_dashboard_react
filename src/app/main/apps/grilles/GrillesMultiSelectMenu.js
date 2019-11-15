import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function GrillesMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedGrilleIds = useSelector(({grillesApp}) => grillesApp.grilles.selectedGrilleIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedGrilleMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedGrillesMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedGrillesMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedGrilleMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedGrillesMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedGrillesMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeGrilles(selectedGrilleIds));
                     closeSelectedGrillesMenu();
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

export default GrillesMultiSelectMenu;


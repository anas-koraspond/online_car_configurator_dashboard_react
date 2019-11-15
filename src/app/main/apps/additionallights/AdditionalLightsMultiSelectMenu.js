import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function AdditionalLightsMultiSelectMenu(props)
{
   const dispatch = useDispatch();
   const selectedAdditionalLightIds = useSelector(({additionallightsApp}) => additionallightsApp.additionallights.selectedAdditionalLightIds);

   const [anchorEl, setAnchorEl] = useState(null);

   function openSelectedAdditionalLightMenu(event)
   {
      setAnchorEl(event.currentTarget);
   }

   function closeSelectedAdditionalLightsMenu()
   {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <IconButton
            className="p-0"
            aria-owns={anchorEl ? 'selectedAdditionalLightsMenu' : null}
            aria-haspopup="true"
            onClick={openSelectedAdditionalLightMenu}
         >
            <Icon>more_horiz</Icon>
         </IconButton>
         <Menu
            id="selectedAdditionalLightsMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeSelectedAdditionalLightsMenu}
         >
            <MenuList>
               <MenuItem
                  onClick={() => {
                     dispatch(Actions.removeAdditionalLights(selectedAdditionalLightIds));
                     closeSelectedAdditionalLightsMenu();
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

export default AdditionalLightsMultiSelectMenu;


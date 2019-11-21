import React from 'react';
import {Icon, Input, Paper, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import {Fab} from '@material-ui/core';
import * as Actions from './store/actions';
import {showMessage} from 'app/store/actions';

function GrillesHeader(props)
{
   const dispatch = useDispatch();
   const searchText = useSelector(({grillesApp}) => grillesApp.grilles.searchText);
   const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);
   const vehicleTypes = useSelector(({grillesApp}) => grillesApp.grilles.vehicleTypes);

   return (
      <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

         <div className="flex flex-shrink items-center sm:w-224">

            <div className="flex items-center">
               <FuseAnimate animation="transition.expandIn" delay={300}>
                  <Icon className="text-32 mr-12">account_balance</Icon>
               </FuseAnimate>
               <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="h6" className="hidden sm:flex">Grilles</Typography>
               </FuseAnimate>
            </div>
         </div>

         <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

            <ThemeProvider theme={mainTheme}>
               <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                     <Icon className="mr-8" color="action">search</Icon>

                     <Input
                        placeholder="Search for anything"
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={searchText}
                        inputProps={{
                           'aria-label': 'Search'
                        }}
                        onChange={ev => dispatch(Actions.setSearchText(ev))}
                     />
                  </Paper>
               </FuseAnimate>
            </ThemeProvider>
         </div>
         <FuseAnimate animation="transition.expandIn" delay={300}>
            <Fab
               color="secondary"
               aria-label="add"
               onClick={ev => {
                  if (vehicleTypes.length === 0) {
                     dispatch(showMessage({
                        message: 'There are not registered any vehicles yet. Please register the vehicle first...',
                        autoHideDuration: 3000,
                        anchorOrigin: {
                           vertical: 'top',
                           horizontal: 'right'
                        },
                        variant: 'warning'
                     }))
                  } else {
                     dispatch(Actions.openNewGrilleDialog());
                  }
               }}
            >
               <Icon>add</Icon>
            </Fab>
         </FuseAnimate>
      </div>
   );
}

export default GrillesHeader;

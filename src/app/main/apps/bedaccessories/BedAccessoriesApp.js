import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import BedAccessoriesList from './BedAccessoriesList';
import BedAccessoriesHeader from './BedAccessoriesHeader';
import BedAccessoryDialog from './BedAccessoryDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function BedAccessoriesApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getBedAccessories());
   }, [dispatch]);

   useEffect(() => {
      dispatch(Actions.getVehicleTypes());
   }, [dispatch]);

   return (
      <React.Fragment>
         <FusePageSimple
            classes={{
               contentWrapper: "p-0 sm:p-24 h-full",
               content       : "flex flex-col h-full",
               leftSidebar   : "w-256 border-0",
               header        : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
               <BedAccessoriesHeader pageLayout={pageLayout}/>
            }
            content={
               <BedAccessoriesList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <BedAccessoryDialog/>
      </React.Fragment>
   )
}

export default withReducer('bedaccessoriesApp', reducer)(BedAccessoriesApp);

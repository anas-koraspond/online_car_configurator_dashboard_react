import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import FrontBumpersList from './FrontBumpersList';
import FrontBumpersHeader from './FrontBumpersHeader';
import FrontBumperDialog from './FrontBumperDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function FrontBumpersApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getFrontBumpers());
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
               <FrontBumpersHeader pageLayout={pageLayout}/>
            }
            content={
               <FrontBumpersList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <FrontBumperDialog/>
      </React.Fragment>
   )
}

export default withReducer('frontbumpersApp', reducer)(FrontBumpersApp);

import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import HeadlightsList from './HeadlightsList';
import HeadlightsHeader from './HeadlightsHeader';
import HeadlightDialog from './HeadlightDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function HeadlightsApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getHeadlights());
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
               <HeadlightsHeader pageLayout={pageLayout}/>
            }
            content={
               <HeadlightsList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <HeadlightDialog/>
      </React.Fragment>
   )
}

export default withReducer('headlightsApp', reducer)(HeadlightsApp);

import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import BedCoversList from './BedCoversList';
import BedCoversHeader from './BedCoversHeader';
import BedCoverDialog from './BedCoverDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function BedCoversApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getBedCovers());
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
               <BedCoversHeader pageLayout={pageLayout}/>
            }
            content={
               <BedCoversList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <BedCoverDialog/>
      </React.Fragment>
   )
}

export default withReducer('bedcoversApp', reducer)(BedCoversApp);

import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import RearBumpersList from './RearBumpersList';
import RearBumpersHeader from './RearBumpersHeader';
import RearBumperDialog from './RearBumperDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function RearBumpersApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getRearBumpers());
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
               <RearBumpersHeader pageLayout={pageLayout}/>
            }
            content={
               <RearBumpersList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <RearBumperDialog/>
      </React.Fragment>
   )
}

export default withReducer('rearbumpersApp', reducer)(RearBumpersApp);

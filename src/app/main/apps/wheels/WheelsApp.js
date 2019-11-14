import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import WheelsList from './WheelsList';
import WheelsHeader from './WheelsHeader';
import WheelDialog from './WheelDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function WheelsApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getWheels());
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
               <WheelsHeader pageLayout={pageLayout}/>
            }
            content={
               <WheelsList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <WheelDialog/>
      </React.Fragment>
   )
}

export default withReducer('wheelsApp', reducer)(WheelsApp);

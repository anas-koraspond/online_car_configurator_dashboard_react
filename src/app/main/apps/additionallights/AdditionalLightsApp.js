import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import AdditionalLightsList from './AdditionalLightsList';
import AdditionalLightsHeader from './AdditionalLightsHeader';
import AdditionalLightDialog from './AdditionalLightDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function AdditionalLightsApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getAdditionalLights());
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
               <AdditionalLightsHeader pageLayout={pageLayout}/>
            }
            content={
               <AdditionalLightsList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <AdditionalLightDialog/>
      </React.Fragment>
   )
}

export default withReducer('additionallightsApp', reducer)(AdditionalLightsApp);

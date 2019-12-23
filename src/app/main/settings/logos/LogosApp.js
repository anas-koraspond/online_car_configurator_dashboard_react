import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch} from 'react-redux';
import withReducer from 'app/store/withReducer';
import LogosList from './LogosList';
import LogosHeader from './LogosHeader';
import LogoDialog from './LogoDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function LogosApp(props)
{
   const dispatch = useDispatch();

   const pageLayout = useRef(null);

   useEffect(() => {
      dispatch(Actions.getLogos());
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
               <LogosHeader pageLayout={pageLayout}/>
            }
            content={
               <LogosList/>
            }
            sidebarInner
            ref={pageLayout}
            innerScroll
         />
         <LogoDialog/>
      </React.Fragment>
   )
}

export default withReducer('logosApp', reducer)(LogosApp);

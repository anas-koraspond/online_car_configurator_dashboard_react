import React from 'react';

export const VehiclesAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/vehicles',
         component: React.lazy(() => import('./VehiclesApp'))
      }
   ]
};

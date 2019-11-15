import React from 'react';

export const RearBumpersAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/rearbumpers',
         component: React.lazy(() => import('./RearBumpersApp'))
      }
   ]
};

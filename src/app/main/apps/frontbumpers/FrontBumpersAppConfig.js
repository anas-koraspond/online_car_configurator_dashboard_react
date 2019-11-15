import React from 'react';

export const FrontBumpersAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/frontbumpers',
         component: React.lazy(() => import('./FrontBumpersApp'))
      }
   ]
};

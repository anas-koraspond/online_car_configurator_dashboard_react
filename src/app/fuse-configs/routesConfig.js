import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {appsConfigs} from 'app/main/apps/appsConfigs';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';


const routeConfigs = [
   ...appsConfigs,
   ...pagesConfigs,
   LoginConfig,
   LogoutConfig
];

const routes = [
   ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
   {
      path     : '/',
      exact    : true,
      component: () => <Redirect to="/vehicles"/>
   },
   {
      component: () => <Redirect to="/pages/errors/error-404"/>
   }
];

export default routes;

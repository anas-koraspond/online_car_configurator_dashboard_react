import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
// import {useSelector} from 'react-redux';

import {createMuiTheme} from '@material-ui/core';
import _ from '@lodash';
import FuseThemesConfig from '../../../app/fuse-configs/themesConfig';
import {
   defaultThemes,
   defaultThemeOptions,
   mustHaveThemeOptions,
   extendThemeWithMixins
} from '@fuse/FuseDefaultSettings';

function FuseTheme(props)
{
   // const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);

   // console.warn('FuseTheme:: rendered',mainTheme);

   const themesObj = Object.keys(FuseThemesConfig).length !== 0 ? FuseThemesConfig : defaultThemes;

   const themes = Object.assign({}, ...Object.entries(themesObj).map(([key, value]) => {
      const muiTheme = _.merge({}, defaultThemeOptions, value, mustHaveThemeOptions);
      return {
         [key]: createMuiTheme(_.merge({}, muiTheme, {
            mixins: extendThemeWithMixins(muiTheme)
         }))
      };
   }));

   return (
      <ThemeProvider theme={themes.default}>
         {props.children}
      </ThemeProvider>
   )
}

export default React.memo(FuseTheme);

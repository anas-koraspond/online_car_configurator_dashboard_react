import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
   root: {
      background    : 'url("../assets/images/logos/sign1.jif") no-repeat center center',
      backgroundSize: 'cover',
      color         : theme.palette.primary.contrastText
   }
}));

function Login()
{
   const classes = useStyles();

   return (
      <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

         <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

            <FuseAnimate animation="transition.expandIn">
               <img className="w-320 mb-32" src="assets/images/logos/logo.png" alt="logo"/>
            </FuseAnimate>

            <FuseAnimate animation="transition.slideUpIn" delay={300}>
               <Typography variant="h3" color="inherit" className="font-light">
                  Welcome to Admin Page!
               </Typography>
            </FuseAnimate>

            <FuseAnimate delay={400}>
               <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                  This is Admin Page. You can Upload, Edit and Delete the model of Vehicles and Partials for Frontend App.
               </Typography>
            </FuseAnimate>
         </div>

         <FuseAnimate animation={{translateX: [0, '100%']}}>

            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

               <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                  <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR ACCOUNT</Typography>

                  <JWTLoginTab/>

               </CardContent>
            </Card>
         </FuseAnimate>
      </div>
   )
}

export default Login;

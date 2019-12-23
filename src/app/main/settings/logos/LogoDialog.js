import React, {useEffect, useCallback, useState} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/styles';
import {orange} from '@material-ui/core/colors';
import {useForm} from '@fuse/hooks';
import {FuseUtils, FuseAnimate} from '@fuse';
import * as Actions from './store/actions';
import {showMessage} from 'app/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import _ from '@lodash';
import settingConfig from '../../../fuse-configs/settingsConfig';

const defaultFormState = {
   name : '',
   image: '',
   active: false
};

const useStyles = makeStyles(theme => ({
   productImageFeaturedStar: {
      position: 'absolute',
      top     : 0,
      right   : 0,
      color   : orange[400],
      opacity : 0
   },
   productImageUpload      : {
      transitionProperty      : 'box-shadow',
      transitionDuration      : theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
   },
   productImageItem        : {
      transitionProperty      : 'box-shadow',
      transitionDuration      : theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      '&:hover'               : {
         '& $productImageFeaturedStar': {
            opacity: .8
         }
      },
      '&.featured'            : {
         pointerEvents                      : 'none',
         boxShadow                          : theme.shadows[3],
         '& $productImageFeaturedStar'      : {
            opacity: 1
         },
         '&:hover $productImageFeaturedStar': {
            opacity: 1
         }
      }
   }
}));

function LogoDialog(props)
{
   const dispatch = useDispatch();
   const logoDialog = useSelector(({logosApp}) => logosApp.logos.logoDialog);
   const classes = useStyles(props);
   const {form, handleChange, setForm} = useForm(defaultFormState);
   const [imageUploading, setImageUploading] = useState(false);

   const initDialog = useCallback(
      () => {
         if ( logoDialog.type === 'edit' && logoDialog.data )
         {
            setForm({...logoDialog.data});
         }

         if ( logoDialog.type === 'new' )
         {
            setForm({
               ...defaultFormState,
               ...logoDialog.data,
               id: FuseUtils.generateGUID()
            });
         }
      },
      [logoDialog.data, logoDialog.type, setForm]
   );

   useEffect(() => {
      /**
      * After Dialog Open
      */
      if ( logoDialog.props.open ) {
         initDialog();
      }

   }, [logoDialog.props.open, initDialog]);

   function closeComposeDialog()
   {
      logoDialog.type === 'edit' ? dispatch(Actions.closeEditLogoDialog()) : dispatch(Actions.closeNewLogoDialog());
   }

   function canBeSubmitted()
   {
      return (
         form.name.length > 0 && form.image.length > 0
      );
   }

   function handleSubmit(event)
   {
      event.preventDefault();

      if ( logoDialog.type === 'new' ) {
         dispatch(Actions.addLogo(form));
      } else {
         dispatch(Actions.updateLogo(form));
      }

      closeComposeDialog();
   }

   function handleRemove()
   {
      dispatch(Actions.removeLogo(form._id));
      closeComposeDialog();
   }

   function handleUploadChange(e)
   {
      const file = e.target.files[0];

      if ( !file )
      {
         return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);

      var url = '';

      url = `${settingConfig.apiServerURL}/admin/uploadImage`;

      setImageUploading(true);

      axios.post(url, formData)
      .then(response => {
         if (!response.data.success) {
            dispatch(showMessage({
               message: response.data.message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            }));
         } else {
            dispatch(showMessage({
               message: `Successfully Uploaded a Logo File!`,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'success'
            }));

            setForm(_.set({...form}, 'image', response.data.result));
         }

         setImageUploading(false);
      })
      .catch(err => {
         dispatch(showMessage({
            message: err.message,
            autoHideDuration: 2000,
            anchorOrigin: {
               vertical: 'top',
               horizontal: 'right'
            },
            variant: 'error'
         }));

         setImageUploading(false);
      });
   }

   return (
      <Dialog
         classes={{ paper: "m-24" }}
         {...logoDialog.props}
         onClose={() => {
            if (imageUploading) {
               return;
            }
            closeComposeDialog()
         }}
         fullWidth
         maxWidth="xs"
      >

         <AppBar position="static" elevation={1}>
            <Toolbar className="flex w-full">
               <Typography variant="subtitle1" color="inherit">
                  {logoDialog.type === 'new' ? 'New Logo' : 'Edit Logo'}
               </Typography>
            </Toolbar>
            <div className="flex flex-col items-center justify-center pb-24">
               {logoDialog.type === 'edit' && (
                  <>
                     <img className="w-320" alt="model img" src={`${settingConfig.apiServerURL}${form.image}`} />
                     <Typography variant="h6" color="inherit" className="pt-8">
                        {form.name}
                     </Typography>
                  </>
               )}
            </div>
         </AppBar>
         <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
            <DialogContent classes={{root: "pl-24 pt-24 pr-24"}}>

               <div className="flex">
                  <TextField
                     className="mb-24"
                     label="Logo Name"
                     autoFocus
                     id="name"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     variant="outlined"
                     required
                     fullWidth
                  />
               </div>

               <div className="flex justify-center">
                  <input
                     accept="image/*"
                     className="hidden"
                     id="image-file"
                     type="file"
                     onChange={(e) => handleUploadChange(e)}
                  />
                  <div className="flex justify-center sm:justify-start flex-wrap mb-24">
                     <label
                        htmlFor="image-file"
                        className={
                           clsx(
                              classes.productImageUpload,
                              "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                           )}
                     >
                        <Grid container>
                           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex justify-center">
                              {!imageUploading && <Icon fontSize="large" color="action">cloud_upload</Icon>}
                              {imageUploading && <CircularProgress size={24} />}
                           </Grid>
                           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="flex justify-center text-center">
                              <p>Logo Image</p>                                                         
                           </Grid>
                        </Grid>
                     </label>
                     {form.image.length !== 0 &&
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                           <div
                              className={
                                 clsx(
                                    classes.productImageItem,
                                    "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                                 )
                              }
                           >
                              <img className="max-w-none w-auto" src={`${settingConfig.apiServerURL}${form.image}`} alt="product"/>
                           </div>
                        </FuseAnimate>
                     }
                  </div>
               </div>

            </DialogContent>

            {logoDialog.type === 'new' ? (
               <DialogActions className="justify-between pl-24 pb-24 pr-24">
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleSubmit}
                     type="submit"
                     disabled={!canBeSubmitted()}
                  >
                     Add
                  </Button>
               </DialogActions>
            ) : (
               <DialogActions className="justify-between pl-24 pb-24 pr-24">
                  <Button
                     variant="contained"
                     color="primary"
                     type="submit"
                     onClick={handleSubmit}
                     disabled={!canBeSubmitted()}
                  >
                     Save
                  </Button>
                  <IconButton
                     onClick={handleRemove}
                  >
                     <Icon>delete</Icon>
                  </IconButton>
               </DialogActions>
            )}
         </form>
      </Dialog>
   );
}

export default LogoDialog;

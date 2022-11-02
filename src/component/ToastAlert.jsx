import React, {useEffect} from 'react'

import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { connect } from 'react-redux';
import { closeToast } from '../redux/toast/toast.action';

const ToastAlert = ({toast, closeToast}) => {
    useEffect(() => {
        setTimeout(()=>{
          closeToast()
        }, 6000);

    }, [])
    
    const handleClose = () => {
        closeToast()
      };
      const Alert = React.forwardRef((props, ref)=>{
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      })
        

    return (
        <div>
        <Snackbar
        severity={toast.severity} 

        anchorOrigin={{vertical:'top', horizontal: 'right' }}
        open={toast.openToast}
        // autoHideDuration={5000}
        onClose={handleClose}
        key={'top' + 'right'}
        >

        <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }}>
               {toast.message}
        </Alert>
        </Snackbar>
    </div>
    )
}
const mapStateToProps = (state) => ({
  toast: state.toast,
})
const mapDispatchToProps = dispatch => ({
  closeToast: ()=> dispatch(closeToast())
})


export default connect(mapStateToProps, mapDispatchToProps)(ToastAlert)




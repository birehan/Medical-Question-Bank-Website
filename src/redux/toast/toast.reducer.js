import toastTypes from "./toast.types"

const INITIAL_STATE = {
    openToast: false,
    message: "",
    severity: ""
}

const toastReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case toastTypes.ADD_COURSE: {
           
            return {
                ...state,
                openToast: true,
                message:"Course Created Successfully"
            }
        }
        case toastTypes.UPDATE_COURSE: {
           
            return {
                ...state,
                openToast: true,
                message:"Course Updated Successfully"
            }
        }
        case toastTypes.DELETE_COURSE: {
           
            return {
                ...state,
                openToast: true,
                message:"Course Delete Successfully"
            }
        }
        case toastTypes.CLOSE_TOAST: {
           
            return {
                ...state,
                openToast: false,
                message:""
            }
        }
        case toastTypes.ADD_UNIT: {
           
            return {
                ...state,
                openToast: true,
                message:"Unit Created Successfully"
            }
        }
        case toastTypes.UPDATE_UNIT: {
           
            return {
                ...state,
                openToast: true,
                message:"Unit Updated Successfully"
            }
        }
        case toastTypes.TOAST: {
           
            return {
                ...state,
                openToast: true,
                message:action.payload.message,
                severity: action.payload.severity
                
            }
        }
        default:
            return state;
    }
}

export default toastReducer;
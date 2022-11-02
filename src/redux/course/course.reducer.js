import courseActionTypes from "./course.types"

const INITIAL_STATE = {
    courses:[],
    courseDetail:null,
    units:[],
    selectedUnit:null
}

const courseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case courseActionTypes.SET_COURSES: {
           
            return {
                ...state,
                courses:action.payload
            }
        }

        case courseActionTypes.SET_COURSE: {
           
            return {
                ...state,
                courseDetail:action.payload
              
            }
        }
        case courseActionTypes.SET_UNITS: {
           
            return {
                ...state,
                units:action.payload
                }
        }
        case courseActionTypes.SET_SELECTED_UNIT: {
           
            return {
                ...state,
               selectedUnit:action.payload
            }
        }
       
        default:
            return state;
    }
}

export default courseReducer;
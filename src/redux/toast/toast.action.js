import toastTypes from './toast.types'

export const toastAddCourse = () => ({
    type: toastTypes.ADD_COURSE
})

export const toastUpdateCourse = () => ({
    type: toastTypes.UPDATE_COURSE,
})

export const toastDeleteCourse = () => ({
    type: toastTypes.DELETE_COURSE,
})

export const closeToast = () => ({
    type: toastTypes.CLOSE_TOAST,
})

export const toastAddUnit = () => ({
    type: toastTypes.ADD_UNIT
})
export const toastUpdateUnit = () => ({
    type: toastTypes.UPDATE_UNIT
})
export const toast = (message, severity="success") => ({
    type: toastTypes.TOAST,
    payload:{message, severity},

})



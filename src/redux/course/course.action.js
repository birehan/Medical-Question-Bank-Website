import courseActionTypes from "./course.types";

export const setCourses = courses => ({
    type: courseActionTypes.SET_COURSES,
    payload:courses
})

export const setCourse = course => ({
    type: courseActionTypes.SET_COURSE,
    payload:course
})

export const setUnits = units => ({
    type: courseActionTypes.SET_UNITS,
    payload:units
})
export const setSelectedUnit = unit => ({
    type: courseActionTypes.SET_SELECTED_UNIT,
    payload:unit
})

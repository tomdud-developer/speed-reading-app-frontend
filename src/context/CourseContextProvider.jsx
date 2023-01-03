import React from "react";
import {getDefaultExercisesParameters} from "./getDefaultExercisesParameters";
const CourseContext = React.createContext({});

export const CourseContextProvider = ({ children }) => {
    const [course, setCourse] = React.useState({
        exercises: getDefaultExercisesParameters()
    });

    return (
        <CourseContext.Provider value={{ course, setCourse }}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContext;
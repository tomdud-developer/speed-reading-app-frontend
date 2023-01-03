import {useContext} from "react";
import CourseContextProvider from "../context/CourseContextProvider";

const useCourse = () => {
    return useContext(CourseContextProvider);
}

export default useCourse;
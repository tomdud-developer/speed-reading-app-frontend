import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Perception1 from "../components/perception/excercise/Perception1";
import {NumberInputField} from "../components/perception/excercise/NumberInputField";
import {SessionList} from "../components/dashboard/progress/SessionList";
import CourseContextProvider from "../context/CourseContextProvider";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Perception1">
                <Perception1/>
            </ComponentPreview>
            <ComponentPreview path="/NumberInputField">
                <NumberInputField/>
            </ComponentPreview>
            <ComponentPreview path="/SessionList">
                <SessionList/>
            </ComponentPreview>
            <ComponentPreview
                path="/CourseContextProvider">
                <CourseContextProvider/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
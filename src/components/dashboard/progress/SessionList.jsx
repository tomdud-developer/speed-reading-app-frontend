import * as React from 'react';
import {Link} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import useCourse from "../../../hooks/useCourse";
import {mapNameToLink, mapNameToShortName} from "./mapNameToLink";

export const SessionList = (props) => {
        const {course, setCourse} = useCourse();
        const [checked, setChecked] = React.useState([7]);
        //console.log('fromSessionListComponent', mapNameToLink(props.session[0].name))

        const setActiveExercise = (name, indexInSession, param1, param2) => {
            let exerciseShortName = mapNameToShortName(name);
            let jsonExercise = {};
            jsonExercise[exerciseShortName] = {
                confirmExerciseActive: true,
                indexInSession: indexInSession,
                param1: param1,
                param2: param2,
            };
            setCourse({
                ...course,
                exercises: {
                    ...course.exercises,
                    ...jsonExercise,
                }
            })
        }


        return (
            <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
                {props.session.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem
                            key={'list-item' + value.id}
                            secondaryAction={
                                <Button component={Link} to={`/${mapNameToLink(value.name)}`} variant="contained" onClick={() => {setActiveExercise(value.name, value.indexInSession, value.param1, value.param2)}} color="four" disabled={value.indexInSession != course.finishedExercise+1}>
                                    Ćwicz
                                    <PlayCircleFilledIcon sx={{marginLeft: "10px"}} />
                                </Button>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={value.indexInSession <= course.finishedExercise}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        color={"secondary"}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={`${value.name} ${value.param1!=-1?', '+value.param1:""} ${value.param2!=-1?', '+value.param2:""}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        );
}
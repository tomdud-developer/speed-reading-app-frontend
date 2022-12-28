import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export const SessionList = () => {

        const [checked, setChecked] = React.useState([0,2]);

        return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem
                            key={value}
                            secondaryAction={
                                <Button variant="contained" color="four" disabled={false}>
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
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        color={"secondary"}

                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        );
}
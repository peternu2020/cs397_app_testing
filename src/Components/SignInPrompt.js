import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  
  export default function SignInPrompt({onButtonClick, userName}) {
    const classes = useStyles();
    let text = ""
    const getInputValue = name => event =>
    {
      text = event.target.value;
    }
    const sendUserNameData = () =>
    {
      onButtonClick(text);
    }
    return (
      <Paper className={classes.root}>
        <InputBase
          id="user-name-input"
          className={classes.input}
          placeholder="Enter username"
          onChange={getInputValue('name')}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton onClick = {sendUserNameData} color="primary" className={classes.iconButton} aria-label="directions">
          <CheckCircleIcon />
        </IconButton>
      </Paper>
    );

};
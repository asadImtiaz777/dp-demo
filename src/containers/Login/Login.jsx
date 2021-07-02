import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import isLogin from '../../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getUser from '../../store/actions/auth.actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {

  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    if(props.isError){
      toast.error('Server is not responding');
    }
  }, [props.isError]);

  useEffect(() => {
    if(props.isLogedIn && isLogin()){
      history.push('/');
    }
  }, [props.isLogedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    props.onLogin();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h4">
          DP World
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <ToastContainer />
    </Container>
    );
    
}

const mapStateToProps = state => {
    return {
        isError: state.auth.isError,
        isLogedIn: state.auth.isLogedIn,
        user:state.auth.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onLogin: () => dispatch(getUser())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);
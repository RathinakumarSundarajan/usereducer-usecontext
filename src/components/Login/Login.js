import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

// -------------------------------------------------------------------email Reducer----------------------------------------------------------------/
const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.includes('@')};
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value:'', isValid: false};
};
// -------------------------------------------------------------------passwordReducer---------------------------------------------------------------/
const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.payload, isValid: action.payload.trim().length > 3};
  }
  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 3}
  }
  return {value:'', isValid: false};
};

const Login = (props) => {
  
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid:null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid:null
  });

   const authCtx = useContext(AuthContext)  //------------------------Use Context-------------------------------
  
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log('Checking form validity')
    setFormIsValid(emailIsValid && passwordIsValid);
  },500);

  return () => {
    console.log('CLEANUP');
    clearTimeout(identifier)
  }
  },[emailIsValid, passwordIsValid])
// -----------------------------------------------------------------E-mail Input-------------------------------------------------------------/
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', payload:event.target.value});
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };
// -----------------------------------------------------------------Password Input-------------------------------------------------------------/
  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', payload:event.target.value});
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 3
    );
  };
// -----------------------------------------------------------------validate Email -------------------------------------------------------------/
  const validateEmailHandler = () => {
   dispatchEmail({type:'INPUT_BLUR'})
  };
// -----------------------------------------------------------------validate Password-------------------------------------------------------------/
  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };
// -----------------------------------------------------------------Submition and Lift-UP State-------------------------------------------------------------/
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };
// -----------------------------------------------------------------return-------------------------------------------------------------/
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

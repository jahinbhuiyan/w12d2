import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      return setErrors(['Your passwords must match!']);
    };

    const res = await dispatch(sessionActions.signupUser({ username, email, password }))
    if (res.errors) {
      setErrors(res.errors);
    } else {
      setErrors([res.statusText]);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <ul className="errors-container">
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Username
        <input
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          className="login-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          className="login-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Account</button>
    </form>
  );

};

export default SignupFormPage;
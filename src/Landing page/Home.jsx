import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.username,
          values.password
        );
        const user = userCredential.user;
        navigate('/grid');
        console.log(user);
      } catch (error) {
        console.error('Login error:', error.code, error.message);
        formik.setFieldError('password', 'Invalid email or password');
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='tata'>
      <h1 className="tit">HNG TASK 3</h1>
      <div className="major">
        <div className="cont">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="johndoe_91@xxxxxx.com"
              required
            />
            {formik.touched.username && formik.errors.username && (
              <p className="error">{formik.errors.username}</p>
            )}

            <label htmlFor="password">Password</label>
            <div className="pword">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter Your Password"
                required
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} shown`}
                onClick={togglePassword}
              />
            </div>
            {loading ? (
              <div className="loading-spinner" aria-label="Logging in...">
                
              </div>
            ) : null}

            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;



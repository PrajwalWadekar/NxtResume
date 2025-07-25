import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

import { authStyles as styles } from '../assets/dummystyle';

const Login = ({setCurrentPage}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter valid email address')
      return;
    }
    if(!password){
      setError('Please enter Password')
      return;
    }
    setError('');

    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password});
        const {token} = response.data;

        if(token){
            localStorage.setItem('token',token);
            updateUser(response.data);
            navigate('/dashboard')
        }
    } catch (error) {
            setError(error.response.data?.message || "Something went wrong. Please try again.");
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.title}>Welcome Back</h3>
            <p className={styles.subtitle}>
                Sign in to continue building amazing resumes
            </p>
        </div>

        
      
    </div>
  )
}

export default Login

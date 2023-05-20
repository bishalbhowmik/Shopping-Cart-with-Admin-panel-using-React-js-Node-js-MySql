import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function EmployeeLogin() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('')

    console.log(values);


    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/employeelogin', values)
        .then(res => {
            if(res.data.Status === 'Success') {
                const id = res.data.id;
                // navigate('/employeedetail/'+id);

                navigate('/shopping')
            } else {
                console.log(res.data);
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Users Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                          onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    <p>You are agree to aour terms and policies</p>
                    <p><small>If you are not registered yet Please</small><Link to='/create'>Register</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin
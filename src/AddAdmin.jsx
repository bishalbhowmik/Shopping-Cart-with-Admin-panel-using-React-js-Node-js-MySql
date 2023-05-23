import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
    const [data, setData] = useState({

        email: '',
        password: ''

    })
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();

        formdata.append("email", data.email);
        formdata.append("password", data.password);

        console.log(data);

        axios.post('http://localhost:8081/adminCreate', data)
            .then(res => {

                if (res.data.Status === 'Success') {
                    alert('Admin Registration Successful');
                    navigate('/start');
                }
                else {
                    console.log(res.data.Error);
                }


            })
            .catch(err => console.log(err));
    }
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Admin</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit}>

                <div class="col-12">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                        onChange={e => setData({ ...data, email: e.target.value })} />
                </div>

                <div class="col-12">
                    <label for="inputPassword4" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
                        onChange={e => setData({ ...data, password: e.target.value })} />
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
};

export default AddAdmin;
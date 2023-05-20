import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingProducts from './ShoppingProducts';

const Shopping = () => {

    const [product,setProduct] = useState([]);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
	useEffect(()=>{
		axios.get('http://localhost:8081/shopping')
		.then(res => {
			if(res.data.Status === "Success") {
				if(res.data.role === "admin") {
					// navigate('/');
				} else {
					const id = res.data.id;
					// navigate('/employeedetail/'+id)
					navigate('/shopping')

				}
			} else {
				navigate('/start')
			}
		})
	}, [])



    useEffect(()=>{
        axios.get('http://localhost:8081/userProduct')
        .then(res =>{
            if(res.data.Status==='Success'){
                setProduct(res.data.Result);
            }
        })
        .catch(err =>console.log(err))
    },[])

    const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}
    return (
        <div>
              {
				product.map(p =><ShoppingProducts key={p.id}
				product = {p}
				></ShoppingProducts>)
			  }


              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Shopping;
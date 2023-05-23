import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingProducts from './ShoppingProducts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



const Shopping = () => {

	const [product, setProduct] = useState([]);

	const navigate = useNavigate();

	axios.defaults.withCredentials = true;
	useEffect(() => {
		axios.get('http://localhost:8081/shopping')
			.then(res => {
				if (res.data.Status === "Success") {
					if (res.data.role === "admin") {
						// navigate('/');
					} else {
						const id = res.data.id;
						// navigate('/employeedetail/'+id)
						navigate('/shopping');
					}
				} else {
					navigate('/start')
				}
			})
	}, [])



	useEffect(() => {
		axios.get('http://localhost:8081/userProduct')
			.then(res => {
				if (res.data.Status === 'Success') {
					setProduct(res.data.Result);
				}
			})
			.catch(err => console.log(err))
	}, [])

	const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
			.then(res => {
				navigate('/start')
			}).catch(err => console.log(err));
	}
	return (
		<div>

			<Header></Header>
			<button  className='btn btn-danger d-flex' onClick={handleLogout}>Logout</button>
			<div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)'}}>
				
				{
					product.map(p => <ShoppingProducts key={p.id}
						product={p}
					></ShoppingProducts>)
				}



			</div>

			<Footer></Footer>

			
		</div>



	);
};

export default Shopping;
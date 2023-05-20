import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [data, setData] = useState({
		name: '',
		price: '',
		size: '',
		image: ''
	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:8081/getP/'+id)
		.then(res => {
			setData({...data, name: res.data.Result[0].name,
				price: res.data.Result[0].price,
				size: res.data.Result[0].size
				
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8081/updateProduct/'+id, data)
		.then(res => {
			if(res.data.Status === "Success") {
				navigate('/productlist')
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Product</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Product Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Product Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Price</label>
					<input type="text" class="form-control" id="inputEmail4" placeholder='Price' autoComplete='off'
					onChange={e => setData({...data, price: e.target.value})} value={data.price}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Size</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setData({...data, size: e.target.value})} value={data.size}/>
				</div>
				{/* <div class="col-12">
					<label for="inputAddress" class="form-label">Image</label>
					<input type="file" class="form-control" id="inputAddress"  autoComplete='off'
					onChange={e => setData({...data, image: e.target.files[0]})} />
				</div> */}
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
};

export default EditProduct;
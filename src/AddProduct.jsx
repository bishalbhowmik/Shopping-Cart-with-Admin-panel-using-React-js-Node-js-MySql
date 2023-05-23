import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [data, setData] = useState({
		name: '',
		price: '',
		size: '',
		image: ''
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("price", data.price);
		formdata.append("size", data.size);
		formdata.append("image", data.image);
		axios.post('http://localhost:8081/addproduct', formdata)
		.then(res => {
			navigate('/productlist')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Product</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Product Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='on'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Price</label>
					<input type="text" class="form-control" id="inputEmail4" placeholder='Price' autoComplete='on'
					onChange={e => setData({...data, price: e.target.value})}/>
				</div>
				
				<div class="col-12">
					<label for="inputSalary" class="form-label">Size</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Size" autoComplete='on'
					onChange={e => setData({...data, size: e.target.value})}/>
				</div>
				<div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Select Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
};

export default AddProduct;
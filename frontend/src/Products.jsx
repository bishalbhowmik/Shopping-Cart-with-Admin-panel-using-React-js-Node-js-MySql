import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
      axios.get('http://localhost:8081/getProduct')
      .then(res => {
        if(res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
    }, [])
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:8081/deleteProduct/'+id)
      .then(res => {
        if(res.data.Status === "Success") {
          window.location.reload(true);
          console.log('delete');
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
    }
  
    return (
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center mt-2'>
          <h3>product List</h3>
        </div>
        <Link to="/addproduct" className='btn btn-success'>Add Product</Link>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Size</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => {
                return <tr key={index}>
                    <td>{product.name}</td>
                    <td>{
                      <img src={`http://localhost:8081/images/`+product.image} alt="" className='employee_image'/>
                      }</td>
                    <td>{product.price}</td>
                    <td>{product.size}</td>
                    <td>
                      <Link to={`/productEdit/`+product.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                      <button onClick={e => handleDelete(product.id)} className='btn btn-sm btn-danger'>delete</button>
                    </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
};

export default Products;
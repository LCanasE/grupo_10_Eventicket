import React, { useEffect, useState } from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowMovies from './ContentRowMovies';
import Chart from './Chart';

function ContentRowTop() {

	const endpointProducts = 'http://localhost:3001/api/products';
	const endpointUsers = 'http://localhost:3001/api/users'
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {

		const fetchApiProducts = async (endpoint) => {
			const response = await fetch(endpoint);
			const data = await response.json();
			setProducts(data.products);
			setCategories(data.categories);
			// console.log(data.products);
		}
		fetchApiProducts(endpointProducts);


		const fetchApiUsers = async (endpoint) => {
			const response = await fetch(endpoint);
			const data = await response.json();
			setUsers(data.users)
		}
		fetchApiUsers(endpointUsers);

	}, []);

	let lastProduct = products.length > 0 ? products[products.length - 1] : null;
	let lastProductInDb = {}
	if (lastProduct) {
		lastProductInDb = {
			title: lastProduct.name,
			description: lastProduct.description,
			image: lastProduct.image
		}
	}


	return (
		<React.Fragment>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
				</div>

				{/*<!-- Content Row Movies-->*/}
				<ContentRowMovies products={products} categories={categories} users={users} />
				<ContentRowCenter product={lastProductInDb} categories={categories} />
				<Chart products={products}/>

			</div>
			{/*<!--End Content Row Top-->*/}

		</React.Fragment>
	)

}
export default ContentRowTop;
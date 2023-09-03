import React, { useEffect, useState } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

// let productsInDb = {
//     title: 'Products in Data Base',
//     color: 'primary', 
//     cuantity: products.length,
//     icon: 'fa-clipboard-list'
// }

/* <!-- Total awards --> */

let totalAwards = {
    title: ' Total awards',
    color: 'success',
    cuantity: '79',
    icon: 'fa-award'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title: 'Actors quantity',
    color: 'warning',
    cuantity: '49',
    icon: 'fa-user-check'
}

// let cartProps = [moviesInDB, totalAwards, actorsQuantity];

export default function ContentRowMovies() {
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

    let productsInDb = {
        title: 'Products in Data Base',
        color: 'primary',
        cuantity: products.length,
        icon: 'fa-clipboard-list'
    }

    let categoriesInDb = {
        title: 'Total categories',
        color: 'success',
        cuantity: categories.length,
        icon: 'fa-award'
    }

    let usersInDb = {
        title: 'Total users',
        color: 'warning',
        cuantity: users.length,
        icon: 'fa-user-check'
    }

    let cardProps = [productsInDb, categoriesInDb, usersInDb];

    return (

        <div className="row">

            {
                products.length > 0 ? (
                    cardProps.map((product, i) => (
                        <SmallCard {...product} key={i} />
                    ))) : <p>No hay productos</p>
            }


            {/* {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })} */}

        </div>
    )
}
import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';

function LastMovieInDb({ product }){
    let newImagePath = ''
    if(product.length > 0){
        console.log(product.image.split('..')[1])
        newImagePath = `../../../..${product.image.split('..')[1]}`
        console.log(newImagePath);
    }
    return(
        <div className="col-lg-6 mb-4">
            
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last product in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={newImagePath} alt={product.title}/>
                        <h1>{product.title}</h1>
                    </div>
                    <p>{product.description}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View product detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastMovieInDb;

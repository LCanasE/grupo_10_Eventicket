import React from 'react';
import ChartRow from './ChartRow';

let tableRowsData = [
    {
        Title: 'Billy Elliot ',
        Length: '123',
        Rating: '5',
        Categories: ['Drama', 'Comedia'],
        Awards: 2
    },
    {
        Title: 'Alicia en el país de las maravillas',
        Length: '142',
        Rating: '4.8',
        Categories: ['Drama', 'Acción', 'Comedia'],
        Awards: 3
    },

]


function Chart({ products }) {

    let allProducts = []

    products.map((product, i) => (
        allProducts.push(([`${product.name}, ${product.location}, ${product.addres}, ${product.category}, ${product.date}`]))
    ))

    if(allProducts){
        console.log(allProducts);
    }

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Ubicacion</th>
                                <th>Direccion</th>
                                <th>Fecha</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        {/* <tfoot>
                            <tr>
                                <th>Título</th>
                                <th>Duración</th>
                                <th>Rating</th>
                                <th>Género</th>
                                <th>Premios</th>
                            </tr>
                        </tfoot> */}
                        <tbody>
                            {
                                allProducts.length > 0 ?
                                products.map((product, i) => (
                                    <ChartRow 
                                        name={product.name}
                                        location={product.location}
                                        addres={product.addres}
                                        date={product.date}
                                        category={product.category}
                                        />
                                )) : <tr>No hay nada</tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;
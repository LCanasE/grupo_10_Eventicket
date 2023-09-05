import React from 'react';


function ChartRow({ name, location, addres, date, category }){
    return (
                <tr>
                    <td>{name}</td>
                    <td>{location}</td>
                    <td>{addres}</td>
                    <td>
                        {
                            date ? `${date.split('T')[0]} ${date.split('T')[1].split('.')[0]}` : <p>No hay fecha</p>
                        }
                    </td>
                    <td>{category}</td>
                </tr>
            )
    }
    
        

export default ChartRow;
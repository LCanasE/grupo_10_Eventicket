import React from 'react';


function ChartRow({ name, location, addres, date, category }){
    return (
                <tr>
                    <td>{name}</td>
                    <td>{location}</td>
                    <td>{addres}</td>
                    <td>
                        <ul>
                            {/* {props.Categories.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )} */}
                        </ul>
                    </td>
                    <td>{category}</td>
                </tr>
            )
    }
    
        

export default ChartRow;
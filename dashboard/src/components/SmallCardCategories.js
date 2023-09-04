import React from 'react';

export default function SmallCardCategories(props) {

    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">{props.name}</div>
                <p className="card-body">{props.products}</p>
            </div>
        </div>
    )
}
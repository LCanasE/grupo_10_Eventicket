import React from "react";
import SmallCardCategories from "./SmallCardCategories";

function GenresInDb({ categories }) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categories in Data Base
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {
              categories.length > 0 ?
              categories.map((category, i) => (
                <SmallCardCategories name={category.name} products={category.products} key={category + i}/>
              )) : <p>No hay categorias</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;

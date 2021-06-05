import React from "react";

const Item = ({ product }) => {
    return (
        <div className="item">
            <img src={product.imageUrl} alt="Hình ảnh" />
            <p>{product.name}</p>
            <p>{`${product.price}$`}</p>
        </div>
    );
};
export default Item;

import React, { Fragment, useEffect, useState } from "react";
import "./index.css";
import Search from "./Search";
import Item from "./Item";
import Pagination from "./Pagination";
const axios = require("axios");

const Content = () => {
    const [listProducts, setListProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    // const [search, setSearch] = useState("");
    const [listFilter, setListFilter] = useState([]);
    const limit = 8;

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await axios.get(
                    "https://run.mocky.io/v3/7af6f34b-b206-4bed-b447-559fda148ca5"
                );
                setListProduct(res.data);
                setListFilter(res.data);
                setTotal(res.data.length);
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, []);

    useEffect(() => {
        setProducts(listFilter.slice((page - 1) * limit, page * limit));
    }, [listFilter, page]);

    function searchHasAll(name, listText) {
        for (const t of listText) {
            if (!name.split(" ").includes(t.toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    function search(name, listText) {
        for (const t of listText) {
            if (name.split(" ").includes(t.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    function searchProduct(text) {
        let listF = listProducts;

        if (text) {
            const listText = text.split(" ");
            listF = listF.filter((product) => {
                return searchHasAll(product.name.toLowerCase(), listText);
            });
            listF = listF.concat(
                listProducts.filter((product) => {
                    return (
                        search(product.name.toLowerCase(), listText) &&
                        !listF.includes(product)
                    );
                })
            );
        }

        setPage(1);
        setListFilter(listF);
        setTotal(listF.length);
    }

    function filterProduct(priceFrom, priceTo) {
        console.log(priceFrom, priceTo);
        let listF = listFilter;
        if (priceFrom) {
            listF = listF.filter((product) => product.price >= priceFrom);
        }
        if (priceTo) {
            listF = listF.filter((product) => product.price <= priceTo);
        }
        setPage(1);
        setListFilter(listF);
        setTotal(listF.length);
    }

    return (
        <div className="content">
            <Search
                searchProduct={searchProduct}
                filterProduct={filterProduct}
            />
            <Products products={products} />
            {products.length ? (
                <Pagination
                    page={page}
                    total={total}
                    setPage={setPage}
                    limit={limit}
                />
            ) : (
                <Fragment />
            )}
            <div className="footer"></div>
        </div>
    );
};
export default Content;
const Products = ({ products }) => {
    // console.log(products.length);
    if (products.length) {
        return (
            <div className="products">
                {products.map((product) => {
                    return <Item product={product} key={product.id} />;
                })}
            </div>
        );
    } else {
        return <div>Không có sản phẩm nào!</div>;
    }
};

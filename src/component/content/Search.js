import React, { useState, Fragment } from "react";

const Search = ({ searchProduct, filterProduct }) => {
    const [text, setText] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [validete, setValidete] = useState(false);
    function onSubmitSearch(e) {
        e.preventDefault();
        // console.log("texxt", text);
        // setSearch(text);
        setPriceFrom("");
        setPriceTo("");
        searchProduct(text);
    }
    function onSubmitFilter(e) {
        e.preventDefault();
        if (priceFrom > priceTo) setValidete(true);
        else {
            setValidete(false);
            filterProduct(priceFrom, priceTo);
        }
    }
    return (
        <div className="search">
            <form className="form-search" onSubmit={(e) => onSubmitSearch(e)}>
                <input
                    type="search"
                    value={text}
                    placeholder="Search Product"
                    onChange={(e) => setText(e.target.value)}
                />
            </form>
            <form className="form-filter" onSubmit={(e) => onSubmitFilter(e)}>
                <input
                    onChange={(e) => setPriceFrom(e.target.value)}
                    value={priceFrom}
                    type="number"
                    placeholder="Giá từ"
                />
                -
                <input
                    onChange={(e) => setPriceTo(e.target.value)}
                    value={priceTo}
                    type="number"
                    placeholder="Đến"
                />
                <button type="submit">Lọc</button>
                {validete ? (
                    <p>Số cuối phải lớn hơn hoặc bằng số bắt đầu!</p>
                ) : (
                    <Fragment />
                )}
            </form>
        </div>
    );
};
export default Search;

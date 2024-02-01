import React, { useEffect, useState } from 'react'
import Title from '../components/Title';
import ProductSlider from '../components/ProductSlider';
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import Loading from '../images/loading.svg';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import './Products.css';
import { NumericFormat } from "react-number-format";
import { FaFilter } from "react-icons/fa";
import { db } from '../components/firebase';
import VehicleCard from '../components/VehicleCard';


function Products() {

    const [vehicles, setVehicles] = useState([])

    const [ratingSelect, setRatingSelect] = useState();
    const [price, setPrice] = useState(10000);

    const [isShowingFilters, setIsShowingFilters] = useState(false);

    const openFilterSlider = () => {
        if (isShowingFilters === false) {
            setIsShowingFilters(true)
        }
        else {
            setIsShowingFilters(false)
        }
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    }

    useEffect(() => {
        var x, i, j, m, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        m = x.length;
        for (i = 0; i < m; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/

            if (!x[i].querySelector('.select-selected') && !x[i].querySelector('.select-items')) {

                a = document.createElement("DIV");
                a.setAttribute("class", "select-selected");
                a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                x[i].appendChild(a);
                /*for each element, create a new DIV that will contain the option list:*/
                b = document.createElement("DIV");
                b.setAttribute("class", "select-items select-hide");
                for (j = 1; j < ll; j++) {
                    /*for each option in the original select element,
                    create a new DIV that will act as an option item:*/
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    c.addEventListener("click", function (e) {
                        /*when an item is clicked, update the original select box,
                        and the selected item:*/
                        var y, k, l, s, h, sl, yl;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        sl = s.length;
                        h = this.parentNode.previousSibling;
                        for (k = 0; k < sl; k++) {
                            if (s.options[k].innerHTML === this.innerHTML) {
                                s.selectedIndex = k;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.getElementsByClassName("same-as-selected");
                                yl = y.length;
                                for (l = 0; l < yl; l++) {
                                    y[l].removeAttribute("class");
                                }
                                this.setAttribute("class", "same-as-selected");
                                break;
                            }
                        }
                        h.click();
                    });
                    b.appendChild(c);
                }
                x[i].appendChild(b);
                a.addEventListener("click", function (e) {
                    /*when the select box is clicked, close any other select boxes,
                    and open/close the current select box:*/
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                });
            }
        }
        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt === y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);



        /* get vehicles */
        db.collection('vehicles').get().then(data => {
            setVehicles(data.docs);
        });
    }, [])

    return (
        <div>
            <Title title="PRODUCTS" />
            <ProductSlider showProducts={false} />
            <section className='products__section'>
                <h3 className='products__section-title'>All Vehicles</h3>
                <div className="products-container container">
                    <FaFilter className='filter-icon' onClick={openFilterSlider} />
                    <div className={isShowingFilters == true ? "filters show-filters" : "filters"}>
                        <div className="filter filter__price">
                            <h6>Filter By Price</h6>
                            <input type="range" name="price-filter" id="price-filter" min={10000} max={1000000} step={100} onChange={handleChangePrice} />
                            <span>Min Price: <NumericFormat value={price} thousandSeparator="," displayType='text' /></span>
                        </div>
                        <div className="filter filter__ratings">
                            <h6>Ratings</h6>
                            <div className="ratings-box" >
                                <div className="ratings rating-1" style={{ opacity: ratingSelect == 1 ? '1' : '.7' }} onClick={() => setRatingSelect(1)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-2" style={{ opacity: ratingSelect == 2 ? '1' : '.7' }} onClick={() => setRatingSelect(2)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-3" style={{ opacity: ratingSelect == 3 ? '1' : '.7' }} onClick={() => setRatingSelect(3)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-4" style={{ opacity: ratingSelect == 4 ? '1' : '.7' }} onClick={() => setRatingSelect(4)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-5" style={{ opacity: ratingSelect == 5 ? '1' : '.7' }} onClick={() => setRatingSelect(5)}>
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                        </div>
                        <div className="filter filter__brands">
                            <h6>Brands</h6>

                            <label htmlFor="hyundai" className='brand'>Hyundai
                                <input type="checkbox" name="hyundai" id="hyundai" value="hyundai" />
                                <span></span>
                            </label>
                            <label htmlFor="honda" className='brand'>Honda
                                <input type="checkbox" name="honda" id="honda" value="honda" />
                                <span></span>
                            </label>
                            <label htmlFor="bmw" className='brand'>BMW
                                <input type="checkbox" name="bmw" id="bmw" value="bmw" />
                                <span></span>
                            </label>
                            <label htmlFor="nissan" className='brand'>Nissan
                                <input type="checkbox" name="nissan" id="nissan" value="nissan" />
                                <span></span>
                            </label>
                            <label htmlFor="ford" className='brand'>Ford
                                <input type="checkbox" name="ford" id="ford" value="ford" />
                                <span></span>
                            </label>
                        </div>
                    </div>
                    <div className="products">
                        <div className="products__search ">
                            <div className="custom-select" id='custom-select'>
                                <select name="cars-types" id="cars-types">
                                    <option value="" selected>All</option>
                                    <option value="all">All</option>
                                    <option value="cars">Cars</option>
                                    <option value="motos">Motorcycles</option>
                                    <option value="tunneds">Tunneds</option>
                                </select>
                            </div>
                            <form className='search-form'>
                                <label htmlFor="search-input" className='search-input__box'>
                                    <input type="text" className='search-input' name='search-input' id='search-input' />
                                    <button className='search__button' type='submit'>
                                        <FaSearch className='search-icon' />
                                    </button>
                                    <span className='search__results'>Showing 1-12 of 32 Results</span>
                                </label>
                            </form>
                        </div>
                        <div className="products__list">
                            {vehicles.length > 0 ? vehicles.map((element) => (
                                <VehicleCard id={element.id} key={element.id} model={element.data().model} make={element.data().make} image={element.data().image} price={element.data().price} rating={element.data().rating} />
                            )) : (
                                <img src={Loading} alt='Loading' className='loading' />
                            )
                            }
                        </div>
                        <div className="products__pages">
                            {vehicles.length > 0 && (
                                <div className="pages">
                                    < Link to="/products">1</Link>
                                    <Link to="/products">2</Link>
                                    <Link to="/products">3</Link>
                                    <Link to="/products">4</Link>
                                    <Link to="/products">NEXT <span className='page-next'><MdNavigateNext /></span></Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Products

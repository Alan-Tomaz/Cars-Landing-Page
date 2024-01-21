import React from 'react'
import Title from '../components/Title';
import ProductSlider from '../components/ProductSlider';
import { IoStarOutline } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Bmw from '../images/cars/bmw_m2.png';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import './Products.css';

function Products() {
    return (
        <div>
            <Title title="PRODUCTS" />
            <ProductSlider showProducts={false} />
            <section className='products__section'>
                <h3 className='products__section-title'>All Vehicles</h3>
                <div className="products-container container">
                    <div className="filters">
                        <div className="filter filter__price">
                            <h6>Filter By Price</h6>
                            <input type="range" name="price-filter" id="price-filter" min="10.000,00" max="1.000.000,00" step="100,00" />
                            <span>Price: US$10.000,00 - US$1.000.000,00</span>
                        </div>
                        <div className="filter filter__ratings">
                            <h6>Ratings</h6>
                            <div className="ratings">
                                <IoStarOutline />
                                <IoStarOutline />
                                <IoStarOutline />
                                <IoStarOutline />
                                <IoStarOutline />
                                <span>(1)</span>
                            </div>
                            <div className="ratings">
                                <IoStarOutline />
                                <IoStarOutline />
                                <IoStarOutline />
                                <IoStarOutline />
                                <span>(1)</span>
                            </div>
                            <div className="ratings">
                                <IoStarOutline />
                                <IoStarOutline />
                                <IoStarOutline />
                                <span>(1)</span>
                            </div>
                            <div className="ratings">
                                <IoStarOutline />
                                <IoStarOutline />
                                <span>(1)</span>
                            </div>
                            <div className="ratings">
                                <IoStarOutline />
                                <span>(1)</span>
                            </div>
                        </div>
                        <div className="filter filter__brands">
                            <h6>Brands</h6>
                            <input type="checkbox" name="hyundai" id="hyundai" value="hyundai" />
                            <label htmlFor="hyundai">Hyundai</label>
                            <input type="checkbox" name="honda" id="honda" value="honda" />
                            <label htmlFor="honda">Honda</label>
                            <input type="checkbox" name="bmw" id="bmw" value="bmw" />
                            <label htmlFor="bmw">BMW</label>
                            <input type="checkbox" name="nissan" id="nissan" value="nissan" />
                            <label htmlFor="nissan">Nissan</label>
                            <input type="checkbox" name="ford" id="ford" value="ford" />
                            <label htmlFor="ford">Ford</label>
                        </div>
                    </div>
                    <div className="products">
                        <div className="products__search">
                            <select name="cars-types" id="cars-types">
                                <option value="">All</option>
                                <option value="cars">Cars</option>
                                <option value="motos">Motorcycles</option>
                                <option value="tunneds">Tunneds</option>
                            </select>
                            <input type="text" />
                            <FaSearch />
                            <span>Showing 1-12 of 32 Results</span>
                        </div>
                        <div className="products__list">
                            <div className="product__item">
                                <img src={Bmw} alt="Bmw M2" />
                                <h6 className="product__brand">BMW</h6>
                                <h5 className='product__name'>BMW M2</h5>
                                <div className="product__ratings">
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStarHalf />
                                    <IoStarOutline />
                                </div>
                                <span className='product__price'>US$ 250.000,00</span>
                                <Link to="/product/:14" className='button--blue product__button'>See More...</Link>
                            </div>
                        </div>
                        <div className="products__pages">
                            <Link to="/products">1</Link>
                            <Link to="/products">2</Link>
                            <Link to="/products">3</Link>
                            <Link to="/products">4</Link>
                            <Link to="/products">NEXT <span><MdNavigateNext /></span></Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products

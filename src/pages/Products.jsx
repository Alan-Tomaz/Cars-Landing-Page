import React, { useEffect, useRef, useState } from 'react'
import Title from '../components/Title';
import ProductSlider from '../components/ProductSlider';
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import Loading from '../images/loading.svg';
import { FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from 'react-router-dom';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import './Products.css';
import { NumericFormat } from "react-number-format";
import { FaFilter } from "react-icons/fa";
import { db } from '../components/firebase';
import VehicleCard from '../components/VehicleCard';
import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore';


function Products() {

    const timeoutsRef = useRef([]);
    const timeouts = timeoutsRef.current;
    const timeoutDelay = 1000;

    const [searchParams, setSearchParams] = useSearchParams();
    const [globalParams, setGlobalParams] = useState('');

    const itemsPerPage = 12;
    const collectionRef = collection(db, 'vehicles');
    const relevantData = doc(db, 'relevant_data', 'unique_values');

    const [search, setSearch] = useState(searchParams.get('search') == undefined ? '' : searchParams.get('search') == null ? '' : searchParams.get('search'));
    const [carType, setCarType] = useState(searchParams.get('carsType') == undefined ? 'all' : searchParams.get('carsType') == null ? 'all' : searchParams.get('carsType'));
    const [filterMakers, setFilterMakers] = useState(searchParams.getAll('brands') == undefined ? [] : searchParams.getAll('brands') == null ? [] : searchParams.getAll('brands'));
    const [uniqueMakers, setUniqueMakers] = useState([]);
    const [pagesElem, setPagesElem] = useState([]);
    const [page, setPage] = useState(1);
    const [vehiclesCount, setVehiclesCount] = useState('-');
    const [actualCount, setActualCount] = useState(1 + (page <= 1 ? 0 : (page - 1) * itemsPerPage));
    const [vehicles, setVehicles] = useState([])
    const [results, setResults] = useState(<img src={Loading} alt='Loading' className='loading' />);

    const [ratingSelect, setRatingSelect] = useState(searchParams.get('ratingsSelect') == undefined ? 'all' : searchParams.get('ratingsSelect') == null ? 'all' : searchParams.get('ratingsSelect'));
    const [price, setPrice] = useState(searchParams.get('minPrice') == undefined ? 5000 : searchParams.get('minPrice') == null ? 5000 : searchParams.get('minPrice'));

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
        timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        })

        setPrice(e.target.value);
        timeouts.push(setTimeout(() => {
            setGlobalParams(`carsType=${carType}&minPrice=${e.target.value}&ratingsSelect=${ratingSelect}&brands=${filterMakers}&search=${search}`);
            setSearchParams({ minPrice: e.target.value, carsType: carType, ratingsSelect: ratingSelect, brands: filterMakers });
            setPage(1)
        }, timeoutDelay));
    }

    const getVehicles = async () => {
        window.scrollTo(0, 1500);

        setResults(<img src={Loading} alt='Loading' className='loading' />);
        setVehicles([]);

        let q = query(collectionRef);

        /*     q = query(q, where('model', '==', `%${search}%`))
 */
        if (filterMakers.length > 0) {
            q = query(q, where('make', 'in', filterMakers));
        }

        /*         q = query(q, where('price', '>=', price));
         */
        /*  if (ratingSelect != 'all') {
             q = query(q, where('rating', '>=', ratingSelect));
         } */
        if (carType != 'all') {
            q = query(q, where('type', '==', carType));
        }

        /*         q = query(q, orderBy('price'))*/
        q = query(q, orderBy('product_id'))
        q = query(q, startAt(1 + (itemsPerPage * (page <= 1 ? 0 : page - 1))))
        q = query(q, limit(itemsPerPage))
        /* const q = query(collectionRef,  orderBy('product_id'), startAt(1 + (itemsPerPage * (page <= 1 ? 0 : page - 1))), limit(itemsPerPage)) */

        await getDocs(q).then((querySnapshot) => {
            if (querySnapshot.docs.length == 0) {
                setResults(<p className='p-alert'>No vehicles found</p>)
            }
            else {
                const newVehicles = querySnapshot.docs.filter((vehicle) => vehicle.data().price >= price)
                if (newVehicles.length == 0) {
                    setResults(<p className='p-alert'>No vehicles found</p>)
                }
                else {
                    setVehicles(newVehicles);
                }
            }
        })
    }

    const countRegisters = async () => {
        const countSnapshot = await getCountFromServer(collectionRef);

        const totalCount = countSnapshot.data().count;
        setVehiclesCount(totalCount);
        const pages = [];
        const pagesNum = Math.ceil(Number(totalCount) / itemsPerPage);

        if (page > 1) {
            pages.push(<Link to={`/products?${globalParams}`} key="prev" onClick={() => handlePage(page - 1)}><MdNavigateBefore />{`PREV`}</Link>);
        }

        for (let i = Math.max(1, page - 3); i <= Math.min(pagesNum, page + 3); i++) {
            pages.push(<Link to={`/products?${globalParams}`} key={i} className={page === i ? `page-active` : ``} onClick={() => handlePage(i)}>{i}</Link>);
        }

        if (page < pagesNum) {
            pages.push(<Link to={`/products?${globalParams}`} key="next" onClick={() => handlePage(page + 1)}>{`NEXT `}<MdNavigateNext /></Link>);
        }

        setPagesElem(pages);
    }

    const handlePage = (newPage) => {
        setPage(newPage);
        if (newPage > page) {
            setActualCount(1 + (itemsPerPage * (newPage - 1)));
        }
        if (newPage < page) {
            setActualCount(actualCount - ((page - newPage) * itemsPerPage));
        }
    }

    const getMakers = async () => {
        await getDoc(relevantData).then((querySnapshot) => {
            setUniqueMakers(querySnapshot.data().maker)
        })
    }

    const handleChangeTypeCar = (typeCar) => {
        timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        })

        setCarType(typeCar.toLowerCase());
        timeouts.push(setTimeout(() => {
            setGlobalParams(`carsType=${typeCar.toLowerCase}&minPrice=${price}&ratingsSelect=${ratingSelect}&brands=${filterMakers}&search=${search}`);
            setSearchParams({ carsType: typeCar.toLowerCase(), minPrice: price, ratingsSelect: ratingSelect, brands: filterMakers });
            setPage(1)
        }, timeoutDelay));
    }

    const handleChangeRatings = (rating) => {
        timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        })

        if (rating == ratingSelect) {
            setRatingSelect('all')
            timeouts.push(setTimeout(() => {
                setGlobalParams(`carsType=${carType}&minPrice=${price}&ratingsSelect=all}&brands=${filterMakers}&search=${search}`);
                setSearchParams({ ratingsSelect: 'all', minPrice: price, carsType: carType, brands: filterMakers })
                setPage(1)
            }, 2000));
        }
        else {
            setRatingSelect(rating);
            timeouts.push(setTimeout(() => {
                setGlobalParams(`carsType=${carType}&minPrice=${price}&ratingsSelect=${rating}&brands=${filterMakers}&search=${search}`);
                setSearchParams({ ratingsSelect: rating, minPrice: price, carsType: carType, brands: filterMakers })
            }, timeoutDelay));
        }
    }

    const handleChangeBrands = () => {
        timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        })

        const brands = [];
        document.querySelectorAll('.brand-input:checked').forEach((elem) => {
            brands.push(elem.value);
        })
        setFilterMakers(brands);

        timeouts.push(setTimeout(() => {
            setGlobalParams(`carsType=${carType}&minPrice=${price}&ratingsSelect=${ratingSelect}&brands=${brands}`);
            setSearchParams({ brands: brands, minPrice: price, carsType: carType, ratingsSelect: ratingSelect })
            setPage(1)
        }, timeoutDelay));

    }

    const searchVehicle = (e) => {
        timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        })

        e.preventDefault();

        setSearch(document.getElementById('search-input').value);
        timeouts.push(setTimeout(() => {
            setGlobalParams(`carsType=${carType}&minPrice=${e.target.value}&ratingsSelect=${ratingSelect}&brands=${filterMakers}&search=${search}`);
            setSearchParams({ search: document.getElementById('search-input').value, minPrice: price, ratingSelect: ratingSelect, brands: filterMakers });
            setPage(1)
        }, timeoutDelay));
    }

    useEffect(() => {
        /* ============ SELECT INPUT ================ */
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
                                handleChangeTypeCar(this.innerHTML);
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

        /*  ================ DATABASE ================ */
        /* get vehicles */
        getVehicles();
        /* get vehicles count */
        countRegisters();
        /* get cars manufactures */
        getMakers();

        document.getElementById('search-input').value = search;
    }, [page, searchParams])

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
                            <input type="range" name="price-filter" id="price-filter" min={5000} max={250000} step={100} value={price} onChange={handleChangePrice} />
                            <span>Min Price: <NumericFormat value={price} thousandSeparator="," displayType='text' /></span>
                        </div>
                        <div className="filter filter__ratings">
                            <h6>Ratings</h6>
                            <div className="ratings-box" >
                                <div className="ratings rating-1" style={{ opacity: ratingSelect == 1 ? '1' : '.7' }} onClick={() => handleChangeRatings(1)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-2" style={{ opacity: ratingSelect == 2 ? '1' : '.7' }} onClick={() => handleChangeRatings(2)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-3" style={{ opacity: ratingSelect == 3 ? '1' : '.7' }} onClick={() => handleChangeRatings(3)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-4" style={{ opacity: ratingSelect == 4 ? '1' : '.7' }} onClick={() => handleChangeRatings(4)}>
                                    <IoStar className='rating' />
                                    <IoStar className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                    <IoStarOutline className='rating' />
                                </div>
                                <span>(1)</span>
                            </div>
                            <div className="ratings-box" >
                                <div className="ratings rating-5" style={{ opacity: ratingSelect == 5 ? '1' : '.7' }} onClick={() => handleChangeRatings(5)}>
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
                            {uniqueMakers.length > 0 && uniqueMakers.map((maker) => (
                                <label htmlFor={maker} className='brand'>{`${maker.slice(0, 1).toUpperCase()}${maker.slice(1)}`}
                                    <input type="checkbox" name={maker} id={maker} value={maker} className='brand-input' onChange={handleChangeBrands} checked={filterMakers.includes(maker) ? true : false} />
                                    <span></span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="products">
                        <div className="products__search ">
                            <div className="custom-select" id='custom-select'>
                                <select name="cars-types" id="cars-types" >
                                    <option value="" >All</option>
                                    <option value="all" selected={carType == 'all' ? true : false}>All</option>
                                    <option value="car" selected={carType == 'car' ? true : false}>Car</option>
                                    <option value="motorcycle" selected={carType == 'motorcycle' ? true : false}>Motorcycle</option>
                                    <option value="tunning" selected={carType == 'tunning' ? true : false}>Tunning</option>
                                </select>
                            </div>
                            <form className='search-form' onSubmit={searchVehicle}>
                                <label htmlFor="search-input" className='search-input__box'>
                                    <input type="text" className='search-input' name='search-input' id='search-input' placeholder='Search By Model' />
                                    <button className='search__button' type='submit'>
                                        <FaSearch className='search-icon' />
                                    </button>
                                    <span className='search__results'>Showing {actualCount}-{page * itemsPerPage >= vehiclesCount ? vehiclesCount : page * itemsPerPage} of {vehiclesCount} Results</span>
                                </label>
                            </form>
                        </div>
                        <div className="products__list">
                            {vehicles.length > 0 ? vehicles.map((element) => (
                                <VehicleCard id={element.id} key={element.id} model={element.data().model} make={element.data().make} image={element.data().image_small} price={element.data().price} rating={element.data().rating} />
                            )) :
                                results

                            }
                        </div>
                        <div className="products__pages">
                            {vehicles.length > 0 && (
                                <div className="pages">
                                    {pagesElem.map((elem) => (
                                        elem
                                    ))}
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

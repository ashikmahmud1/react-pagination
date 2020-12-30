import React, {useState, useEffect} from "react"
import './App.css';
import CountryCard from "./components/CountryCard";
import * as Countries from "countries-api";
import Pagination from "./components/Pagination";

function App() {
    const [allCountries, setAllCountries] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCountries, setCurrentCountries] = useState([]);
    const pageLimit = 10;

    const onPageChanged = data => {
        const {currentPage, totalPages, pageLimit} = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);

        setTotalPages(totalPages);
        setCurrentPage(currentPage);
        setCurrentCountries(currentCountries);
    }
    const getAllCountries = () => {
        const {data: allCountries = []} = Countries.findAll();
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);
        const totalPages = Math.ceil(allCountries.length / pageLimit);
        setCurrentCountries(currentCountries);
        setAllCountries(allCountries);
        setTotalPages(totalPages);
    }
    useEffect(() => {
        console.log('effect');
        getAllCountries();
        return () => {
            console.log('cleaned up');
        };
    }, [allCountries]);
    return (
        <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <h2 className="border-gray border-right">
                            <strong className="text-secondary">{allCountries.length}</strong> Countries
                        </h2>
                        {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> / <span
                                className="font-weight-bold">{totalPages}</span>
                </span>
                        )}
                    </div>
                    <div className="d-flex flex-row py-4 align-items-center">
                        {
                            allCountries.length > 0 && (
                                <Pagination totalRecords={allCountries.length} pageLimit={pageLimit} pageNeighbours={1}
                                            onPageChanged={onPageChanged}/>
                            )
                        }
                    </div>
                </div>
                {currentCountries.map(country => <CountryCard key={country.cca3} country={country}/>)}
            </div>
        </div>
    );
}

export default App;

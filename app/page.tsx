"use client";

import Image from "next/image"
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore, Footer, Navbar } from '@/components'
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';
import { useState, useEffect } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("2022");

  const [limit, setLimt] = useState(10);

  const [countcart, setCountcart] = useState(0);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: Number(year) && year || "2022",
        fuel: fuel !== "Fuel" && fuel || '',
        limit: limit || 10,
        model: model || '',

      })

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])


  return (
    <>
      <Navbar countcart={countcart} setCountcart={setCountcart} />
      <main className="overflow-hidden">
        <Hero />

        <div className='mt-12 padding-x padding-y max-width min-h-[700px]' id='discover'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>
              Car CataLogue
            </h1>
            <p>Explore the cars you might like</p>
          </div>

          <div className='home__filters'>
            <SearchBar setManufacturer={setManufacturer}
              setModel={setModel} />

            <div className='home__filter-container'>
              <CustomFilter title="fuel" option={fuels}
                setFilter={setFuel} />
              <CustomFilter title="year" option={yearsOfProduction}
                setFilter={setYear} />
            </div>
          </div>

          {allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => <CarCard car={car} setCountcart={setCountcart} countcart={countcart}/>)}
              </div>
              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src="/loader.gif"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}
              <ShowMore
                pageNumber={limit / 10}
                isNext={limit > allCars.length}
                setLimit={setLimt} />
            </section>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

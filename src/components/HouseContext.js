import React,{useState, useEffect, createContext} from 'react';

import {housesData} from "../data"


export const HouseContext = createContext()

const HouseContextProvider = ({children}) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState("Location (any)")
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState("Property type (any)")
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState("Price range (any)")
  const [loading, setLoading] = useState(false)


  // retunr all countries
  useEffect(() => {
    const allCountries = houses.map((house)=> {
      return house.country
    })

    // Remove duplicates
    const uniqueCountries = ["Location (any)", ... new Set (allCountries)]

    // set countries state
    setCountries(uniqueCountries)

  }, [])

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house)=> {
      return house.type
    })

    // Remove duplicates
    const uniqueProperties = ["Location (any)", ... new Set (allProperties)]

    // set Properties state
    setProperties(uniqueProperties)

  }, [])

  const handleClick = () => {
    console.log("clicked");
  }
    
  return <HouseContext.Provider value={{
    country,
    setCountry,
    countries,
    property,
    setProperty,
    properties,
    price,
    setPrice,
    houses,
    loading,
    handleClick,

  }}>{children}</HouseContext.Provider>;
};

export default HouseContextProvider;

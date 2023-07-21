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

    // Filter items
    const isDefault = (str)=> {
    return str.split(" ").includes("(any)")
    }
    const minPrice = parseInt(price.split(" ")[0])
    const maxPrice = parseInt(price.split(" ")[2])

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price)

      if(house.country === country && 
        house.type === property && 
        housePrice >= minPrice && 
        housePrice <= maxPrice
        ){
        return house
      }

    })
    console.log(newHouses); 
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

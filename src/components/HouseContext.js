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
    // set loading
    setLoading(true)

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

      // If values default
      if( isDefault(country) && isDefault(property) && isDefault(price)){
        return house
      }


      // if  country is not default
      if(!isDefault(country) && isDefault(property) && isDefault(price)){
        return house.country === country
      }

      // if property is not default
      if(!isDefault(property) && isDefault(country) && isDefault(price)){
        return house.type === property
      }

      // if price is not default 
      if(!isDefault(price) && isDefault(country) && isDefault(property)){
         if(housePrice >= minPrice && housePrice <= maxPrice){
          return house
         }
      }

      // if country  & property is not default
      if(!isDefault(country) && !isDefault(property) && isDefault(price)){
        return house.country == country && house.type === property
      }

      // if country and price is not default

      if(!isDefault(country) && isDefault(property) && !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.country === country
        }
      }

      // property and price is nod default
      if(!isDefault(country) && !isDefault(property)&& !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.type === property
        }
      }
    })

    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
      setLoading(false)
    }, 1000)
    
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
    loading,

  }}>{children}</HouseContext.Provider>;
};

export default HouseContextProvider;

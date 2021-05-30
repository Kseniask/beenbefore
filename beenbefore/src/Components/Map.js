import Country from './Country'
import { useState, useEffect } from 'react'
import xmlCountries from './../countries.xml'
import axios from 'axios'
import xmlParser from 'react-xml-parser'

let countriesObj

const Map = () => {
  const [countries, setCountries] = useState([])
  const [countryClass, setCountryClass] = useState('')

  useEffect(() => {
    axios
      .get(xmlCountries, {
        'Content-Type': 'application/xml; charset=utf-8'
      })
      .then(response => {
        countriesObj = new xmlParser().parseFromString(response.data)
        setCountries(countriesObj.children)
        return () => {
          console.log(`Unmounted`)
        }
      })
  }, [])

  useEffect(() => {
    console.log('rendered')
  }, [countryClass])

  const setCountry = e => {
    let existingClass = e.className.baseVal
    let classStr
    existingClass.includes('selectedCountry')
      ? (classStr = '')
      : (classStr = 'selectedCountry')
    e.className.baseVal = classStr
    setCountryClass(classStr)
    console.log(countryClass)
  }

  return (
    <div className='mapdiv'>
      <svg
        baseProfile='tiny'
        fill='#ececec'
        height='600'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='.2'
        version='1.2'
        viewBox='40 40 1800 900'
        width={window.width}
        xmlns='http://www.w3.org/2000/svg'
      >
        {countries.map(country => {
          let countryName = country.attributes.name || country.attributes.class
          return (
            <Country
              key={country.attributes.d}
              country={country}
              onCountryClick={setCountry}
              className={`${countryName} ${countryClass || ''}`}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default Map

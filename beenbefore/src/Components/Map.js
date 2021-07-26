import Country from './Country'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { getCountriesObject } from '../Helpers/AxiosHelper'
import ReactLoading from 'react-loading'

const Map = ({ mapInputs }) => {
  const [countries, setCountries] = useState([])
  const [countryClass, setCountryClass] = useState('')
  let isComponentMounted = true

  useEffect(() => {
    isComponentMounted = true
    ;(async function setCountriesState () {
      const countriesObj =
        mapInputs === undefined || mapInputs.length === 0
          ? await getCountriesObject()
          : mapInputs
      setCountries(countriesObj)
    })()
    return () => {
      isComponentMounted = false
    }
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
  }

  return (
    <Container className='mapdiv'>
      {countries.length === 0 || countries[0] === undefined ? (
        <div>
          {countries}
          <ReactLoading
            type={'bars'}
            color={'rgba(128, 255, 212, 0.3)'}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <svg
          baseProfile='tiny'
          fill='#ececec'
          height='100%'
          stroke='black'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='.2'
          version='1.2'
          className='map'
          viewBox='110 0 1900 900'
          width='100%'
          xmlns='http://www.w3.org/2000/svg'
        >
          {countries.map(country => {
            let countryName =
              country.attributes.name || country.attributes.class
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
      )}
    </Container>
  )
}

export default Map

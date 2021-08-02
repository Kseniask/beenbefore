import Country from './Country'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { getCountriesObject } from '../Helpers/AxiosHelper'
import ReactLoading from 'react-loading'

const Map = ({ mapInputs }) => {
  const [countries, setCountries] = useState([])
  const [countryClass, setCountryClass] = useState('0 0 1000 700')
  const [viewBox, setViewBox] = useState()
  let isComponentMounted = true

  useEffect(() => {
    ;(async function setCountriesState () {
      const countriesObj =
        mapInputs === undefined || mapInputs.length === 0
          ? await getCountriesObject()
          : mapInputs
      setCountries(countriesObj)
    })()
    const calculatedViewBox =
      mapInputs === undefined || mapInputs.length === 0
        ? '0 0 1000 700'
        : getViewBox(mapInputs)

    setViewBox(calculatedViewBox)
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

  const getViewBox = country => {
    let maxX = 0,
      maxY = 0
    country.forEach(elem => {
      const startPointX = parseInt(elem.attributes.d.split(',')[0].slice(1))
      const startPointY = parseInt(
        elem.attributes.d.split(',')[1].split('L')[0]
      )
      console.log(maxY)
      if (maxX === 0) maxX = startPointX
      if (maxX === 0) maxX = startPointY

      if (startPointX > maxX) {
        maxX = startPointX
      }
      if (startPointY > maxY) {
        maxY = startPointY
      }
    })
    return `0 0 ${maxX + maxX / 5} ${maxY + maxY / 5}`
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
          fill='#ececec'
          stroke='black'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='.2'
          version='1.2'
          className='map'
          viewBox={viewBox}
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='xMidYMid meet'
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

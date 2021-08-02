/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import { getCountriesObject, getSingleCountry } from '../Helpers/AxiosHelper'
import Map from './Map'

const ExploreWidget = () => {
  const [exploreCountries, setExploreCountries] = useState([])
  const [isCountryListLoaded, setIsCountryListLoaded] = useState()
  const [map, setMap] = useState()
  const [selectedCountry, setSelectedCountry] = useState()
  const [hasCountryLoaded, setHasCountryLoaded] = useState(false)
  const [country, setCountry] = useState()

  let isComponentMounted = true
  const getRandomCountries = async () => {
    const countries = await getCountriesObject()
    let randomCountries = []
    for (let i = 0; i < 12; i++) {
      let pickedCountry = ''
      let isCountryUnique = []
      do {
        pickedCountry = countries[Math.floor(Math.random() * countries.length)]
        const pickedCountryName = pickedCountry.attributes.title
        isCountryUnique = randomCountries.map(country => {
          const countryName = country.attributes.title
          return pickedCountryName === countryName
        })
      } while (isCountryUnique.includes(true))
      randomCountries.push(pickedCountry)
    }
    return randomCountries
  }

  useEffect(() => {
    isComponentMounted = true
    async function setValues () {
      const randCountries = await getRandomCountries()
      if (isComponentMounted) setExploreCountries(randCountries)
    }
    setValues()
    return () => {
      isComponentMounted = false
    }
  }, [])

  useEffect(() => {
    isComponentMounted = true
    setHasCountryLoaded(false)
    const setValues = async () => {
      await setClickedCountry(exploreCountries[0])
    }
    if (exploreCountries.length !== 0 && isComponentMounted) {
      setValues()
      setIsCountryListLoaded(true)
    }
    return () => {
      isComponentMounted = false
    }
  }, [exploreCountries])

  useEffect(() => {
    console.log(country)
  }, [country])

  useEffect(() => {
    isComponentMounted = true
    if (isComponentMounted && selectedCountry !== undefined) {
      setMap(<Map mapInputs={selectedCountry} />)
      setHasCountryLoaded(true)
    }

    return () => {
      isComponentMounted = false
    }
  }, [selectedCountry])

  const setClickedCountry = async clickedCountry => {
    const countryName = clickedCountry.attributes
      ? clickedCountry.attributes.title
      : clickedCountry.target.innerText
    const country = await getSingleCountry(countryName)
    setSelectedCountry(country)
  }

  return (
    <Container>
      <p id='explore-text'>
        <span>Let's</span> <br /> EXPLORE
      </p>
      <Container id='countries-table'>
        {!isCountryListLoaded ? (
          <ReactLoading
            type={'bars'}
            color={'rgba(128, 255, 212, 0.3)'}
            height={100}
            width={100}
          />
        ) : (
          <Container>
            <Row>
              {exploreCountries.map(country => {
                let countryName = country.attributes.title
                return (
                  <Col md={4} key={country.attributes.title}>
                    <button
                      className='btn btn-link'
                      onClick={e => setClickedCountry(e)}
                    >
                      {countryName}
                    </button>
                  </Col>
                )
              })}
            </Row>
          </Container>
        )}
      </Container>
      <Container>
        {!hasCountryLoaded ? (
          <ReactLoading
            type={'bars'}
            color={'rgba(128, 255, 212, 0.3)'}
            height={100}
            width={100}
          />
        ) : //   map
        selectedCountry ? (
          map
        ) : (
          'loading'
        )}
      </Container>
    </Container>
  )
}

export default ExploreWidget

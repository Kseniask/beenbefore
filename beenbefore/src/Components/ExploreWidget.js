import { useEffect, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import {
  getCountriesObject,
  getCountry,
  getSingleCountry
} from '../Helpers/AxiosHelper'
import Map from './Map'

const ExploreWidget = () => {
  const [exploreCountries, setExploreCountries] = useState([])
  const [isCountryListLoaded, setIsCountryListLoaded] = useState()
  const [map, setMap] = useState()
  const [selectedCountry, setSelectedCountry] = useState()
  const [hasCountryLoaded, setHasCountryLoaded] = useState(false)
  const [country, setCountry] = useState()
  const inputRef = useRef()

  let isComponentMounted = true
  const getRandomCountries = async () => {
    const countries = await getCountriesObject()
    let randomCountries = []
    for (let i = 0; i < 12; i++) {
      let pickedCountry = ''
      let isCountryUnique = []
      do {
        pickedCountry = countries[Math.floor(Math.random() * countries.length)]
        const pickedCountryName =
          pickedCountry.attributes.class || pickedCountry.attributes.name
        isCountryUnique = randomCountries.map(country => {
          const countryName =
            country.attributes.class || country.attributes.name
          return pickedCountryName === countryName
        })
      } while (isCountryUnique.includes(true))
      randomCountries.push(pickedCountry)
    }
    return randomCountries
  }

  useEffect(() => {
    isComponentMounted = true
    if (inputRef.current) {
      console.log(inputRef.current.offsrtWidth)
    }
    async function setValues () {
      const randCountries = await getRandomCountries()
      if (isComponentMounted) setExploreCountries(randCountries)
      setCountry(await getCountry())
    }
    setValues()
    return () => {
      isComponentMounted = false
    }
  }, [])

  useEffect(() => {
    console.log(country)
  }, [country])
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
    isComponentMounted = true
    if (isComponentMounted) {
      setMap(<Map mapInputs={selectedCountry} />)
      setHasCountryLoaded(true)
    }

    return () => {
      isComponentMounted = false
    }
  }, [selectedCountry])

  const setClickedCountry = async clickedCountry => {
    const countryName =
      clickedCountry.attributes.name || clickedCountry.attributes.class
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
                let countryName =
                  country.attributes.name || country.attributes.class
                return (
                  <Col md={4} key={country.attributes.d}>
                    <button
                      className='btn btn-link'
                      onClick={async e => await setClickedCountry(e)}
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
        country ? (
          <Map mapInputs={country} />
        ) : (
          'loading'
        )}
      </Container>
    </Container>
  )
}

export default ExploreWidget

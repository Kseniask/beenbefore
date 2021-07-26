import axios from 'axios'
import xmlCountries from './../countries.xml'
import xmlParser from 'react-xml-parser'

export const getCountriesObject = () => {
  return axios
    .get(xmlCountries, {
      'Content-Type': 'application/xml; charset=utf-8'
    })
    .then(response => new xmlParser().parseFromString(response.data).children)
}

export const getSingleCountry = async countryName => {
  const allCountries = await axios
    .get(xmlCountries, {
      'Content-Type': 'application/xml; charset=utf-8'
    })
    .then(response => new xmlParser().parseFromString(response.data).children)
  // const filteredCountry = allCountries.map(
  //   country => country.attributes.name === countryName
  // )
  const filteredCountry = allCountries.filter(
    country =>
      country.attributes.name === countryName ||
      country.attributes.class === countryName
  )

  return filteredCountry
}

export const getCountryByIp = async () => {
  const countryByIp = await axios.get('https://ipinfo.io').then(res => res)
  return countryByIp
}

export const getCountry = () => {
  return axios
    .get('https://www.amcharts.com/lib/3/maps/svg/belgiumLow.svg')
    .then(
      res =>
        new xmlParser().parseFromString(res.data).children[0].children[0]
          .children[2].children[1].children
    )
}

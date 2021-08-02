import axios from 'axios'
import xmlParser from 'react-xml-parser'

const fileNameMapping = {
  Macau: 'macao'
}
export const getCountriesObject = async () => {
  return axios
    .get('https://www.amcharts.com/lib/3/maps/svg/worldIndiaHigh.svg')
    .then(
      res =>
        new xmlParser().parseFromString(res.data).children[0].children[0]
          .children[2].children[1].children
    )
}

export const getSingleCountry = async countryName => {
  const trimName = countryName.replace(/\s+/g, '')
  const countryFileName = `${trimName[0].toLowerCase()}${trimName.slice(
    1
  )}Low.svg`

  return axios
    .get(`https://www.amcharts.com/lib/3/maps/svg/${countryFileName}`)
    .then(
      res =>
        new xmlParser().parseFromString(res.data).children[0].children[0]
          .children[2].children[1].children
    )
}

export const getCountryByIp = async () => {
  const countryByIp = await axios.get('https://ipinfo.io').then(res => res)
  return countryByIp
}

import { useState, useEffect } from 'react'
import xmlCountries from './countries.xml'
import axios from 'axios'
import xmlParser from 'react-xml-parser'
import Map from './Components/Map'
function App () {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get(xmlCountries, {
        'Content-Type': 'application/xml; charset=utf-8'
      })
      .then(response => {
        let countriesObj = new xmlParser().parseFromString(response.data)
        setCountries(countriesObj.children)
      })
  }, [])

  const setCountry = cntr => {
    console.log(cntr)
  }

  return (
    <div className='App'>
      <Map countries={countries} onClick={setCountry} />
    </div>
  )
}

export default App

import './../App.css'
const Country = ({ country, onCountryClick }) => {
  return (
    <path
      onClick={e => onCountryClick(e.target)}
      d={country.attributes.d}
    ></path>
  )
}

export default Country

import './../App.scss'
const Country = ({ country, onCountryClick }) => {
  return (
    <g>
      <path
        onClick={e => onCountryClick(e.target)}
        d={country.attributes.d}
      ></path>
    </g>
  )
}

export default Country

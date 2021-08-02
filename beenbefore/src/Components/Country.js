import './../App.scss'
const Country = ({ country, onCountryClick }) => {
  return (
    <g>
      <path
        onClick={e => onCountryClick(e.target)}
        d={country.attributes.d}
        id={country.attributes.id}
        title={country.attributes.title}
      ></path>
    </g>
  )
}

export default Country

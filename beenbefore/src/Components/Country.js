const Country = ({ country, onClick }) => {
  let name = country.attributes.name || country.attributes.class

  return (
    <path
      className={name}
      onClick={() => onClick(name)}
      d={country.attributes.d}
      key={country.attributes.d}
    ></path>
  )
}

export default Country

import Country from './Country'

const Map = ({ countries, onClick }) => {
  return (
    <div className='mapdiv'>
      <svg
        baseProfile='tiny'
        fill='#ececec'
        height='600'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='.2'
        version='1.2'
        viewBox='40 40 1800 900'
        width={window.width}
        xmlns='http://www.w3.org/2000/svg'
      >
        {countries.map(country => (
          <Country country={country} onClick={onClick} />
        ))}
      </svg>
    </div>
  )
}

export default Map

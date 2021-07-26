import { Col } from 'react-bootstrap'

const StepWidget = ({ step, text, image }) => {
  const splitText = text.split(' ')
  const verbString = splitText.shift()
  const nounString = splitText.join(' ')
  return (
    <Col className='justify-content-md-center step-widget'>
      <p>{step}</p>
      <h5>{verbString}</h5>
      <h6>{nounString}</h6>
      <img
        src={image}
        id={`step-${step}-img`}
        alt={text}
        width={step === '3' ? '170px' : '140px'}
      ></img>
    </Col>
  )
}

export default StepWidget

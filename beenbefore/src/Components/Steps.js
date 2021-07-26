import { Container, Row } from 'react-bootstrap'
import StepWidget from './StepWidget'
import findImage from './../images/find_image.png'
import postImage from './../images/post_image.png'
import selectImage from './../images/select_image.png'

const Steps = () => {
  return (
    <Container>
      <Row className='step-widget justify-content-md-center'>
        <StepWidget step='1' text='SELECT COUNTRY' image={findImage} />
        <StepWidget step='2' text='POST MEMORIES' image={postImage} />
        <StepWidget step='3' text='FIND NEW DESTINATIONS' image={selectImage} />
      </Row>
      <Container>
        <div id='rectangle'></div>
      </Container>
    </Container>
  )
}

export default Steps

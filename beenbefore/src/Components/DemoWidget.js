import { Container, Col, Row } from 'react-bootstrap'
import userIcon from './../images/account_icon.png'

const DemoWidget = () => {
  return (
    <Container>
      <img
        className='mx-auto d-block my-5'
        width='70px'
        id='user-icon'
        src={userIcon}
        alt='userIcon'
      ></img>
      <Row>
        <Col className='demo-image'></Col>
        <Col className='demo-image'></Col>
        <Col className='demo-image'></Col>
      </Row>
    </Container>
  )
}

export default DemoWidget

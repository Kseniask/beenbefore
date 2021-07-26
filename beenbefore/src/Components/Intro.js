import { Container, Button } from 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Intro = () => {
  return (
    <Container className='intro bg-white text-center'>
      <div className='p-2'>
        <h4>Your travel inspirator</h4>
        <h6>
          Find inspiration for your next trip. See where your friends had their
          best travels and plan your next trip with local gems
        </h6>
        <Button
          id='start-now-btn'
          className='mt-1 px-3'
          variant='outline-secondary'
          size='sm'
        >
          Start Now
        </Button>
      </div>
    </Container>
  )
}
export default Intro

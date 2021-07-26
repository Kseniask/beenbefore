import { Navbar, Nav, Button } from 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Navigation = () => {
  return (
    <Navbar className='bg-white' variant='light'>
      <Navbar.Brand href='#home' className='logo'>
        <h6>BEEN BE4</h6>
      </Navbar.Brand>
      <Nav className='ml-auto'>
        <Nav.Link href='#home'>
          <small>About</small>
        </Nav.Link>
        <Nav.Link href='#features'>
          <small>Explore</small>
        </Nav.Link>
        <Button variant='outline-secondary' href='#login'>
          <small>Log In</small>
        </Button>
        <Button variant='outline-secondary' href='#signup' className='ml-1'>
          <small>Sign Up</small>
        </Button>
      </Nav>
    </Navbar>
  )
}

export default Navigation

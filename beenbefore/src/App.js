import Map from './Components/Map'
import Navigation from './Components/Navigation'
import { Container } from 'react-bootstrap'
import Intro from './Components/Intro'
import Steps from './Components/Steps'
import DemoWidget from './Components/DemoWidget'
import ExploreWidget from './Components/ExploreWidget'

function App () {
  return (
    <Container id='intro-page'>
      <Container>
        <Navigation />
        <Intro />
        {/* <Map mapInputs={[]} /> */}
      </Container>

      <Container id='steps-page'>
        <Steps></Steps>
      </Container>

      <Container id='demo-page'>
        <DemoWidget></DemoWidget>
      </Container>

      <Container id='explore-page'>
        <ExploreWidget />
      </Container>
    </Container>
  )
}

export default App

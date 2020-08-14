import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from 'react-router-bootstrap';

import Login from "./Login";
import Home from "./Home"
import Test from "./Test"

class App extends React.Component {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        const App = () => (
            <div>
                <Navbar bg="light">
                    <LinkContainer to="/">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>
                </Navbar>
                <Container className="p-3">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/test' component={Test}/>
                    </Switch>
                </Container>
            </div>
        );

        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;
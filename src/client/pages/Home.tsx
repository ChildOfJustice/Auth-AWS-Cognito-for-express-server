import Jumbotron from "react-bootstrap/Jumbotron";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import * as React from "react";

// eslint-disable-next-line react/display-name,@typescript-eslint/explicit-module-boundary-types
export default () => {
    return (
        <Jumbotron>
            <h1>Hello!</h1>
            <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
            </p>
            <p>
                <LinkContainer to="/login">
                    <Button variant="primary">Sign In</Button>
                </LinkContainer>
                <LinkContainer to="/test">
                    <Button variant="primary">Test</Button>
                </LinkContainer>
            </p>
        </Jumbotron>
    );
}
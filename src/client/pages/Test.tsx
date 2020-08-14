import * as React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Test extends React.Component {
    // Initialize the state
    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
            msg: ''
        }
    }
    // Fetch the text on first mount
    componentDidMount() {

        this.getText();
        // @ts-ignore
        const { msg } = this.state;
        console.log("!!!_>" + msg)
    }
    // Retrieves the list of items from the Express app
    getText = () => {
        fetch('/api/test')
            .then(res => res.json())
            .then(msg => this.setState({ msg }))
    }

    render() {
        // @ts-ignore
        const { msg } = this.state;
        return (
            <div>
                FUCK THIS
                {msg}
            </div>
        );
    }
}
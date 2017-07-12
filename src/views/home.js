import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import Details from "./details";
import DetailsRepository from "./detailsrepository";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      valor: "",
      object: {},
      validationState: null,
      repository: []
    };
  }

  handleChange = e => {
    this.setState({ valor: e.target.value });
  };

  keyPress = event => {
    this.setState({ validationState: "warning" });
    if (event.key === "Enter") {
      event.preventDefault();
      this.getUser(this.state.valor);
    }
  };

  getUser(user) {
    let url = "https://api.github.com/users/" + user;
    fetch(url).then(async response => {
      if (!response.ok) {
        this.setState({ validationState: "error" });
        console.warn(response);
      }

      let json = await response.json();
      console.log(json);

      this.setState({ validationState: "success" });
      this.setState({ object: json });
      this.getRepository(json.repos_url);
    });
  }

  getRepository(url) {
    fetch(url).then(async response => {
      if (!response.ok) {
        this.setState({ validationState: "error" });
        console.warn(response);
      }

      let json = await response.json();
      this.setState({ repository: json });
      console.log(json);
    });
  }

  render() {
    return (
      <div className="container">
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.state.validationState}
          >
            <FormControl
              type="text"
              value={this.state.valor}
              placeholder="Find user..."
              onChange={this.handleChange}
              onKeyPress={this.keyPress}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Details userDetails={this.state.object} />
          <DetailsRepository repositoryDetails={this.state.repository} />
        </form>
      </div>
    );
  }
}

export default Home;

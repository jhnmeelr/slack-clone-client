import React, { Component } from 'react';
import { Input, Button, Container, Header } from 'semantic-ui-react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

export default observer(class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onChange = e => {
    const { name, value } = e.target;

    this[name] = value;
  }

  onSubmit = () => {
    const { email, password } = this;

    console.log({ email, password });
  }

  render() {
    const { email, password } = this;

    return (
      <Container>
        <Header as="h2">Login</Header>
        <Input name="email" onChange={this.onChange} value={email} fluid placeholder="Email" />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          fluid
          placeholder="Password"
          type="password"
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
});

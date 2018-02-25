import React, { Component } from 'react';
import { Input, Button, Container, Header, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async e => {
    this.setState({ usernameError: '', emailError: '', passwordError: '' });

    const { username, email, password } = this.state;
    const { mutate, history } = this.props;

    const response = await mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      history.push('/');
    } else {
      const err = {};

      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }

    console.log(response);
  };

  render() {
    const { username, email, password, usernameError, emailError, passwordError, } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container>
        <Header as="h2">Register</Header>
        <Input
          error={!!usernameError}
          name="username"
          onChange={this.onChange}
          value={username}
          fluid
          placeholder="Username"
        />
        <Input error={!!emailError} name="email" onChange={this.onChange} value={email} fluid placeholder="Email" />
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          value={password}
          fluid
          placeholder="Password"
          type="password"
        />
        <Button onClick={this.onSubmit}>Submit</Button>
        {(usernameError || emailError || passwordError) && <Message
          error
          header='There was some errors with your submission'
          list={errorList}
        />}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);

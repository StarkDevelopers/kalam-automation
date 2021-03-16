import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticated } from '../_helpers';
import { getUser } from '../_services';

export default function Auth(ComposedComponent, requiresAuthentication = true) {
  class Auth extends Component {
    constructor(props) {
      super(props);

      this.state = {
        redirected: false
      };

      this.redirectToDashboard = this.redirectToDashboard.bind(this);
      this.redirectToLogin = this.redirectToLogin.bind(this);
      this.authenticate = this.authenticate.bind(this);
    }

    componentWillMount() {
      this.authenticate(this.props);
    }

    componentWillUpdate(newProps) {
      // Handle Redirection On Update if needed...
      this.authenticate(newProps);
    }

    authenticate(props) {
      const isAuthenticated = authenticated();
      if (!requiresAuthentication) {
        // Login, SignUp or Public Pages - No Authentication Required.
        if (isAuthenticated) {
          if (!props.user && !props.loadingProfile) {
            // Fetch user if not available.
            this.fetchUser(props);
          } else {
            this.redirectToDashboard();
          }
        }
      } else {
        // Dashboard, Profile Pages or Private Pages - Authentication Required.
        if (!isAuthenticated) {
          this.redirectToLogin();
        } else {
          if (!props.user && !props.loadingProfile) {
            // Fetch user if not available.
            this.fetchUser(props);
          }
        }
      }
      return;
    }

    redirectToDashboard() {
      this.props.history.push('/users');
      this.setState({
        redirected: true
      });
    }

    redirectToLogin() {
      this.props.history.push('/login');
      this.setState({
        redirected: true
      });
    }

    fetchUser(props) {
      props.dispatch(getUser());
    }

    render() {
      if (this.state.redirected || this.props.loadingProfile) {
        return <React.Fragment></React.Fragment>;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      loadingProfile: state.user.loadingProfile,
      user: state.user.user
    };
  }

  return connect(mapStateToProps, null)(Auth);
}

/* filename: LoginScreen.jsx */

import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, ScrollView, Text, ActivityIndicator,
} from 'react-native';
import {
  FormInput, FormLabel, Button,
} from 'react-native-elements';
import send from '../actions/send';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EAD6',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  createAccountButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#9E1030',
    borderRadius: 10,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log in',
    headerStyle: {
      backgroundColor: '#DD4132',
    },
    headerTintColor: '#F0EAD6',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  renderLoader = () => {
    const cpProps = {
      ...this.props,
    };

    if (cpProps.showLoader) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#9E1030" />
        </View>
      );
    }
    return (
      <View style={styles.loaderContainer} />
    );
  };

  renderError = () => {
    const cpProps = {
      ...this.props,
    };

    if (cpProps.showError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            { cpProps.messageError }
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.errorContainer} />
    );
  };

  render() {
    const cpProps = {
      ...this.props,
    };
    const cpState = {
      ...this.state,
    };

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          <FormLabel>Login</FormLabel>
          <FormInput onChangeText={login => this.setState({ login })} />

          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={password => this.setState({ password })} />

          <View>
            { this.renderError() }
          </View>

          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <Button
                buttonStyle={styles.createAccountButton}
                onPress={() => {
                  cpProps.dispatch({
                    type: 'GOTO_CREATELOGIN',
                    undefined,
                  });
                }}
                title="Create"
                rightIcon={{ name: 'add', size: 15, color: 'white' }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => cpProps.dispatch(
                  send({
                    type: 'AUTHENTICATE',
                    value: {
                      login: cpState.login,
                      password: cpState.password,
                    },
                  }),
                )}
                title="Log in"
                rightIcon={{ name: 'arrow-downward', size: 15, color: 'white' }}
              />
            </View>
          </View>

          <View>
            { this.renderLoader() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  showLoader: state.toggleSocket.showLoader,
  showError: state.toggleSocket.showError,
  messageError: state.toggleSocket.messageError,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

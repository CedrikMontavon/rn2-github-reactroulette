import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, ScrollView, ActivityIndicator, Text,
} from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
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
  button: {
    backgroundColor: '#9E1030',
  },
  buttonText: {
    color: 'white',
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

class CreateLoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Create account',
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

          <View style={styles.container}>
            <Button
              buttonStyle={styles.button}
              textStyles={styles.buttonText}
              title="Create account"
              onPress={() => cpProps.dispatch(
                send({
                  type: 'CREATE_LOGIN',
                  value: {
                    login: cpState.login,
                    password: cpState.password,
                  },
                }),
              )}
              icon={{ name: 'add-circle', size: 15, color: 'white' }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateLoginScreen);

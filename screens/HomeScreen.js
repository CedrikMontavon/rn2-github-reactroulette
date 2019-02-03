import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, ScrollView, ActivityIndicator,
} from 'react-native';
import {
  FormInput, FormLabel, Button, Avatar,
} from 'react-native-elements';
import send from '../actions/send';
import NavigatorService from '../navigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EAD6',
  },
  contentContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    paddingLeft: 10,
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

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'ReactRoulette',
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
        username: '',
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

          <View style={{ alignItems: 'center' }}>
            <Avatar large rounded source={{ uri: cpProps.uri }} activeOpacity={0.7} onPress={() => { NavigatorService.navigate('Camera'); }} />
          </View>
          <View style={{ marginTop: 15 }}>
            <FormLabel style={{ paddingTop: 15, paddingBottom: 15 }}>Name</FormLabel>
          </View>

          <View style={{ marginBottom: 15 }}>
            <FormInput onChangeText={(username) => { this.setState({ username }); }} />
          </View>

          <View style={styles.container}>
            <Button
              buttonStyle={styles.button}
              textStyles={styles.buttonText}
              title="Attract partner"
              onPress={() => {
                cpProps.dispatch(
                  send({
                    type: 'ATTRACT_PARTNER',
                    value: {
                      username: cpState.username,
                    },
                  }),
                );
              }}
              icon={{ name: 'search', size: 15, color: 'white' }}
            />
          </View>
          <View style={styles.container}>
            <Button
              buttonStyle={styles.button}
              textStyles={styles.buttonText}
              title="Cancel attraction"
              onPress={() => {
                cpProps.dispatch(
                  send({
                    type: 'CANCEL_ATTRACT_PARTNER',
                    undefined,
                  }),
                );
              }}
              icon={{ name: 'search', size: 15, color: 'white' }}
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
  uri: state.toggleCameraPicture.uri,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

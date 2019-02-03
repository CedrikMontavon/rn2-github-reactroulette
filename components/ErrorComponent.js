import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
});

class ErrorComponent extends React.Component {
  render() {
    const cpProps = {
      ...this.props,
    };

    if (cpProps.showError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>
            { cpProps.messageError }
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container} />
    );
  }
}

const mapStateToProps = state => ({
  showError: state.toggleSocket.showError,
  messageError: state.toggleSocket.messageError,
});

export default connect(mapStateToProps)(ErrorComponent);

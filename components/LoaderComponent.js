import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

class LoaderComponent extends React.Component {
  render() {
    const cpProps = {
      ...this.props,
    };

    if (cpProps.showLoader) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#9E1030" />
        </View>
      );
    }
    return (
      <View style={styles.container} />
    );
  }
}

const mapStateToProps = state => ({
  showLoader: state.toggleSocket.showLoader,
});

export default connect(mapStateToProps)(LoaderComponent);

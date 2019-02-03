import React from 'react';
import { connect } from 'react-redux';
import { Camera } from 'expo';
import { Button } from 'react-native-elements';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraFiller: {
    flex: 8,
  },
  cameraContent: {
    flex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCamera: {
    flex: 4,
    borderRadius: 30,
    backgroundColor: '#9E1030',
  },
});

class CameraScreen extends React.Component {
  async press() {
    if (this.camera) {
      const cpProps = {
        ...this.props,
      };

      const photo = await this.camera.takePictureAsync();
      const action = {
        type: 'PICTURE_TAKEN',
        value: {
          uri: photo.uri,
        },
      };

      cpProps.dispatch(
        action,
      );
    }
  }

  render() {
    return (
      <Camera style={styles.camera} ratio="16:9" ref={(ref) => { this.camera = ref; }}>
        <View style={styles.cameraFiller} />
        <View style={styles.cameraContent}>
          <Button
            style={styles.buttonCamera}
            onPress={() => this.press()}
            icon={{
              name: 'add-a-photo',
              size: 60,
              color: 'white',
            }}
          />
        </View>
      </Camera>
    );
  }
}

const mapStateToProps = state => ({
  uri: state.uri,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);

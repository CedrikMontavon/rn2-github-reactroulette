import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Platform, Text,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Avatar } from 'react-native-elements';
import send from '../actions/send';

const moment = require('moment');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EAD6',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

class ChatScreen extends React.Component {
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

  sendMessage = (messages = []) => {
    const cpProps = {
      ...this.props,
    };

    const receivedMessageId = cpProps.messages.length + 1;
    const receivedMessage = {};

    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    receivedMessage._id = receivedMessageId.toString();
    receivedMessage.createdAt = moment();
    receivedMessage.text = messages[0].text;
    receivedMessage.user = {};
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    receivedMessage.user._id = 1;

    cpProps.dispatch(
      send({
        type: 'SEND_MESSAGE',
        value: {
          receivedMessage,
        },
      }),
    );
  };

  render() {
    const cpProps = {
      ...this.props,
    };

    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Avatar large rounded source={{ uri: cpProps.uri }} activeOpacity={0.7} />
        </View>

        <View style={{ marginTop: 15, alignItems: 'center' }}>
          <Text style={{ color: '#9E1030' }}>{ cpProps.partnerUsername }</Text>
        </View>
        <GiftedChat
          messages={cpProps.messages}
          onSend={messages => this.sendMessage(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  partnerUsername: state.toggleSocket.partnerUsername,
  uri: state.toggleCameraPicture.uri,
  messages: state.toggleSocket.messages,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

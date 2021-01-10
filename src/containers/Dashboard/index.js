// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';

import {ButtonView, Text} from '../../components';

import {Metrics, Colors} from '../../theme';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      recognizedString: '',
    };
  }

  renderContent = () => {
    const {recognizedString} = this.state;
    return (
      <View style={{flex: 1}}>
        <Text color="white">{recognizedString}</Text>
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View
        style={{
          height: Metrics.ratio(70),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        {this.renderFooter()}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(Dashboard);

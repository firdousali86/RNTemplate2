import React, {useState, createRef} from 'react';
import {useDispatch} from 'react-redux';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import RNRestart from 'react-native-restart';

import {liveServerURL, defaultServer} from '../../config/WebService';
import {ButtonView, Separator2} from '../../components';

import {Metrics, Colors} from '../../theme';

import styles from './styles';
import utils from '../../util';
import {DataHelper} from '../../helpers';
import {changeServer} from '../../actions/AppSettings';

const actionSheetRef = createRef();

const AppDebugButton = () => {
  const dispatch = useDispatch();

  const [serverInputFieldVal, setServerInputFieldVal] = useState(
    DataHelper.getServiceURL(),
  );

  const onURLChanged = newurl => {
    dispatch(changeServer(newurl));
    DataHelper.onLogout();

    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };

  const onActionSheetOptionTapped = buttonIndex => {
    let url = defaultServer;
    let isSwitched = false;

    if (buttonIndex === 0) {
      url = serverInputFieldVal;
      isSwitched = true;
    } else if (buttonIndex === 1) {
      url = liveServerURL;
      isSwitched = true;
      utils.showToast('LIVE');
    }

    if (isSwitched) {
      onURLChanged(url);
    }

    actionSheetRef.current?.setModalVisible(false);
  };

  const renderDebugActionSheet = () => {
    return (
      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: Metrics.baseMargin,
            marginVertical: Metrics.smallMargin,
          }}>
          <TextInput
            value={serverInputFieldVal}
            onChangeText={text => {
              setServerInputFieldVal(text);
            }}
            placeholder={'Set Custom URL'}
            style={{
              margin: Metrics.smallMargin,
              flex: 1,
              backgroundColor: Colors.grey,
              height: Metrics.ratio(44),
            }}
          />
          <ButtonView
            onPress={() => {
              if (serverInputFieldVal && serverInputFieldVal.length > 0) {
                onActionSheetOptionTapped(0);
              }
            }}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'red'}}>Change</Text>
          </ButtonView>
        </View>

        <Separator2 />
        <ButtonView
          style={styles.buttonStyle}
          onPress={() => {
            onActionSheetOptionTapped(1);
          }}>
          <Text>Live</Text>
        </ButtonView>
        <Separator2 />
        <ButtonView
          style={styles.buttonStyle}
          onPress={() => {
            actionSheetRef.current?.setModalVisible(false);
          }}>
          <Text style={{color: 'blue'}}>Cancel</Text>
        </ButtonView>
      </ActionSheet>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onLongPress={() => {
          setTimeout(() => actionSheetRef.current?.setModalVisible(true), 500);
        }}
        underlayColor={Colors.transparent}>
        <View style={{flex: 1, backgroundColor: Colors.grey}} />
      </TouchableOpacity>

      {renderDebugActionSheet()}
    </View>
  );
};

export default AppDebugButton;

// @flow

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';
import {
  Image,
  View,
  ViewPropTypes,
  Image as ImageNative,
  ActivityIndicator,
} from 'react-native';
// import RNImagePicker from "react-native-image-picker";
import MultipleImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import styles from './styles';
import ButtonView from '../ButtonView';
import async from 'async';
import ActionSheet from 'react-native-actionsheet';
import _ from 'lodash';
import {Metrics, Colors} from '../../theme';
import utils from '../../util';
import commonUtils from '../../util/commonUtils';

const resizeImageHandling = (selectedData, callback) => {
  let calculatedHeight;
  let calculatedWidth;

  if (selectedData.width && selectedData.height) {
    if (selectedData.width < 720) {
      calculatedWidth = selectedData.width;
      calculatedHeight = selectedData.height;
    } else {
      calculatedWidth = 720;
      calculatedHeight = (selectedData.height / selectedData.width) * 720;
    }
  } else {
    calculatedWidth = 720;
    calculatedHeight = 480;
  }

  ImageResizer.createResizedImage(
    selectedData.path || selectedData.uri,
    calculatedWidth,
    calculatedHeight,
    'JPEG',
    100,
  )
    .then(resizedImage => {
      callback(resizedImage);
    })
    .catch(err => {
      consoleLog(err);
      callback(null);
    });
};

const resizeVideoHandling = (selectedData, callback) => {
  callback(selectedData);
};

export default class ImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
    onImagePicked: PropTypes.func.isRequired,
    imageStyle: PropTypes.oneOfType([PropTypes.object, ViewPropTypes.style]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      ViewPropTypes.style,
      PropTypes.object,
    ]),
    isMultiple: PropTypes.bool,
    isCropping: PropTypes.bool,
    isCameraVideo: PropTypes.bool,
    isEditable: PropTypes.bool,
  };

  static defaultProps = {
    imageStyle: styles.image,
    containerStyle: styles.container,
    isMultiple: false,
    isCropping: false,
    isCameraVideo: false,
    isEditable: true,
  };

  handlePressActionSheet = i => {
    const {isCameraVideo, onImagePicked, onVideoPicked} = this.props;

    if (isCameraVideo) {
      if (i === 0) {
        // const a = new ImagePicker({
        //   mediaType: "video",
        //   durationLimit: 10
        //   // videoQuality: "low"
        // });
        // a.showCameraVideoPicker(selected => {
        //   onVideoPicked({
        //     ...selected,
        //     mime: "video"
        //   });
        // });
      } else if (i === 1) {
        this.showCameraImagePicker();
      } else if (i === 2) {
        this.showImageGalleryPicker();
      } else if (i === 3) {
        this.showVideoGalleryPicker();
      }
    } else {
      if (i === 0) {
        this.showCameraImagePicker();
      } else if (i === 1) {
        this.showImageGalleryPicker();
      }
    }
  };

  showCameraImagePicker = thisCallback => {
    const {onImagePicked, isCropping, ...rest} = this.props;

    MultipleImagePicker.openCamera({
      width: 720,
      height: 480,
      cropping: isCropping,
      mediaType: 'photo',
      ...rest,
    }).then(
      selectedMedia => {
        resizeImageHandling(selectedMedia, resizedImage => {
          if (thisCallback) {
            thisCallback(resizedImage);
          } else {
            onImagePicked(resizedImage);
          }
        });
      },
      function(error) {
        if (error && error.code === 'E_PERMISSION_MISSING') {
          utils.showSettingsPopup('Alert', 'CARHUB requires access to Camera');
        }
      },
    );
  };

  // showCameraVideoPicker = thisCallback => {
  //   const { onVideoPicked, ...rest } = this.props;

  //   RNImagePicker.launchCamera(
  //     {
  //       width: 720,
  //       height: 480,
  //       mediaType: "video",
  //       durationLimit: 10,
  //       ...rest
  //     },
  //     selectedMedia => {
  //       // Same code as in above section!
  //       if (selectedMedia.didCancel) {
  //         consoleLog("User cancelled image picker");
  //       } else if (selectedMedia.error) {
  //         if (
  //           selectedMedia.error &&
  //           (selectedMedia.error.code ===
  //             "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR" ||
  //             selectedMedia.error.code === "E_PERMISSION_MISSING")
  //         ) {
  //           utils.showSettingsPopup(
  //             "Alert",
  //             "CARHUB requires access to Camera"
  //           );
  //         }
  //       } else {
  //         resizeVideoHandling(selectedMedia, correctedFilePath => {
  //           if (thisCallback) {
  //             thisCallback(correctedFilePath);
  //           } else {
  //             onVideoPicked(correctedFilePath);
  //           }
  //         });
  //       }
  //     }
  //   );
  // };

  showImageGalleryPicker = thisCallback => {
    const {isMultiple, isCropping, onImagePicked, ...rest} = this.props;

    MultipleImagePicker.openPicker({
      ...rest,
      multiple: isMultiple,
      cropping: isCropping,
      mediaType: 'photo',
    }).then(
      selectedMedia => {
        if (isMultiple) {
          let editedArray = [];

          async.forEachSeries(
            selectedMedia,
            function(mediaFile, callback) {
              resizeImageHandling(mediaFile, resizedImage => {
                if (resizedImage) {
                  editedArray.push(resizedImage);
                }

                callback();
              });
            },
            function(err) {
              if (thisCallback) {
                thisCallback(editedArray);
              } else {
                onImagePicked(editedArray);
              }
            },
          );
        } else {
          resizeImageHandling(selectedMedia, resizedImage => {
            if (thisCallback) {
              thisCallback(resizedImage);
            } else {
              onImagePicked(resizedImage);
            }
          });
        }
      },
      function(error) {
        if (error && error.code === 'E_PERMISSION_MISSING') {
          utils.showSettingsPopup(
            'Alert',
            'CARHUB requires access to Photo Gallery',
          );
        }
      },
    );
  };

  showVideoGalleryPicker = thisCallback => {
    const {onVideoPicked, ...rest} = this.props;

    MultipleImagePicker.openPicker({
      ...rest,
      mediaType: 'video',
    }).then(
      selectedMedia => {
        if (selectedMedia.mime.includes('video')) {
          resizeVideoHandling(selectedMedia, correctedFilePath => {
            if (thisCallback) {
              thisCallback(correctedFilePath);
            } else {
              onVideoPicked(correctedFilePath);
            }
          });
        }
      },
      function(error) {
        if (error && error.code === 'E_PERMISSION_MISSING') {
          utils.showSettingsPopup(
            'Alert',
            'CARHUB requires access to Photo Gallery',
          );
        }
      },
    );
  };

  _showImagePicker = () => {
    this.ActionSheet.show();
  };

  _showImagePickerCameraVid = () => {
    this.ActionSheetCameraVid.show();
  };

  renderSmallIcon = () => {
    const {smallIcon, isCameraVideo} = this.props;
    if (smallIcon) {
      return (
        <View style={styles.editProfileBtnContainer}>
          <ButtonView
            onPress={() => {
              if (isCameraVideo) {
                this._showImagePickerCameraVid();
              } else {
                this._showImagePicker();
              }
            }}
            style={styles.editProfileBtn}>
            <ImageNative source={smallIcon} style={styles.editProfileBtn} />
          </ButtonView>
        </View>
      );
    } else {
      return null;
    }
  };

  onLoadEnd() {
    this.setState({loaded: true});
  }

  renderLoader = () => {
    return (
      <View>
        {!this.state.loaded && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              zIndex: 1,
              marginLeft: Metrics.ratio(45),
              marginTop: Metrics.ratio(45),
            }}>
            <ActivityIndicator size="large" color={Colors.loaderColor} />
          </View>
        )}
      </View>
    );
  };

  render() {
    const {isCameraVideo, onProfileImagePress, isEditable} = this.props;
    const options = ['Camera', 'Gallery', 'Cancel'];

    return (
      <View>
        <ButtonView
          style={this.props.containerStyle}
          onPress={() => {
            if (onProfileImagePress) {
              onProfileImagePress();
            } else {
              if (isCameraVideo) {
                this._showImagePickerCameraVid();
              } else if (isEditable) {
                this._showImagePicker();
              }
            }
          }}>
          {this.renderLoader()}
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={this.props.imageStyle}
            source={this.props.source}
            onLoadEnd={this.onLoadEnd.bind(this)}
          />
        </ButtonView>
        {this.renderSmallIcon()}
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={"Choose an option"}
          options={options}
          cancelButtonIndex={2}
          // destructiveButtonIndex={1}
          onPress={this.handlePressActionSheet}
        />
        <ActionSheet
          ref={o => (this.ActionSheetCameraVid = o)}
          // title={"Choose an option"}
          options={[
            'Record',
            'Capture',
            'Select Images',
            'Select Video',
            'Cancel',
          ]}
          cancelButtonIndex={4}
          // destructiveButtonIndex={1}
          onPress={this.handlePressActionSheet}
        />
      </View>
    );
  }
}

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    text: 'yolo'
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={cam => {
              this.camera = cam;
            }}
          >
            {/* <Text onPress={this.takePicture.bind(this)}>[CAPTURE_IMAGE]</Text> */}
            <Text onPress={this.takeAndUploadPhotoAsync}>[CAPTURE_IMAGE]</Text>

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Flip{' '}
                </Text>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {this.state.text}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
  takePicture() {
    console.log('what it do?');
    const options = {};

    this.camera
      .takePictureAsync({ metadata: options })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  takeAndUploadPhotoAsync = async () => {
    console.log('piss & shit');
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (result.cancelled) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type });

    return await fetch('http://192.168.125.141:3000/post', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('response', response);
        return response.json();
      })
      .then(data => {
        console.log('data', data);
        this.setState({ text: data.data });
      });
  };
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff'
//   }
// });
console.log('what it do?', 'strange');

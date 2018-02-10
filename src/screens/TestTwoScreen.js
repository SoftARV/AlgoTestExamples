import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';

import TestTwo from '../functions/TestTwo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TEST_CASE = '5\n3 3\n9 6 3\n5 9 6\n3 5 9\n1 10\n0 1 2 3 4 5 6 7 8 7\n2 3\n7 6 7\n7 6 7\n5 5\n1 2 3 4 5\n2 9 3 9 6\n3 3 0 8 7\n4 9 8 9 8\n5 6 7 8 9\n2 13\n8 8 8 8 8 8 8 8 8 8 8 8 8\n8 8 8 8 8 8 8 8 8 8 8 8 8'

class TestTwoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '', testResult: '' };
  }

  onInputChange(text) {
    this.setState({ inputValue: text || '' });
  }

  onResultChange(text) {
    this.setState({ inputValue: text || '' });
  }

  setTestCaseOnInput = () => {
    this.setState({ inputValue: TEST_CASE });
  }

  clearInputButtonPress = () => {
    this.setState({ inputValue: '', testResult: '' });
  }

  runTestButtonPress = () => {
    this.setState({ testResult: TestTwo(this.state.inputValue) }); 
  }

  render() {
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Test 2', style: { color: '#fff' } }}
        />
        <View style={styles.container}>
        <TextInput 
            value={this.state.inputValue}
            onChangeText={(text) => this.onInputChange(text)}
            style={styles.textInput}
            placeholder='Input for test'
            multiline={true}
            autoGrow={!IsIOS}
            maxHeight={200}
          />
          <View style={styles.buttonContainer}>
            <Button 
              title='SET TEST CASE'
              buttonStyle={styles.inputButtons}
              onPress={this.setTestCaseOnInput}
            />
            <Button 
              title='CLEAR INPUT'
              buttonStyle={styles.inputButtons}
              onPress={this.clearInputButtonPress}
            />
          </View>
          <Button 
            title='RUN TEST'
            buttonStyle={styles.runButton}
            onPress={this.runTestButtonPress}
          />
          <TextInput 
            value={this.state.testResult}
            onChangeText={(text) => this.onResultChange(text)}
            style={styles.textInput}
            placeholder='Test Result...'
            multiline={true}
            autoGrow={!IsIOS}
            maxHeight={200}
          />
        </View>
      </View>
    );
  }
}

const IsIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  textInput: {
    width: SCREEN_WIDTH - (SCREEN_WIDTH/10),
    margin: 10,
    fontSize: 17,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: IsIOS ? 4 : 0,
  },
  inputButtons: {
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: IsIOS ? 5 : 0
  },
  runButton: {
    marginTop: 10,
    height: 45,
    width: SCREEN_WIDTH/2,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: IsIOS ? 5 : 0
  },
  textResult: {
    margin: 10,
    fontSize: 17
  }
});

export default TestTwoScreen;
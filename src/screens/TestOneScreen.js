import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';

import TestOne from '../functions/TestOne';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TEST_CASE = '3 5 4\nabc\nbca\ndac\ndbc\ncba\n(ab)(bc)(ca)\nabc\n(abc)(abc)(abc)\n(zyx)bc';

class TestOneScreen extends React.Component {
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
     this.setState({ testResult: TestOne(this.state.inputValue) });
  }

  render() {
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Test 1', style: { color: '#fff' } }}
        />
        <ScrollView contentContainerStyle={styles.container}>
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
        </ScrollView>
      </View>
    );
  }
}

const IsIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20
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

export default TestOneScreen;
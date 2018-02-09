import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import TestOne from '../functions/TestOne';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TEST_CASE = '3 5 4\nabc\nbca\ndac\ndbc\ncba\n(ab)(bc)(ca)\nabc\n(abc)(abc)(abc)\n(zyx)bc';

class TestOneScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '', testResult: '' };
  }

  onInputChange(event) {
    this.setState({ inputValue: event.nativeEvent.text || '' });
  }

  onResultChange(event) {
    this.setState({ inputValue: event.nativeEvent.text || '' });
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
        <AutoGrowingTextInput 
            value={this.state.inputValue}
            onChange={(event) => this.onInputChange(event)}
            style={styles.textInput}
            placeholder={'Input for Test'}
            maxHeight={200}
            minHeight={45}
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
          <AutoGrowingTextInput 
            value={this.state.testResult}
            onChange={(event) => this.onResultChange(event)}
            style={styles.textInput}
            placeholder={'Test Result...'}
            maxHeight={300}
            minHeight={45}
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
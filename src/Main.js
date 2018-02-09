import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

import TestOneScreen from './screens/TestOneScreen';
import TestTwoScreen from './screens/TestTwoScreen';

const RootTabNavigator = TabNavigator({
  TestOne: { screen: TestOneScreen },
  TestTwo: { screen: TestTwoScreen }
}, {
  tabBarPosition: 'bottom'
})

class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootTabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Main;
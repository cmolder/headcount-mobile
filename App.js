import React, { Fragment } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View } from 'react-native';
import Header from './components/Header';

export default function App() {
  return (
    <Fragment>

      {/* Notch/top region for iOS, otherwise size 0 */}
      <SafeAreaView style={styles.notch}>
        <StatusBar barStyle="light-content"/>
      </SafeAreaView>

       {/* Remainder of app view, including home bar for iOS */}
      <SafeAreaView style={styles.bottom}>
        <Header text="Headcount" />
      </SafeAreaView>
    
    </Fragment>
  );
}

const styles = StyleSheet.create({
  notch: {
    flex: 0,
    backgroundColor: '#171717',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  bottom: {
    flex: 1,
    backgroundColor: '#bbb'
  }
});

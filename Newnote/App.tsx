import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


// ------------ P A G E S ------------ 
  import Note from './components/Note';
  import NoteList from './components/NoteList';
// ------------ P A G E S ------------ 

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='NoteList'
        screenOptions={{
          headerShown:false
        }}
      >

        <Stack.Screen
          name="Note"
          component={Note}
        />

        <Stack.Screen
          name="NoteList"
          component={NoteList}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
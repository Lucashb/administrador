import React from 'react';
import { NavigationContainer  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Administrador from './src/Administrador';
import AdministradorBrasileiraoAInsere from './src/AdministradorBrasileiraoAInsere';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen 
          name="Administrador"
          component={Administrador}
          options={{
            title: 'Administrador',
            headerTintColor: '#20212A',
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: '#F5C343'
            },  
          }}/>

          <Stack.Screen 
          name="AdministradorBrasileiraoAInsere"
          component={AdministradorBrasileiraoAInsere}
          options={{
            title: 'Brasileirao Serie A',
            headerTintColor: '#20212A',
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: '#F5C343'
            },
          }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
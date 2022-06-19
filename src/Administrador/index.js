import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';


const larguraCard = Math.round(Dimensions.get('window').width);

export default function Administrador() {

  const navigation = useNavigation();

  function entrar(){
    navigation.navigate('AdministradorBrasileiraoAInsere');
  }

  return (
    <View style={styles.background}>
      <StatusBar
        barStyle = "dark-content"
        hidden = {false}
        backgroundColor = "#20212A"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
      <TouchableOpacity style={styles.card}
      onPress={() => entrar('BRASILEIRAO A')}>
        <Text style={styles.texto}>
          BRASILEIRAO A
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
      onPress={() => entrar('BRASILEIRAO B')}>
        <Text style={styles.texto}>
          BRASILEIRAO B
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#12131C',
    alignItems: 'center',
  },
  card: {
    width: larguraCard - 20,
    backgroundColor: '#20212A',
    borderRadius: 10,
    height: 80,
    // Fundo do card
    elevation: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  texto:{
    flex:1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#C1C1C1',
  },
});
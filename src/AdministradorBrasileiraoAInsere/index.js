import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, RefreshControl, TouchableOpacity, Image, KeyboardAvoidingView, Dimensions, Alert, KeyboardAvoidingViewBase } from 'react-native';
import axios from 'axios';
import api from '../services/api';
//import { ScrollView } from 'react-native-gesture-handler';

const larguraCard = Math.round(Dimensions.get('window').width);

export default function AdministradorBrasileiraoAInsere() {

  const [rodada, setRodada] = useState();
  const [nomeCampeonato, setnomeCampeonato] = useState();
  const [premio, setPremio] = useState();
  const [idcampeonatos, setIdcampeonato] = useState();
  const [status, setStatus] = useState();
  const [versaoAPI, setVersaoAPI] = useState();

  const token = '0ecf8e42a0a540d48f6b6f19747fc999';

  const getPartidas = async () => {
    await axios.get(`http://api.football-data.org/${versaoAPI}/competitions/${idcampeonatos}/matches?matchday=${rodada}`,{
      headers:{
        'X-Auth-Token': `${token}`
      }
    }).
    then((res) => {
      try {
        const dados = res.data.matches.map(function(item){
            {var urlcasa = 'https://crests.football-data.org/' + item.homeTeam.id + '.png'}
            {var urlfora = 'https://crests.football-data.org/' + item.awayTeam.id + '.png'}
          return {
            data_partida: item.utcDate,
            status_partida: item.status,
            numero_partida: item.matchday,
            id_time_casa: item.homeTeam.id,
            id_time_fora: item.awayTeam.id,
            nome_time_casa: item.homeTeam.name,
            nome_time_fora: item.awayTeam.name,
            gols_time_casa: item.score.fullTime.homeTeam,
            gols_time_fora: item.score.fullTime.awayTeam,
            url_imagem_time_casa: urlcasa,
            url_imagem_time_fora: urlfora,
            id_campeonatos: item.season.id,
            id_partida_api: item.id,
            nome_campeonato: nomeCampeonato
          };
        });
       
        const dadosCampeonato = {
          rodada: rodada,
          nome: nomeCampeonato,
          premio: premio,
          status: status,
          id_campeonatos: dados[1].id_campeonatos
        }

        api.post('/insereCampeonato', dadosCampeonato);

        for(var i = 0; i < dados.length; i++){
          const response1 = api.post('/inserePartidasBrasileiraoA', dados[i])
          .catch((error) => {
            console.error(error)
          });
        }
        
      } catch (response){
        console.alert('Deu Ruim !!!');
      }
    })
    .catch((error) => {
      console.alert('Deu Ruim !!!');
    });
  }

  const UpdatePartidas = async () =>{
    await axios.get(`http://api.football-data.org/${versaoAPI}/competitions/${idcampeonatos}/matches?matchday=${rodada}`,{
      headers:{
        'X-Auth-Token': `${token}`
      }
    }).
    then((res) => {
      try {

        const dados2 = res.data.matches.map(function(item){
          return {
            status_partida: item.status,
            gols_time_casa: item.score.fullTime.homeTeam,
            gols_time_fora: item.score.fullTime.awayTeam,
            id_partida_api: item.id
          };
        });

        //console.log(dados2);

        for(var i = 0; i < dados2.length; i++){
          api.put('/AlteraBrasileiraoas', dados2[i])
          .catch((error) => {
            console.log('Deu Ruim !!!');
          });
          api.put('/alteraPartidasUsuariosBrasileiraoasTodos', dados2[i])
          .catch((error) => {
            console.log('Deu Ruim !!!');
          });
        }
        
      } catch (error){
        console.alert('Deu Ruim !!!');
      }
    })
    .catch((error) => {
      console.error(error)
    });
  }

  function encerraCampeonato(){

    const dados = {
        status: status,
        rodada: rodada,
        id_campeonatos: idcampeonatos
      };

    api.put('/alteraCampeonato', dados)
    .catch((error) => {
      console.log('Deu Ruim !!!');
    });
  }

  function gravaRodada(aux){
    setRodada(aux);
  }

  function gravaNomeCampeonato(aux){
    setnomeCampeonato(aux);
  }
  
  function gravaPremio(aux){
    setPremio(aux);
  }

  function gravaCodigoCampeonato(aux){
    setIdcampeonato(aux);
  }

  function gravaIdStatus(aux){
    setStatus(aux);
  }

  function gravaVersaoAPI(aux){
    setVersaoAPI(aux)
  }

  return (
    <ScrollView 
    style={styles.background}
    >
      <View>
        <TouchableOpacity style={styles.card}
        onPress={getPartidas}>
          <TextInput
          style={styles.texto}
          placeholder="Nome Campeonato"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaNomeCampeonato(item)}}
          />
          <TextInput
          style={styles.texto}
          placeholder="Codigo Campeonato"
          placeholderTextColor="#C1C1C1"
          keyboardType='numeric'
          onChangeText={(item)=>{gravaCodigoCampeonato(item)}}
          />
          <TextInput
          style={styles.texto}
          placeholder="Rodada"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaRodada(item)}}
          keyboardType='numeric'
          />
          <TextInput
          style={styles.texto}
          placeholder="Premio"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaPremio(item)}}
          keyboardType='numeric'
          />
          <TextInput
          style={styles.texto}
          placeholder="Status"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaIdStatus(item)}}
          />
          <TextInput
          style={styles.texto}
          placeholder="Versao API"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaVersaoAPI(item)}}
          />
          <Text style={styles.texto}>
            Inserir Rodada Atual
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={UpdatePartidas}>
          <TextInput
          style={styles.texto}
          placeholder="rodada"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaRodada(item)}}
          keyboardType='numeric'
          />

          <TextInput
          style={styles.texto}
          placeholder="Codigo Campeonato"
          placeholderTextColor="#C1C1C1"
          keyboardType='numeric'
          onChangeText={(item)=>{gravaCodigoCampeonato(item)}}
          />

          <TextInput
          style={styles.texto}
          placeholder="Versao API"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaVersaoAPI(item)}}
          />

          <Text style={styles.texto}>
            Alterar Rodada Atual
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}
        onPress={encerraCampeonato}>
          <TextInput
          style={styles.texto}
          placeholder="rodada"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaRodada(item)}}
          keyboardType='numeric'
          />

          <TextInput
          style={styles.texto}
          placeholder="Codigo Campeonato"
          placeholderTextColor="#C1C1C1"
          keyboardType='numeric'
          onChangeText={(item)=>{gravaCodigoCampeonato(item)}}
          />

          <TextInput
          style={styles.texto}
          placeholder="Status"
          placeholderTextColor="#C1C1C1"
          onChangeText={(item)=>{gravaIdStatus(item)}}
          />

          <Text style={styles.texto}>
            Encerrar Rodada
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#12131C',
    alignContent: 'center'
  },
  card: {
    width: larguraCard,
    backgroundColor: '#20212A',
    borderRadius: 10,
    height: 250,
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
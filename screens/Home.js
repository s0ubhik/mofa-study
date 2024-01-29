import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../services/theme';
import { getBoard } from '../redux/actions';
import {useSelector} from 'react-redux';
import React, { useEffect } from 'react';

const selectBoard = (nav, name) => {
  getBoard();
  nav.navigate("Classes", {board: name});
}

const Board = ({name, color=theme.accent, nav}) => {
  return (
  <TouchableWithoutFeedback onPress={() => selectBoard(nav, name)}>
  <View style={{...styles.board, backgroundColor: color}}>
    <Text style={styles.boardName}>{name}</Text>
    <Icon name="angle-right" size={30} color="#000"/>
  </View>
  </TouchableWithoutFeedback>
  )
}

function Home({ navigation, route }) {
  const boards = useSelector(state=>state.boards);
  const RenderedBoards = [];
  
  useEffect(() => {
    getBoard(); 
  }, []);

  for (const name in boards) {
    const board = boards[name];
    RenderedBoards.push(
      <Board key={name} name={name} color={board.color} nav={navigation}/>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Study</Text>
      <View style={styles.boards}>
        {RenderedBoards}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
    padding: 15,
  },

  header: {
    color: theme.white,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  boards: {
    backgroundColor: theme.primary,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  board: {
    backgroundColor: theme.secondary,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  boardName: {
    color: "#000",
    opacity: 0.7,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default Home;
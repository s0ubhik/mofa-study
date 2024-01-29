import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../services/theme';
import { getSubjects } from '../redux/actions';
import {useSelector} from 'react-redux';
import React, { useEffect } from 'react';

const selectClass = (board, sclass) => {
  getSubjects(board.toLowerCase(), sclass)
  console.log(board + " " + sclass);
}

const SClass = ({name, color=theme.accent, sclass, board}) => {
  return (
  <TouchableWithoutFeedback onPress={() => selectClass(board,sclass)}>
  <View style={{...styles.sclass, backgroundColor: color}}>
    <Text style={styles.className}>{name}</Text>
    <Icon name="angle-right" size={30} color="#000"/>
  </View>
  </TouchableWithoutFeedback>
  )
}

function Classes({ navigation, route }) {
  const boards = useSelector(state=>state.boards);
  const board = boards[route.params?.board];
  const RenderedClasses = [];
  
  var col = true;
  for (const key in board.class) {
    const _class = board.class[key];
    RenderedClasses.push(
      <SClass key={key} name={"Class "+_class} board={route.params?.board} sclass={_class} color={col ? theme.class_alter1 : theme.class_alter2}/>
    );
    col = !col;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_study}>Study</Text>
        <Text style={styles.header_class}>{route.params?.board}</Text>
      </View>

      <View style={styles.classes}>
        {RenderedClasses}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header_study: {
    color: theme.white,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  header_class: {
    color: theme.white,
    textAlignVertical: 'center',
    fontSize: 20,
    marginBottom: 30,
  },

  classes: {
    backgroundColor: theme.primary,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  sclass: {
    backgroundColor: theme.secondary,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  className: {
    color: "#000",
    opacity: 0.7,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default Classes;
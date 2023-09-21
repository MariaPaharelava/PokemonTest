import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Text, Button} from 'react-native-paper';

import {Pokemon} from './Pokemon';
import {useApp} from './App.hook';
import {Modal} from './Modal';

function App(): JSX.Element {
  const {
    usersPokemon,
    opponentsPokemon,
    usersHit,
    opponentsHit,
    onButtonPress,
    visible,
    hideModal,
    onContinuePress,
    onReceivePress,
  } = useApp();

  return (
    <View style={styles.base}>
      <Appbar.Header>
        <Appbar.Content title="Pokemon battle" />
      </Appbar.Header>
      <View style={styles.battleField}>
        <Pokemon data={usersPokemon} role="user" style={styles.usersPokemon} />
        <Pokemon
          data={opponentsPokemon}
          role="opponent"
          style={styles.opponentsPokemon}
        />
      </View>
      <View style={styles.bottomInfo}>
        <Text variant="titleMedium">{`You hit for ${usersHit}`}</Text>
        <Text variant="titleMedium">{`Your opponent hit for ${opponentsHit}`}</Text>
        <Button mode="contained" onPress={onButtonPress} style={styles.button}>
          Attack
        </Button>
      </View>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        wins={usersPokemon.wins}
        losses={usersPokemon.losses}
        isWin={opponentsPokemon.health === 0}
        onContinuePress={onContinuePress}
        onReceivePress={onReceivePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: '100%',
  },
  usersPokemon: {
    alignSelf: 'flex-start',
  },
  opponentsPokemon: {
    alignSelf: 'flex-end',
  },
  battleField: {
    marginHorizontal: 10,
    marginTop: '10%',
  },
  bottomInfo: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});

export default App;

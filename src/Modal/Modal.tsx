import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Modal as ModalView} from 'react-native-paper';

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onContinuePress: () => void;
  wins: number;
  losses: number;
  isWin: boolean;
  onReceivePress: () => void;
};

export function Modal({
  visible,
  onDismiss,
  wins,
  losses,
  isWin,
  onContinuePress: onContinuePressProp,
  onReceivePress: onReceivePressProp,
}: ModalProps): JSX.Element {
  const onReceivePress = (): void => {
    onReceivePressProp();
    onDismiss();
  };

  const onContinuePress = (): void => {
    onDismiss();
    onContinuePressProp();
  };

  return (
    <ModalView visible={visible} contentContainerStyle={styles.modalContainer}>
      <Text variant="titleSmall">Game Over</Text>
      {isWin ? (
        <Text variant="displaySmall">You Win</Text>
      ) : (
        <Text variant="displaySmall">You Lose</Text>
      )}
      <View style={styles.infoContainer}>
        <Text variant="labelSmall">{`wins ${wins}`}</Text>
        <Text variant="labelSmall">{`losses ${losses}`}</Text>
      </View>
      <Button
        mode="contained-tonal"
        onPress={onReceivePress}
        style={styles.receiveButton}>
        Receive a new Pokémon
      </Button>
      <Button
        mode="contained"
        onPress={onContinuePress}
        style={styles.continueButton}>
        Continue
      </Button>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  continueButton: {
    marginTop: 8,
  },
  receiveButton: {
    marginTop: 8,
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
});

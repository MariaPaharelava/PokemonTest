import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {ProgressBar, MD3Colors, Text} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';

import {Pokemon as PokemonType} from '../types';

type PokemonProps = {
  data: PokemonType;
  role: 'user' | 'opponent';
  style: StyleProp<ViewStyle>;
};

export function Pokemon({data, role, style}: PokemonProps): JSX.Element {
  const {img, name, health} = data;

  return (
    <View style={[styles.base, style]}>
      <Text variant="headlineSmall">{role}</Text>
      <Text variant="titleMedium">{name}</Text>
      <View style={styles.progressBar}>
        <ProgressBar
          progress={health / 100}
          color={MD3Colors.error50}
          style={styles.progressBarBar}
        />
        <Text variant="labelSmall" style={styles.progressBarText}>
          {`${health} / 100`}
        </Text>
      </View>
      <SvgUri style={styles.image} uri={img} width="100" height="100" />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressBarText: {
    paddingLeft: 8,
  },
  image: {
    marginTop: 10,
  },
  progressBarBar: {
    height: 5,
    width: 70,
  },
});

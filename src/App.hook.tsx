import {useEffect, useState} from 'react';

import {Pokemon as PokemonType} from './types';
import {random, calculateHits} from './utils';
import {fetchData} from './api';

export function useApp() {
  const [usersPokemon, setUsersPokemon] = useState<PokemonType>({
    name: '',
    img: '',
    health: 0,
    wins: 0,
    losses: 0,
  });
  const [opponentsPokemon, setOpponentsPokemon] = useState<PokemonType>({
    name: '',
    img: '',
    health: 0,
    wins: 0,
    losses: 0,
  });
  const [usersHit, setUsersHit] = useState<number>(0);
  const [opponentsHit, setOpponentsHit] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    fetchData(setUsersPokemon);
    fetchData(setOpponentsPokemon);
  }, []);

  const onButtonPress = (): void => {
    const newUsersHit = calculateHits(0, random(6));
    const newOpponentsHit = calculateHits(0, random(6));

    setUsersHit(newUsersHit);
    setOpponentsHit(newOpponentsHit);

    const newUsersHealth =
      newOpponentsHit < usersPokemon.health
        ? usersPokemon.health - newOpponentsHit
        : 0;
    const newOpponentsHealth =
      newUsersHit < opponentsPokemon.health
        ? opponentsPokemon.health - newUsersHit
        : 0;

    if (newUsersHealth > 0 && newOpponentsHealth > 0) {
      setUsersPokemon({
        ...usersPokemon,
        health: newUsersHealth,
      });
      setOpponentsPokemon({
        ...opponentsPokemon,
        health: newOpponentsHealth,
      });
    } else {
      setUsersPokemon({
        ...usersPokemon,
        health: newUsersHealth,
        wins:
          newOpponentsHealth === 0 ? ++usersPokemon.wins : usersPokemon.wins,
        losses:
          newUsersHealth === 0 ? ++usersPokemon.losses : usersPokemon.losses,
      });
      setOpponentsPokemon({
        ...opponentsPokemon,
        health: newOpponentsHealth,
      });
      showModal();
    }
  };

  const onContinuePress = () => {
    setUsersPokemon({
      ...usersPokemon,
      health: 100,
    });
    fetchData(setOpponentsPokemon);
    setOpponentsHit(0);
    setUsersHit(0);
  };

  const onReceivePress = () => {
    fetchData(setUsersPokemon);
    fetchData(setOpponentsPokemon);
    setOpponentsHit(0);
    setUsersHit(0);
  };

  return {
    onButtonPress,
    usersHit,
    opponentsHit,
    usersPokemon,
    opponentsPokemon,
    visible,
    hideModal,
    onContinuePress,
    onReceivePress,
  };
}

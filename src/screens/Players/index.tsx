import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { PlayerCard } from '@components/PlayerCard';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { AppError } from '@utils/AppError';
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    const newPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New person', error.message)
      } else {
        Alert.alert('New person', 'Unable to add')
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('People', 'It was not possible to load the filtered people of the selected team.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam()

    } catch (error) {
      console.log(error);

      Alert.alert('Remove Person', 'Unable to remove this person');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remove Group', 'Unable to remove this group');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remove',
      'Do you want to remove this group?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => groupRemove() }
      ]
    )
  }


  useEffect(() => {
    fetchPlayersByTeam();
  }, [team, group])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="add everyone and split the teams"
      />

      <Form>
        <Input
          inputRef={newPlayerInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Person name"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> :
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => handlePlayerRemove(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="There are no person on this team." />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 }
            ]}
          />
      }

      <Button
        title='Remove Group'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />

    </Container>
  )
}
import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Container, Content, Icon } from './styles';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleAddNewGroup() {
    try {
      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('New Group', error.message);
      } else {
        Alert.alert('New Group', 'Unable to create a new group');
        console.error(error)
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title='New group'
          subtitle='create a group to add people'
        />

        <Input
          placeholder='Group name'
          onChangeText={setGroup}
        />

        <Button
          title='Create'
          style={{ marginTop: 20 }}
          onPress={handleAddNewGroup}
        />
      </Content>

    </Container>
  );
}
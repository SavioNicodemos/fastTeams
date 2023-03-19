import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { Container } from './styles'

export const Groups: React.FC = () => {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Galera do bem']);

  return (
    <Container>
      <Header />
      <Highlight 
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
       <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
      />
    </Container>
  );
}

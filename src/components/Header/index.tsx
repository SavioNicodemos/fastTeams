import React from 'react';

import { Container, Logo } from './styles';

import logoImg from '@assets/logo.png'

export const Header: React.FC = () => {
  return (
    <Container>
      <Logo source={logoImg} />
    </Container>
  );
}
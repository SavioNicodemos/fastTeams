import { BackIcon, Container, Logo, BackButton } from './styles';

import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean;
}

export const Header: React.FC<Props> = ({ showBackButton = false }: Props) => {
  return (
    <Container>
      {showBackButton &&
        <BackButton>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  );
}
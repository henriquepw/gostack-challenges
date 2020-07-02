import React from 'react';

import { Container, NavItem } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const navItems = [
  {
    to: '/',
    name: 'Listagem',
  },
  {
    to: '/import',
    name: 'Importar',
  },
];

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        {navItems.map((item) => (
          <NavItem
            to={item.to}
            key={`nav_${item.to}_${item.name}`}
            selected={item.to === window.location.pathname}
          >
            {item.name}
          </NavItem>
        ))}
      </nav>
    </header>
  </Container>
);

export default Header;

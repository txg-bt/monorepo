import styled from 'styled-components';
import { Flex } from 'rebass';

const Container = styled(Flex).attrs(({ theme }) => ({
  backgroundColor: theme.mainColor,
  color: theme.textColor05,
  alignItems: 'center',
  justifyContent: 'space-between',
  px: '10%',
  py: theme.spacing03,
}))`
  top: 0;
  left: 0;
  right: 0;
`;

const Image = styled.img`
  height: ${({ theme }) => theme.iconSize02};
  margin-left: ${({ theme }) => theme.spacing04};
  filter: brightness(0) invert(1);

  &:hover {
    cursor: pointer;
  }
`;

export { Container, Image };

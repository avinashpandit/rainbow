import React, { createElement } from 'react';
import styled from 'styled-components/primitives';
import { useAccountSettings, useCoinListEdited } from '../../hooks';
import { CoinIcon, CoinIconSize } from '../coin-icon';
import { Column, Row } from '../layout';
import { padding } from '@rainbow-me/styles';

const CoinRowPaddingTop = 9;
const CoinRowPaddingBottom = 10;
export const CoinRowHeight =
  CoinIconSize + CoinRowPaddingTop + CoinRowPaddingBottom;

const Container = styled(Row).attrs({
  align: 'center',
  grow: 0,
  shrink: 1,
})`
  ${padding(CoinRowPaddingTop, 19, CoinRowPaddingBottom)};
  width: 100%;
`;

const Content = styled(Column).attrs({ justify: 'space-between' })`
  flex: 1;
  height: ${CoinIconSize};
  margin-left: 10;
  opacity: ${({ isHidden }) => (isHidden ? 0.4 : 1)};
`;

export default function CoinRow({
  address,
  bottomRowRender,
  children,
  coinIconRender = CoinIcon,
  containerStyles,
  contentStyles,
  isHidden,
  isPinned,
  symbol,
  testID,
  topRowRender,
  ...props
}) {
  const accountSettings = useAccountSettings();
  const { isCoinListEdited } = useCoinListEdited();
  return (
    <Container css={containerStyles}>
      {createElement(coinIconRender, {
        address,
        isCoinListEdited,
        isHidden,
        isPinned,
        symbol,
        ...accountSettings,
        ...props,
      })}
      <Content isHidden={isHidden} justify="center" style={contentStyles}>
        <Row align="center" testID={`${testID}-${symbol || ''}`}>
          {topRowRender({ symbol, ...accountSettings, ...props })}
        </Row>
        <Row align="center" marginBottom={0.5}>
          {bottomRowRender({ symbol, ...accountSettings, ...props })}
        </Row>
      </Content>
      {typeof children === 'function'
        ? children({ symbol, ...props })
        : children}
    </Container>
  );
}

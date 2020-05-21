import lang from 'i18n-js';
import { times } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import stylePropType from 'react-style-proptype';
import { position } from '../../styles';
import AddFundsInterstitial from '../AddFundsInterstitial';
import { FabWrapper } from '../fab';
import { Centered, Column } from '../layout';
import AssetListHeader from './AssetListHeader';
import AssetListItemSkeleton from './AssetListItemSkeleton';

const InterstitialOffset = AssetListHeader.height + FabWrapper.bottomPosition;

const EmptyAssetList = ({
  descendingOpacity,
  hideHeader,
  isWalletEthZero,
  network,
  skeletonCount,
  style,
  ...props
}) => (
  <Column {...props} style={[position.sizeAsObject('100%'), style]}>
    {hideHeader && <AssetListHeader title={lang.t('account.tab_balances')} />}
    <Centered flex={1}>
      <Column style={position.coverAsObject}>
        {times(skeletonCount, index => (
          <AssetListItemSkeleton
            animated={!isWalletEthZero}
            descendingOpacity={descendingOpacity || isWalletEthZero}
            index={index}
            key={`skeleton${index}`}
          />
        ))}
      </Column>
      {isWalletEthZero && (
        <AddFundsInterstitial
          offsetY={InterstitialOffset * -1}
          network={network}
        />
      )}
    </Centered>
  </Column>
);

EmptyAssetList.propTypes = {
  descendingOpacity: PropTypes.bool,
  hideHeader: PropTypes.bool,
  isWalletEthZero: PropTypes.bool,
  skeletonCount: PropTypes.number,
  style: stylePropType,
};

EmptyAssetList.defaultProps = {
  skeletonCount: 5,
};

export default React.memo(EmptyAssetList);

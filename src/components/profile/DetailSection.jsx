import React from 'react';
import PropTypes from 'prop-types';
import WalletDetails from './WalletDetails';
import MyRewardsDetails from './MyRewardsDetails';
import MyOrdersDetails from './MyOrdersDetails';
import AddressesDetails from './AddressesDetails';
import PaymentMethodsDetails from './PaymentMethodsDetails';
import SocialNetworksDetails from './SocialNetworksDetails';
import ProfileDetails from './ProfileDetails';
import Admin from './Admin';
import AddProduct from './AddProduct';

const DetailSection = ({ activeNavItem }) => {
  let detailContent;

  switch (activeNavItem) {
    case 'Wallet':
      detailContent = <WalletDetails />
      break;
    case 'My Rewards':
      detailContent = <MyRewardsDetails />
      break;
    case 'My Orders':
      detailContent = <MyOrdersDetails />
      break;
    case 'Addresses':
      detailContent = <AddressesDetails />
      break;
    case 'Payment Methods':
      detailContent = <PaymentMethodsDetails />
      break;
    case 'Social Networks':
      detailContent = <SocialNetworksDetails />
      break;
    case 'Admin':
      detailContent = <Admin />
      break;
    case 'Add Product':
      detailContent = <AddProduct />
      break;
    default:
      detailContent = <ProfileDetails />
  }

  return (
    <div className="flex-1 h-full p-4 shadow-sm">
      {detailContent}
    </div>
  );
}

DetailSection.propTypes = {
  activeNavItem: PropTypes.string.isRequired,
}

export default DetailSection;

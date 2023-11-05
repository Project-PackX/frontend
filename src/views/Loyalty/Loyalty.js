import React from 'react';
import { useAuth } from '../../context/auth';
import './loyalty.css';
import { NoPermission } from '../../components/Slave/NoPermission/NoPermission';

import RegularSvg from '../../assets/logos/regular.svg';
import BaronSvg from '../../assets/logos/baron.svg';
import PrinceSvg from '../../assets/logos/prince.svg';
import KingSvg from '../../assets/logos/king.svg';

export const Loyalty = () => {
  const { isLoggedIn } = useAuth();
  const currentOrderNumber = localStorage.getItem('historyCount');
  const loyaltyState = getLoyaltyState(currentOrderNumber);
  const nextTier = getNextTier(currentOrderNumber);

  function getLoyaltyState(currentOrderNumber) {
    if (currentOrderNumber >= 7) {
      return 'King';
    } else if (currentOrderNumber >= 5) {
      return 'Prince';
    } else if (currentOrderNumber >= 3) {
      return 'Baron';
    } else {
      return 'Regular';
    }
  }

  function getNextTier(currentOrderNumber) {
    if (currentOrderNumber >= 7) {
      return 'You have reached the highest tier.';
    } else if (currentOrderNumber >= 5) {
      return 'King';
    } else if (currentOrderNumber >= 3) {
      return 'Prince';
    } else {
      return 'Baron';
    }
  }

  const getSvgForLoyaltyLevel = (level) => {
    const svgMap = {
      'Regular': RegularSvg,
      'Baron': BaronSvg,
      'Prince': PrinceSvg,
      'King': KingSvg,
    };
    return svgMap[level];
  };

  const getStateMinOrder = (level) => {
    const minMap = {
      'Baron': 3,
      'Prince': 5,
      'King': 7,
    };
    return minMap[level];
  };

  const getLoyaltyPercentage = (level) => {
    const percentageMap = {
      'Regular': 0,
      'Baron': 5,
      'Prince': 7.5,
      'King': 10,
    };
    return percentageMap[level];
  };

  if (!isLoggedIn) {
    return <NoPermission />;
  }

  const loyaltyDetails = (
    <div className="loyalty-details container">
      <h2>Loyalty Status: {loyaltyState}</h2>
      <div className="loyalty-logo">
        <img
          src={getSvgForLoyaltyLevel(loyaltyState)}
          alt={loyaltyState}
          className="loyalty-image"
        />
      </div>
      <p>
        {nextTier === 'You have reached the highest tier.'
          ? nextTier
          : `You are ${getStateMinOrder(nextTier) - currentOrderNumber} orders away from becoming a ${nextTier}.`}
      </p>

        {loyaltyState !== 'Regular' && (
        <p>
          Current tier benefit: {getLoyaltyPercentage(loyaltyState)}% discount on all orders
        </p>
      )}
    </div>
  );

  return loyaltyDetails;
};

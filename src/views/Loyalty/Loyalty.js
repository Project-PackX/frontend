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

  function getLoyaltyState(n) {
    if (n >= 7) return 'King';
    if (n >= 5) return 'Prince';
    if (n >= 3) return 'Baron';
    return 'Regular';
  }

  function getNextTier(n) {
    if (n >= 7) return 'You have reached the highest tier.';
    if (n >= 5) return 'King';
    if (n >= 3) return 'Prince';
    return 'Baron';
  }

  const getSvg = (level) => ({ Regular: RegularSvg, Baron: BaronSvg, Prince: PrinceSvg, King: KingSvg }[level]);

  const getStateMinOrder = (level) => ({ Baron: 3, Prince: 5, King: 7 }[level]);
  const getLoyaltyPercentage = (level) => ({ Regular: 0, Baron: 5, Prince: 7.5, King: 10 }[level]);

  if (!isLoggedIn) return <NoPermission />;

  return (
    <div className="loyalty-details container">
      <h2>Loyalty Status: {loyaltyState}</h2>
      <div className="loyalty-logo">
        <img src={getSvg(loyaltyState)} alt={loyaltyState} className="loyalty-image" />
      </div>
      <p>
        {nextTier === 'You have reached the highest tier.'
          ? nextTier
          : `You are ${getStateMinOrder(nextTier) - currentOrderNumber} order(s) away from becoming a ${nextTier}.`}
      </p>
      {loyaltyState !== 'Regular' && <p>Current tier benefit: {getLoyaltyPercentage(loyaltyState)}% discount on all orders</p>}
    </div>
  );
};
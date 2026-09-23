/* ==========================================================================
   HOGWARTS WIZARDING OFFERS & PROMO CODES ARCHITECTURE
   ========================================================================== */

export const INITIAL_OFFERS = [
  {
    id: 'off-1',
    code: 'ALOHOMORA50',
    title: '50% OFF WIZARDING WELCOME',
    description: '50% discount up to ⚡ 500 Galleons on any magical class or Great Hall banquet.',
    discountType: 'PERCENT',
    discountValue: 50,
    maxDiscount: 500,
    minSpend: 1000,
    applicableCategory: 'ALL',
    status: 'ACTIVE',
    expiryDate: '2026-12-31',
    usageCount: 142,
    usageLimit: 1000,
    eligibleTiers: ['ALL'],
    tag: 'WELCOME'
  },
  {
    id: 'off-2',
    code: 'QUIDDITCH500',
    title: '⚡ 500 GALLEONS ARENA PASS',
    description: 'Flat ⚡ 500 off on Quidditch Stadium & Dueling Club slots.',
    discountType: 'FLAT',
    discountValue: 500,
    maxDiscount: 500,
    minSpend: 1500,
    applicableCategory: 'TURF_VR',
    status: 'ACTIVE',
    expiryDate: '2026-10-31',
    usageCount: 88,
    usageLimit: 500,
    eligibleTiers: ['ALL'],
    tag: 'POPULAR'
  },
  {
    id: 'off-3',
    code: 'BUTTERBEER20',
    title: '20% GREAT HALL FEAST SAVINGS',
    description: '20% off on all foaming Butterbeer mugs, Pumpkin Pasties, and Roast Pheasant.',
    discountType: 'PERCENT',
    discountValue: 20,
    maxDiscount: 300,
    minSpend: 400,
    applicableCategory: 'CAFE',
    status: 'ACTIVE',
    expiryDate: '2026-11-15',
    usageCount: 215,
    usageLimit: 2000,
    eligibleTiers: ['ALL'],
    tag: 'GREAT HALL FEAST'
  },
  {
    id: 'off-4',
    code: 'FELIXLUCK',
    title: '⚡ 400 POTIONS & SAUNA CREDIT',
    description: 'Flat ⚡ 400 off on Dragon Fire Sauna and Alchemy Masterclasses.',
    discountType: 'FLAT',
    discountValue: 400,
    maxDiscount: 400,
    minSpend: 1200,
    applicableCategory: 'WELLNESS',
    status: 'ACTIVE',
    expiryDate: '2026-10-15',
    usageCount: 64,
    usageLimit: 300,
    eligibleTiers: ['PRO', 'ELITE'],
    tag: 'POTIONS'
  }
];

export function validateOfferOrVoucher(code, subtotal, redeemedRewards = [], offersList = INITIAL_OFFERS) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, error: 'Please enter a promo or voucher code.' };
  }

  const matchingVoucher = (redeemedRewards || []).find(r => r.rewardCode?.toUpperCase() === cleanCode);
  if (matchingVoucher) {
    if (matchingVoucher.status === 'USED') {
      return { valid: false, error: 'This magical voucher has already been redeemed.' };
    }
    const discountVal = matchingVoucher.pointsUsed >= 1000 ? 500 : (matchingVoucher.pointsUsed >= 500 ? 250 : 100);
    const calculatedDiscount = Math.min(subtotal, discountVal);
    return {
      valid: true,
      code: cleanCode,
      title: matchingVoucher.rewardTitle || 'Hogwarts Vault Voucher',
      discountAmount: calculatedDiscount,
      isRewardVoucher: true,
      voucherId: matchingVoucher.id
    };
  }

  const offer = offersList.find(o => o.code.toUpperCase() === cleanCode);
  if (!offer) {
    return { valid: false, error: 'Invalid magical promo code. Please check your parchment code.' };
  }

  if (offer.status === 'EXPIRED') {
    return { valid: false, error: 'This spell voucher has expired.' };
  }

  if (offer.usageCount >= offer.usageLimit) {
    return { valid: false, error: 'This promotional scroll has reached its maximum redemption limit.' };
  }

  if (subtotal < offer.minSpend) {
    return { 
      valid: false, 
      error: `Minimum order requirement not met. Required minimum: ⚡ ${offer.minSpend.toLocaleString()}` 
    };
  }

  let discountAmount = 0;
  if (offer.discountType === 'PERCENT') {
    discountAmount = Math.min(offer.maxDiscount, Math.round(subtotal * (offer.discountValue / 100)));
  } else {
    discountAmount = Math.min(subtotal, offer.discountValue);
  }

  return {
    valid: true,
    code: offer.code,
    title: offer.title,
    discountAmount,
    isRewardVoucher: false,
    offerId: offer.id
  };
}

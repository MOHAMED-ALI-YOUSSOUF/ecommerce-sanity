import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes';
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';
import React from 'react';

const BlackFridayBanner = async () => {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);
 
  // Si aucune vente active n'est trouvée, ne pas afficher la bannière
  if (!sale?.isActive) {
    return null;
  }

  // Affichage de la bannière
  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-6 mt-3  rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          {/* Titre de la promotion */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
            {sale.title || 'Limited Time Offer'}
          </h2>

          {/* Description de la promotion */}
          <p className="text-xl sm:text-3xl font-semibold text-left">
            {sale.description || 'Get amazing discounts for Black Friday!'}
          </p>

          {/* Code de réduction */}
          <div className="flex mt-4">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold text-base sm:text-xl">
                Use code:{' '}
                <span className="text-red-600">{sale.couponCode || 'BFRIDAY'}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                for {sale.discountAmount || 0}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner;

'use client';

import { Tag, Pizza, Wine, Cake, Sparkles } from 'lucide-react';

export default function MenuPromotion() {
  return (
    <section className="py-12 bg-gradient-to-br from-[#c72027] to-[#a01a20]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#fef08a] p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 text-[#c72027]" />
                <h2 className="text-3xl md:text-4xl font-black text-[#c72027]">
                  Offre Menu -10%
                </h2>
                <Sparkles className="w-8 h-8 text-[#c72027]" />
              </div>
              <p className="text-stone-700 text-lg font-semibold">
                Composez votre menu et économisez !
              </p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="bg-[#c72027] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Pizza className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-1">1 Pizza</h3>
                  <p className="text-sm text-stone-600">Au choix</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Wine className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-1">1 Boisson</h3>
                  <p className="text-sm text-green-600 font-bold">Sans alcool uniquement</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Cake className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-1">1 Dessert</h3>
                  <p className="text-sm text-stone-600">Au choix</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#fef08a] to-[#fde047] rounded-xl p-6 text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Tag className="w-6 h-6 text-[#c72027]" />
                  <p className="text-2xl font-black text-[#c72027]">
                    = -10% sur le menu
                  </p>
                  <Tag className="w-6 h-6 text-[#c72027]" />
                </div>
                <p className="text-sm text-stone-700 font-semibold">
                  La réduction est calculée automatiquement à l'ajout au panier
                </p>
              </div>
              
              <div className="bg-stone-50 rounded-lg p-4 border-l-4 border-[#c72027]">
                <p className="text-sm text-stone-700">
                  <span className="font-bold text-[#c72027]">⚠️ Important :</span> Les boissons avec alcool ne peuvent pas faire partie d'un menu promotionnel. La réduction s'applique uniquement sur les menus, pas sur l'ensemble de la commande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

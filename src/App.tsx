/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { MENU_ITEMS } from './data/cafeData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { MenuPhotosSection } from './components/MenuPhotosSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { OrderDrawer } from './components/OrderDrawer';
import { MenuPhotoViewerModal } from './components/MenuPhotoViewerModal';

export default function App() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setReserveOpen(false);
        setOrderOpen(false);
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { cartCount, cartSubtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const item of MENU_ITEMS) {
      const qty = cart[item.id] || 0;
      if (qty > 0) {
        count += qty;
        subtotal += item.price * qty;
      }
    }
    return { cartCount: count, cartSubtotal: subtotal };
  }, [cart]);

  const handleAddToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[itemId] || 0) + delta;
      if (nextQty <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: nextQty };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handleHeroOrderOnline = () => {
    if (cartCount > 0) {
      setOrderOpen(true);
    } else {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setOrderOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#151513] flex flex-col">
      <Header onOpenReserve={() => setReserveOpen(true)} />

      <main className="flex-1">
        <HeroSection
          onOpenReserve={() => setReserveOpen(true)}
          onOrderOnline={handleHeroOrderOnline}
          cartCount={cartCount}
        />

        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
          onOpenCart={() => setOrderOpen(true)}
          onOpenPhotoViewer={(idx) => setActivePhotoIndex(idx)}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
        />

        <MenuPhotosSection
          onOpenPhotoViewer={(idx) => setActivePhotoIndex(idx)}
        />

        <ReviewsSection />

        <LocationSection onOpenReserve={() => setReserveOpen(true)} />
      </main>

      <Footer
        onOpenReserve={() => setReserveOpen(true)}
        onOpenOrder={() => setOrderOpen(true)}
      />

      <ReservationModal
        isOpen={reserveOpen}
        onClose={() => setReserveOpen(false)}
      />

      <OrderDrawer
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />

      <MenuPhotoViewerModal
        activePhotoIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onChangePhoto={(idx) => setActivePhotoIndex(idx)}
        cart={cart}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

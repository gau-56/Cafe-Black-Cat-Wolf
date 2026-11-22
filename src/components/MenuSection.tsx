import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Images } from 'lucide-react';
import {
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
} from '../data/cafeData';
import { ResilientImage } from './ResilientImage';

interface MenuSectionProps {
  cart: Record<string, number>;
  onAddToCart: (itemId: string) => void;
  onUpdateQty: (itemId: string, delta: number) => void;
  onOpenCart: () => void;
  onOpenPhotoViewer: (photoIndex: number) => void;
  cartCount: number;
  cartSubtotal: number;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Coffee & Matcha',
  'Breakfast & Toasts',
  'Savory Plates',
  'Desserts',
];

export function MenuSection({
  cart,
  onAddToCart,
  onUpdateQty,
  onOpenCart,
  onOpenPhotoViewer,
  cartCount,
  cartSubtotal,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');

  const filteredItems =
    activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const featuredCards = filteredItems.slice(0, 6);

  const renderActionControl = (item: MenuItem) => {
    const qty = cart[item.id] || 0;
    if (qty === 0) {
      return (
        <button
          type="button"
          onClick={() => onAddToCart(item.id)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-[#151513] bg-[#F7F6F3] hover:bg-[#151513] hover:text-white border border-[#E5E2DA] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Add</span>
        </button>
      );
    }

    return (
      <div className="inline-flex items-center border border-[#28513E] bg-[#28513E] text-white rounded-lg overflow-hidden shrink-0">
        <button
          type="button"
          onClick={() => onUpdateQty(item.id, -1)}
          aria-label={`Decrease quantity of ${item.name}`}
          className="w-9 h-9 flex items-center justify-center hover:bg-[#1E3F30] transition-colors cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="px-2 text-xs font-semibold tabular-nums min-w-[24px] text-center">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => onUpdateQty(item.id, 1)}
          aria-label={`Increase quantity of ${item.name}`}
          className="w-9 h-9 flex items-center justify-center hover:bg-[#1E3F30] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <section
      id="menu"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#E5E2DA]"
    >
      {/* Section Header & Utility Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-medium text-[#28513E] mb-2">
            Menu Highlights · ₹200–1,000 per person
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#151513]">
            Crafted Coffee, All-Day Breakfast &amp; Kitchen Plates
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenPhotoViewer(1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] text-sm font-medium text-[#151513] bg-white hover:bg-[#EBE8E1] border border-[#E5E2DA] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Images className="w-4 h-4 text-[#28513E]" aria-hidden="true" />
            <span>View the menu (16 photos)</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] text-sm font-semibold text-white bg-[#151513] hover:bg-[#28513E] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>
              Order Bag ({cartCount})
              {cartSubtotal > 0 ? ` · ₹${cartSubtotal.toLocaleString('en-IN')}` : ''}
            </span>
          </button>
        </div>
      </div>

      {/* Category Segmented Controls */}
      <div
        role="tablist"
        aria-label="Filter menu by category"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 min-h-[40px] text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#151513] text-white'
                  : 'bg-white text-[#57554F] border border-[#E5E2DA] hover:text-[#151513] hover:bg-[#EBE8E1]/50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 3-Column Visual Dish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {featuredCards.map((item) => (
          <article
            key={item.id}
            className="group bg-white border border-[#E5E2DA] rounded-2xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EBE8E1]">
              <ResilientImage
                src={item.image}
                alt={item.name}
                fallbackLabel={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#57554F] mb-1.5">
                  <span>{item.category}</span>
                  {item.highlightNote && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#28513E] font-medium">
                        {item.highlightNote}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold text-[#151513] mb-2">
                  {item.name}
                </h3>

                <p className="text-sm text-[#57554F] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between gap-3">
                <span className="text-base font-semibold text-[#151513] tabular-nums">
                  ₹{item.price}
                </span>
                {renderActionControl(item)}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Complete 14-Item Menu Highlights Ledger */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-[#E5E2DA]">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#151513]">
              Complete Menu Highlights
            </h3>
            <p className="text-sm text-[#57554F] mt-1">
              All {filteredItems.length} curated favorites shown
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''} — ready to add for pickup or table order.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenPhotoViewer(1)}
            className="text-sm font-medium text-[#28513E] hover:underline underline-offset-4 cursor-pointer text-left sm:text-right shrink-0"
          >
            Browse Menu Photos 1–16
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 divide-y divide-[#E5E2DA] lg:divide-y-0">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="py-4 lg:border-b lg:border-[#E5E2DA] flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h4 className="text-base font-semibold text-[#151513]">
                    {item.name}
                  </h4>
                  <span className="text-xs text-[#57554F]">{item.category}</span>
                </div>
                <p className="text-sm text-[#57554F] mt-1 line-clamp-2">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenPhotoViewer(item.menuPhotoIndex)}
                  className="mt-1.5 text-xs font-medium text-[#28513E] hover:underline underline-offset-2 cursor-pointer"
                >
                  Open Menu Photo {item.menuPhotoIndex}
                </button>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-[#151513] tabular-nums">
                  ₹{item.price}
                </span>
                {renderActionControl(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

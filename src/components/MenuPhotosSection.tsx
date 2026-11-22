import { Images, ArrowUpRight } from 'lucide-react';
import { MENU_PHOTO_PAGES, IMAGES } from '../data/cafeData';
import { ResilientImage } from './ResilientImage';

interface MenuPhotosSectionProps {
  onOpenPhotoViewer: (photoIndex: number) => void;
}

const FEATURED_GALLERY = [
  {
    photoIndex: 1,
    image: IMAGES.coffeeMatcha,
    title: 'Pistachio Latte, Flat White & Iced Matcha',
    caption: 'Menu Photos 1–2 · Specialty Espresso & Matcha Bar',
  },
  {
    photoIndex: 3,
    image: IMAGES.breakfastColdBrew,
    title: 'Avocado Toast, Sandwich & Vietnamese Cold Brew',
    caption: 'Menu Photos 3–5 · Morning & Brunch Plates',
  },
  {
    photoIndex: 9,
    image: IMAGES.savoryPizzaPasta,
    title: 'Mushroom Burrata Pizza, Pesto Pasta & Hand Cut Fries',
    caption: 'Menu Photos 6–10 · Wood-Fired & Shareables',
  },
  {
    photoIndex: 14,
    image: IMAGES.bakeryDesserts,
    title: 'Burnt Basque Cheesecake, Chocolaty French Toast & Souffle',
    caption: 'Menu Photos 13–15 · Handcrafted Bakery & Desserts',
  },
];

export function MenuPhotosSection({ onOpenPhotoViewer }: MenuPhotosSectionProps) {
  return (
    <section
      id="photos"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#E5E2DA]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-medium text-[#28513E] mb-2">
            Inside the Cafe &amp; Full Menu Pages
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#151513]">
            Menu Photos &amp; Table Spreads
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onOpenPhotoViewer(1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] text-sm font-medium text-[#151513] bg-white hover:bg-[#EBE8E1] border border-[#E5E2DA] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Images className="w-4 h-4 text-[#28513E]" aria-hidden="true" />
          <span>Open full 16-photo viewer</span>
        </button>
      </div>

      {/* 4-Card Editorial Photo Spread */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {FEATURED_GALLERY.map((item) => (
          <button
            key={item.photoIndex}
            type="button"
            onClick={() => onOpenPhotoViewer(item.photoIndex)}
            className="group text-left bg-white border border-[#E5E2DA] rounded-2xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer flex flex-col"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EBE8E1]">
              <ResilientImage
                src={item.image}
                alt={item.title}
                fallbackLabel={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between gap-2">
              <p className="text-xs text-[#57554F]">{item.caption}</p>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-[#151513] leading-snug">
                  {item.title}
                </h3>
                <ArrowUpRight
                  className="w-4 h-4 text-[#57554F] group-hover:text-[#28513E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 16-Photo Menu Index Grid (Menu Photo 1 – Menu Photo 16) */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-display text-xl font-semibold text-[#151513]">
              View the Menu — Photo Index (1 to 16)
            </h3>
            <p className="text-sm text-[#57554F] mt-0.5">
              Select any menu page below to preview dishes and add items directly to your order.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {MENU_PHOTO_PAGES.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => onOpenPhotoViewer(page.id)}
              className="group p-3 text-left bg-[#F7F6F3] hover:bg-[#151513] hover:text-white border border-[#E5E2DA] rounded-xl transition-colors duration-150 cursor-pointer min-h-[72px] flex flex-col justify-between"
            >
              <span className="text-xs font-mono font-medium text-[#28513E] group-hover:text-[#A3C9B4] tabular-nums">
                #{String(page.id).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold leading-tight mt-1">
                Open Menu Photo {page.id}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

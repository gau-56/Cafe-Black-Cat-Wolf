import { ChevronLeft, ChevronRight, Plus, X, Check } from 'lucide-react';
import { MENU_ITEMS, MENU_PHOTO_PAGES } from '../data/cafeData';
import { ResilientImage } from './ResilientImage';

interface MenuPhotoViewerModalProps {
  activePhotoIndex: number | null;
  onClose: () => void;
  onChangePhoto: (index: number) => void;
  cart: Record<string, number>;
  onAddToCart: (itemId: string) => void;
}

export function MenuPhotoViewerModal({
  activePhotoIndex,
  onClose,
  onChangePhoto,
  cart,
  onAddToCart,
}: MenuPhotoViewerModalProps) {
  if (activePhotoIndex === null) return null;

  const page =
    MENU_PHOTO_PAGES.find((p) => p.id === activePhotoIndex) ||
    MENU_PHOTO_PAGES[0];

  const featuredItems = MENU_ITEMS.filter((item) =>
    page.featuredItemIds.includes(item.id)
  );

  const handlePrev = () => {
    const prev = page.id <= 1 ? MENU_PHOTO_PAGES.length : page.id - 1;
    onChangePhoto(prev);
  };

  const handleNext = () => {
    const next = page.id >= MENU_PHOTO_PAGES.length ? 1 : page.id + 1;
    onChangePhoto(next);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-photo-modal-title"
    >
      <div className="bg-[#F7F6F3] border border-[#E5E2DA] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E5E2DA] flex items-center justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="text-xs font-medium text-[#28513E] tabular-nums">
              {page.title} of {MENU_PHOTO_PAGES.length}
            </div>
            <h3
              id="menu-photo-modal-title"
              className="font-display text-lg sm:text-xl font-semibold text-[#151513]"
            >
              {page.sectionLabel}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous menu photo"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E2DA] bg-white hover:bg-[#EBE8E1] text-[#151513] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next menu photo"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E2DA] bg-white hover:bg-[#EBE8E1] text-[#151513] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu photo viewer"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E2DA] bg-[#151513] text-white hover:bg-[#28513E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Photo & Featured Dishes */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 rounded-xl overflow-hidden border border-[#E5E2DA] bg-[#EBE8E1] aspect-[4/3]">
            <ResilientImage
              src={page.image}
              alt={`${page.title} — ${page.sectionLabel}`}
              fallbackLabel={page.sectionLabel}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-sm text-[#57554F] mb-4">{page.subtitle}</p>
              <div className="text-xs font-semibold text-[#151513] uppercase tracking-wider mb-3">
                Dishes on this menu page
              </div>
              <div className="space-y-3">
                {featuredItems.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white border border-[#E5E2DA] rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#151513] truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#57554F] tabular-nums mt-0.5">
                          ₹{item.price}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddToCart(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 min-h-[36px] text-xs font-semibold rounded-lg bg-[#28513E] hover:bg-[#1E3F30] text-white transition-colors shrink-0 cursor-pointer"
                      >
                        {qty > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>In bag ({qty})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-[#57554F] pt-3 border-t border-[#E5E2DA]">
              Prices are inclusive of cafe service standards · Served daily till 12 AM.
            </div>
          </div>
        </div>

        {/* 1–16 Quick Page Selector Strip */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {MENU_PHOTO_PAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onChangePhoto(p.id)}
                className={`px-3 py-2 min-h-[36px] text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                  p.id === page.id
                    ? 'bg-[#151513] text-white'
                    : 'bg-white text-[#57554F] border border-[#E5E2DA] hover:text-[#151513]'
                }`}
              >
                Photo {p.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

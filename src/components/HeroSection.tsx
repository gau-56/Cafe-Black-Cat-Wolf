import { useState } from 'react';
import {
  Bookmark,
  Check,
  MapPin,
  Share2,
  Star,
  ShoppingBag,
  Calendar,
} from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenReserve: () => void;
  onOrderOnline: () => void;
  cartCount: number;
}

export function HeroSection({
  onOpenReserve,
  onOrderOnline,
  cartCount,
}: HeroSectionProps) {
  const [saved, setSaved] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `${CAFE_INFO.name} — ${CAFE_INFO.shortAddress}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: CAFE_INFO.description,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard copy if native share dismissed or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareTitle} (${shareUrl})`);
      setShareState('copied');
      window.setTimeout(() => setShareState('idle'), 2400);
    } catch {
      setShareState('copied');
      window.setTimeout(() => setShareState('idle'), 2400);
    }
  };

  return (
    <section
      id="overview"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      {/* 2-Column Editorial Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Story & Conversion Column */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-[#57554F] mb-5">
              <span className="text-[#28513E] font-semibold">{CAFE_INFO.status}</span>
              <span aria-hidden="true">·</span>
              <span>Closes {CAFE_INFO.closesAt}</span>
              <span aria-hidden="true">·</span>
              <span>{CAFE_INFO.category}</span>
              <span aria-hidden="true">·</span>
              <span>Pet-friendly</span>
            </div>

            <h1
              className="font-display font-semibold tracking-tight text-[#151513] leading-[1.06] mb-5"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                textWrap: 'balance',
              }}
            >
              Cafe Black Cat &amp; Wolf
            </h1>

            <p className="text-base sm:text-lg text-[#57554F] leading-relaxed max-w-xl mb-6">
              {CAFE_INFO.description}
            </p>

            <div className="flex items-start gap-2.5 text-sm text-[#151513] py-4 border-y border-[#E5E2DA] mb-7">
              <MapPin
                className="w-4 h-4 text-[#28513E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{CAFE_INFO.address}</span>
            </div>
          </div>

          {/* Primary CTAs + Google Action Row */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOrderOnline}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#28513E] hover:bg-[#1E3F30] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28513E]"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>
                  {cartCount > 0 ? `Order online (${cartCount})` : 'Order online'}
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenReserve}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-[#151513] bg-[#F7F6F3] hover:bg-[#EBE8E1] border border-[#E5E2DA] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28513E]"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Reserve a table</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1 text-sm font-medium text-[#57554F]">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#151513] py-2 transition-colors whitespace-nowrap shrink-0"
              >
                <MapPin className="w-4 h-4 text-[#28513E]" aria-hidden="true" />
                <span>Directions</span>
              </a>

              <button
                type="button"
                onClick={() => setSaved((prev) => !prev)}
                aria-pressed={saved}
                className="inline-flex items-center gap-1.5 hover:text-[#151513] py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    saved ? 'fill-[#28513E] text-[#28513E]' : 'text-[#57554F]'
                  }`}
                  aria-hidden="true"
                />
                <span className={saved ? 'text-[#28513E] font-semibold' : ''}>
                  {saved ? 'Saved to favorites' : 'Save'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 hover:text-[#151513] py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {shareState === 'copied' ? (
                  <>
                    <Check className="w-4 h-4 text-[#28513E]" aria-hidden="true" />
                    <span className="text-[#28513E] font-semibold">Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#57554F]" aria-hidden="true" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Full-Height Interior Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E5E2DA] bg-[#151513] min-h-[300px] sm:min-h-[380px]">
          <ResilientImage
            src={CAFE_INFO.heroImage}
            alt="Sunlit interior of Cafe Black Cat & Wolf in Pune with a sleeping black cat by the window, espresso bar, and calm pet-friendly seating"
            className="w-full h-full lg:h-full object-cover"
            fallbackLabel="Cafe Black Cat & Wolf — Law College Rd, Pune"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 sm:p-8 flex items-end justify-between gap-4">
            <div className="text-white">
              <p className="text-xs font-medium tracking-wide text-white/80 mb-1">
                Law College Rd · Deccan Gymkhana
              </p>
              <p className="font-display text-lg sm:text-xl font-medium">
                Specialty coffee, sourdough toasts &amp; calm pet-friendly tables
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Architectural Summary Strip */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-[#E5E2DA] rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-[#E5E2DA]">
        <a
          href="#reviews"
          className="p-5 sm:p-6 hover:bg-[#FAF9F6] transition-colors rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl"
        >
          <div className="text-xs font-medium text-[#57554F] mb-1">Google Rating</div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold text-[#151513] tabular-nums">
              {CAFE_INFO.rating}
            </span>
            <Star
              className="w-4 h-4 fill-[#D97706] text-[#D97706] self-center"
              aria-hidden="true"
            />
            <span className="text-sm text-[#57554F] tabular-nums">
              ({CAFE_INFO.reviewCount} reviews)
            </span>
          </div>
        </a>

        <div className="p-5 sm:p-6">
          <div className="text-xs font-medium text-[#57554F] mb-1">Price Range</div>
          <div className="font-display text-xl font-semibold text-[#151513] tabular-nums">
            {CAFE_INFO.pricePerPersonText}
          </div>
          <div className="text-xs text-[#57554F] mt-0.5 tabular-nums">
            Reported by {CAFE_INFO.priceReportedBy} people
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-xs font-medium text-[#57554F] mb-1">Daily Hours</div>
          <div className="font-display text-xl font-semibold text-[#151513] tabular-nums">
            {CAFE_INFO.hoursSummary}
          </div>
          <div className="text-xs text-[#57554F] mt-0.5">
            Reservations &amp; walk-ins welcome
          </div>
        </div>

        <a
          href="#menu"
          className="p-5 sm:p-6 hover:bg-[#FAF9F6] transition-colors rounded-b-2xl sm:rounded-bl-none sm:rounded-r-2xl"
        >
          <div className="text-xs font-medium text-[#57554F] mb-1">House Specialties</div>
          <div className="font-display text-xl font-semibold text-[#151513]">
            14 Signature Highlights
          </div>
          <div className="text-xs text-[#28513E] font-medium mt-0.5">
            Explore menu &amp; 16 menu photos
          </div>
        </a>
      </div>
    </section>
  );
}

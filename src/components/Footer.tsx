import { CAFE_INFO } from '../data/cafeData';

interface FooterProps {
  onOpenReserve: () => void;
  onOpenOrder: () => void;
}

export function Footer({ onOpenReserve, onOpenOrder }: FooterProps) {
  return (
    <footer className="bg-[#151513] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          <div className="md:col-span-5 space-y-3">
            <div className="font-display text-2xl font-semibold tracking-tight">
              {CAFE_INFO.name}
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              {CAFE_INFO.description}
            </p>
            <p className="text-xs text-white/60 pt-1">
              {CAFE_INFO.hoursSummary} · {CAFE_INFO.pricePerPersonText}
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
              Location
            </div>
            <p className="text-white/90">{CAFE_INFO.address}</p>
            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-medium text-[#A3C9B4] hover:underline underline-offset-4 pt-1"
            >
              Get Directions on Google Maps
            </a>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
              Explore &amp; Book
            </div>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Menu Highlights
                </a>
              </li>
              <li>
                <a href="#photos" className="hover:text-white transition-colors">
                  Menu Photos (1–16)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Guest Reviews ({CAFE_INFO.reviewCount})
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenReserve}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reserve a table
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenOrder}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order online
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <span>
            &copy; {new Date().getFullYear()} {CAFE_INFO.name}. Deccan Gymkhana, Pune.
          </span>
          <span>
            Rated {CAFE_INFO.rating}★ across {CAFE_INFO.reviewCount} reviews
          </span>
        </div>
      </div>
    </footer>
  );
}

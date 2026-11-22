import { Clock, MapPin, PawPrint, ExternalLink, Calendar } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface LocationSectionProps {
  onOpenReserve: () => void;
}

export function LocationSection({ onOpenReserve }: LocationSectionProps) {
  return (
    <section
      id="visit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#E5E2DA]"
    >
      <div className="mb-8">
        <p className="text-xs font-medium text-[#28513E] mb-2">
          Visit Us · Deccan Gymkhana, Pune
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#151513]">
          Find Cafe Black Cat &amp; Wolf on Law College Road
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Architectural Neighborhood Map Card */}
        <div className="lg:col-span-7 bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-display text-xl font-semibold text-[#151513]">
                Map of Cafe Black Cat &amp; Wolf
              </h3>
              <p className="text-sm text-[#57554F] mt-1">
                {CAFE_INFO.address}
              </p>
            </div>
            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-white bg-[#151513] hover:bg-[#28513E] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Directions</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Crisp Architectural SVG Street Map of Law College Rd, Deccan Gymkhana */}
          <div className="relative rounded-xl overflow-hidden border border-[#E5E2DA] bg-[#F3F1EC] aspect-[16/9]">
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full"
              role="img"
              aria-label="Neighborhood street map showing Cafe Black Cat & Wolf at Pradeep Chambers on Law College Road in Deccan Gymkhana, Pune"
            >
              <rect width="800" height="450" fill="#EFECE5" />

              {/* City Blocks */}
              <rect x="40" y="36" width="210" height="145" rx="8" fill="#E5E1D8" />
              <rect x="295" y="36" width="215" height="145" rx="8" fill="#E5E1D8" />
              <rect x="555" y="36" width="205" height="145" rx="8" fill="#E5E1D8" />
              <rect x="40" y="230" width="210" height="175" rx="8" fill="#E5E1D8" />
              <rect x="295" y="230" width="215" height="175" rx="8" fill="#DCE5DD" />
              <rect x="555" y="230" width="205" height="175" rx="8" fill="#E5E1D8" />

              {/* Horizontal & Vertical Roads */}
              <path
                d="M 0 205 L 800 205"
                stroke="#FFFFFF"
                strokeWidth="22"
              />
              <path
                d="M 272 0 L 272 450"
                stroke="#FFFFFF"
                strokeWidth="20"
              />
              <path
                d="M 532 0 L 532 450"
                stroke="#FFFFFF"
                strokeWidth="28"
              />
              <path
                d="M 0 380 L 800 380"
                stroke="#FFFFFF"
                strokeWidth="16"
              />

              {/* Road Labels */}
              <text
                x="532"
                y="115"
                transform="rotate(-90 532 115)"
                textAnchor="middle"
                fill="#57554F"
                fontSize="13"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                LAW COLLEGE ROAD
              </text>
              <text
                x="145"
                y="209"
                textAnchor="middle"
                fill="#57554F"
                fontSize="12"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                PRABHAT ROAD
              </text>
              <text
                x="402"
                y="209"
                textAnchor="middle"
                fill="#57554F"
                fontSize="12"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                BHANDARKAR ROAD
              </text>

              {/* Area Landmarks */}
              <text
                x="402"
                y="325"
                textAnchor="middle"
                fill="#28513E"
                fontSize="12"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                DECCAN GYMKHANA
              </text>
              <text
                x="658"
                y="115"
                textAnchor="middle"
                fill="#57554F"
                fontSize="12"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                ILS Law College
              </text>
              <text
                x="145"
                y="115"
                textAnchor="middle"
                fill="#57554F"
                fontSize="12"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                BMCC / Fergusson College Rd
              </text>

              {/* Pradeep Chambers Pin */}
              <g transform="translate(532, 232)">
                <circle r="28" fill="#28513E" fillOpacity="0.16" />
                <circle r="11" fill="#28513E" stroke="#FFFFFF" strokeWidth="3" />
              </g>

              {/* Floating Pin Callout */}
              <g transform="translate(320, 240)">
                <rect
                  x="0"
                  y="0"
                  width="196"
                  height="56"
                  rx="10"
                  fill="#151513"
                />
                <text
                  x="14"
                  y="24"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="Fraunces, Georgia, serif"
                >
                  Cafe Black Cat &amp; Wolf
                </text>
                <text
                  x="14"
                  y="42"
                  fill="#D1D5DB"
                  fontSize="11"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  Pradeep Chambers · Open till 12 AM
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Hours, Pricing & House Notes */}
        <div className="lg:col-span-5 bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="flex items-start gap-3.5 pb-5 border-b border-[#E5E2DA]">
              <Clock className="w-5 h-5 text-[#28513E] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs font-medium text-[#57554F]">Opening Hours</div>
                <div className="text-base font-semibold text-[#151513] mt-0.5 tabular-nums">
                  {CAFE_INFO.hoursSummary}
                </div>
                <p className="text-sm text-[#57554F] mt-1">
                  Serving specialty morning brews, all-day breakfast, and late-night coffee &amp; desserts until midnight.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pb-5 border-b border-[#E5E2DA]">
              <MapPin className="w-5 h-5 text-[#28513E] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs font-medium text-[#57554F]">Address</div>
                <div className="text-base font-semibold text-[#151513] mt-0.5">
                  Pradeep Chambers, Law College Rd
                </div>
                <p className="text-sm text-[#57554F] mt-0.5">
                  Deccan Gymkhana, Pune, Maharashtra 411004
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <PawPrint className="w-5 h-5 text-[#28513E] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs font-medium text-[#57554F]">
                  Atmosphere &amp; Spend
                </div>
                <div className="text-base font-semibold text-[#151513] mt-0.5 tabular-nums">
                  {CAFE_INFO.pricePerPersonText} · Reported by {CAFE_INFO.priceReportedBy} guests
                </div>
                <p className="text-sm text-[#57554F] mt-1">
                  Pet-friendly tables, calm acoustic playlist, power outlets for remote work, and dedicated reservations.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E2DA] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onOpenReserve}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#28513E] hover:bg-[#1E3F30] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Reserve a table</span>
            </button>

            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-[#151513] bg-[#F7F6F3] hover:bg-[#EBE8E1] border border-[#E5E2DA] rounded-lg transition-colors whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-[#28513E]" aria-hidden="true" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

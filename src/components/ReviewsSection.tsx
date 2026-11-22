import { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import {
  CAFE_INFO,
  GUEST_REVIEWS,
  RATING_DISTRIBUTION,
} from '../data/cafeData';

type ReviewFilter = 'All' | 'Ambience' | 'Service' | 'Food';

export function ReviewsSection() {
  const [filter, setFilter] = useState<ReviewFilter>('All');

  const visibleReviews =
    filter === 'All'
      ? GUEST_REVIEWS
      : GUEST_REVIEWS.filter((r) => r.category === filter);

  return (
    <section
      id="reviews"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#E5E2DA]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-medium text-[#28513E] mb-2">
            Google Review Summary · Verified Guest Feedback
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#151513]">
            Rated {CAFE_INFO.rating} by {CAFE_INFO.reviewCount} Pune Guests
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['All', 'Ambience', 'Service', 'Food'] as ReviewFilter[]).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab
                    ? 'bg-[#151513] text-white'
                    : 'bg-white text-[#57554F] border border-[#E5E2DA] hover:text-[#151513]'
                }`}
              >
                {tab === 'All' ? 'All Highlights' : tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Rating Breakdown + AI Review Summary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
        {/* Left: Numeric Rating & 5-1 Distribution */}
        <div className="lg:col-span-5 bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#E5E2DA]">
            <div>
              <div className="font-display text-5xl font-semibold text-[#151513] tabular-nums">
                {CAFE_INFO.rating}
              </div>
              <div className="flex items-center gap-1 mt-2" aria-label="4.7 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 5
                        ? 'fill-[#D97706] text-[#D97706]'
                        : 'text-[#E5E2DA]'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-semibold text-[#151513] tabular-nums">
                {CAFE_INFO.reviewCount} reviews
              </div>
              <div className="text-xs text-[#57554F] mt-0.5 tabular-nums">
                +{CAFE_INFO.positiveHighlightsCount} highlighted mentions
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            {RATING_DISTRIBUTION.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-8 font-medium text-[#151513] tabular-nums shrink-0">
                  {row.stars} ★
                </span>
                <div className="flex-1 h-2 bg-[#EBE8E1] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#28513E] rounded-full"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[#57554F] tabular-nums shrink-0">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Google Review Summary */}
        <div className="lg:col-span-7 bg-[#151513] text-white rounded-2xl p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 text-xs text-white/70 mb-5">
              <span>Google Review Summary</span>
              <span className="tabular-nums">+{CAFE_INFO.positiveHighlightsCount} guest notes</span>
            </div>
            <p className="font-display text-xl sm:text-2xl leading-relaxed text-white/95 font-normal">
              &ldquo;{CAFE_INFO.reviewSummary}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/15 text-sm">
            <div>
              <div className="font-semibold text-white">Flavorful Kitchen</div>
              <div className="text-xs text-white/70 mt-0.5">
                Pasta, fresh sandwiches &amp; desserts
              </div>
            </div>
            <div>
              <div className="font-semibold text-white">Cozy &amp; Calm</div>
              <div className="text-xs text-white/70 mt-0.5">
                Great for relaxing or working
              </div>
            </div>
            <div>
              <div className="font-semibold text-white">Attentive Team</div>
              <div className="text-xs text-white/70 mt-0.5">
                Friendly, prompt table service
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Authentic Guest Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <blockquote
            key={review.id}
            className="bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote className="w-4 h-4 text-[#28513E]/40" aria-hidden="true" />
              </div>

              <p className="text-base text-[#151513] leading-relaxed font-medium">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>

            <footer className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between gap-2 text-xs text-[#57554F]">
              <span className="font-semibold text-[#151513]">{review.author}</span>
              <span>{review.context}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

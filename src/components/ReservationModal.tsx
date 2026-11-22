import { useState, FormEvent } from 'react';
import { Calendar, CheckCircle2, PawPrint, X } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '10:00 AM',
  '12:30 PM',
  '03:30 PM',
  '06:00 PM',
  '08:00 PM',
  '10:00 PM',
  '11:00 PM',
];

const SEATING_OPTIONS = [
  'Sunlit Window Bench',
  'Pet-Friendly Corner',
  'Quiet Work Table',
  'Indoor Main Hall',
];

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('06:00 PM');
  const [guests, setGuests] = useState('2');
  const [seating, setSeating] = useState(SEATING_OPTIONS[0]);
  const [withPet, setWithPet] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!guestName.trim()) {
      setError('Please enter your name for the reservation.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    const code = `BCW-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef(code);
  };

  const resetAndClose = () => {
    setConfirmedRef(null);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-modal-title"
    >
      <div className="bg-white border border-[#E5E2DA] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-[#E5E2DA] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#28513E]">
              {CAFE_INFO.hoursSummary}
            </p>
            <h3
              id="reserve-modal-title"
              className="font-display text-2xl font-semibold text-[#151513]"
            >
              Reserve a table
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close reservation modal"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E2DA] text-[#151513] hover:bg-[#F7F6F3] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedRef ? (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-start gap-3 text-[#28513E]">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-display text-xl font-semibold text-[#151513]">
                  Table Reserved — {confirmedRef}
                </h4>
                <p className="text-sm text-[#57554F] mt-1">
                  We have saved your table at {CAFE_INFO.name}, Law College Rd, Pune.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F6F3] border border-[#E5E2DA] rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[#57554F]">Guest</span>
                <span className="font-semibold text-[#151513]">{guestName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#57554F]">Date &amp; Time</span>
                <span className="font-semibold text-[#151513] tabular-nums">
                  {date} · {timeSlot}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#57554F]">Party Size</span>
                <span className="font-semibold text-[#151513] tabular-nums">
                  {guests} {Number(guests) === 1 ? 'Guest' : 'Guests'}
                  {withPet ? ' + Pet' : ''}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#57554F]">Seating</span>
                <span className="font-semibold text-[#151513]">{seating}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="w-full py-3 min-h-[44px] text-sm font-semibold text-white bg-[#151513] hover:bg-[#28513E] rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div
                role="alert"
                className="p-3 text-sm text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="res-date"
                  className="block text-xs font-medium text-[#57554F] mb-1.5"
                >
                  Date
                </label>
                <input
                  id="res-date"
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] tabular-nums focus:outline-2 focus:outline-[#28513E]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="res-guests"
                  className="block text-xs font-medium text-[#57554F] mb-1.5"
                >
                  Guests
                </label>
                <select
                  id="res-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] focus:outline-2 focus:outline-[#28513E]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#57554F] mb-2">
                Select Time (Open till 12 AM)
              </span>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-3 py-2 min-h-[38px] text-xs font-medium rounded-lg transition-colors tabular-nums cursor-pointer ${
                      timeSlot === slot
                        ? 'bg-[#28513E] text-white'
                        : 'bg-[#F7F6F3] text-[#151513] border border-[#E5E2DA] hover:bg-[#EBE8E1]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="res-seating"
                className="block text-xs font-medium text-[#57554F] mb-1.5"
              >
                Preferred Seating
              </label>
              <select
                id="res-seating"
                value={seating}
                onChange={(e) => setSeating(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] focus:outline-2 focus:outline-[#28513E]"
              >
                {SEATING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2.5 p-3 bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={withPet}
                onChange={(e) => setWithPet(e.target.checked)}
                className="w-4 h-4 accent-[#28513E]"
              />
              <PawPrint className="w-4 h-4 text-[#28513E]" aria-hidden="true" />
              <span className="text-sm text-[#151513]">
                I am bringing a pet (water bowl will be ready)
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="res-name"
                  className="block text-xs font-medium text-[#57554F] mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="res-name"
                  type="text"
                  placeholder="e.g. Aditi Kulkarni"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] focus:outline-2 focus:outline-[#28513E]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="res-phone"
                  className="block text-xs font-medium text-[#57554F] mb-1.5"
                >
                  Mobile Number
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] tabular-nums focus:outline-2 focus:outline-[#28513E]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="res-notes"
                className="block text-xs font-medium text-[#57554F] mb-1.5"
              >
                Special Requests (optional)
              </label>
              <input
                id="res-notes"
                type="text"
                placeholder="Power outlet needed, birthday note, oat milk..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 min-h-[42px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] focus:outline-2 focus:outline-[#28513E]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#28513E] hover:bg-[#1E3F30] rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Confirm Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

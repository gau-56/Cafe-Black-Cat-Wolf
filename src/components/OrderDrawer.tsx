import { useState, FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { CAFE_INFO, MENU_ITEMS } from '../data/cafeData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  onUpdateQty: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

type OrderMode = 'Pickup' | 'Delivery';

export function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
}: OrderDrawerProps) {
  const [orderMode, setOrderMode] = useState<OrderMode>('Pickup');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const cartItems = MENU_ITEMS.filter((item) => (cart[item.id] || 0) > 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 0),
    0
  );
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!customerName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (orderMode === 'Delivery' && !deliveryAddress.trim()) {
      setError('Please enter your Pune delivery address.');
      return;
    }

    setError('');
    const orderNum = `BCW-${Math.floor(100 + Math.random() * 899)}`;
    setConfirmedOrderId(orderNum);
    onClearCart();
  };

  const handleClose = () => {
    setConfirmedOrderId(null);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col border-l border-[#E5E2DA]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E5E2DA] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#28513E]">
              {CAFE_INFO.name}
            </p>
            <h3
              id="order-drawer-title"
              className="font-display text-2xl font-semibold text-[#151513]"
            >
              Order Online
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close order bag"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E2DA] text-[#151513] hover:bg-[#F7F6F3] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrderId ? (
            <div className="py-6 space-y-5">
              <div className="flex items-start gap-3 text-[#28513E]">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-display text-xl font-semibold text-[#151513]">
                    Order #{confirmedOrderId} Confirmed
                  </h4>
                  <p className="text-sm text-[#57554F] mt-1">
                    {orderMode === 'Pickup'
                      ? 'Our baristas and kitchen at Pradeep Chambers have started preparing your order. Ready in ~18 mins.'
                      : 'Preparing fresh now. Dispatching to your Law College Rd / Pune address.'}
                  </p>
                </div>
              </div>

              <div className="bg-[#F7F6F3] border border-[#E5E2DA] rounded-xl p-4 text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#57554F]">Customer</span>
                  <span className="font-semibold text-[#151513]">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57554F]">Fulfillment</span>
                  <span className="font-semibold text-[#151513]">{orderMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57554F]">Payment</span>
                  <span className="font-semibold text-[#151513]">Pay at Counter / UPI on Delivery</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 min-h-[44px] text-sm font-semibold text-white bg-[#151513] hover:bg-[#28513E] rounded-lg transition-colors cursor-pointer"
              >
                Back to Cafe Menu
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-xl bg-[#F7F6F3] border border-[#E5E2DA] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#28513E]" aria-hidden="true" />
              </div>
              <h4 className="font-display text-xl font-semibold text-[#151513]">
                Your order bag is empty
              </h4>
              <p className="text-sm text-[#57554F] mt-2 max-w-xs">
                Add a Pistachio Latte, Avocado Toast, Pesto Pasta, or Burnt Basque Cheesecake from the menu to place an order.
              </p>
              <a
                href="#menu"
                onClick={handleClose}
                className="mt-6 px-5 py-2.5 min-h-[42px] inline-flex items-center justify-center text-sm font-semibold text-white bg-[#28513E] hover:bg-[#1E3F30] rounded-lg transition-colors"
              >
                Browse Menu Highlights
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pickup / Delivery Switch */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F7F6F3] border border-[#E5E2DA] rounded-xl">
                {(['Pickup', 'Delivery'] as OrderMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setOrderMode(mode)}
                    className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      orderMode === mode
                        ? 'bg-[#151513] text-white'
                        : 'text-[#57554F] hover:text-[#151513]'
                    }`}
                  >
                    {mode === 'Pickup' ? 'Self Pickup (18m)' : 'Local Delivery'}
                  </button>
                ))}
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-[#E5E2DA] border-y border-[#E5E2DA]">
                {cartItems.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="py-4 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#151513] truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#57554F] tabular-nums mt-0.5">
                          ₹{item.price} each
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="inline-flex items-center border border-[#E5E2DA] rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#F7F6F3] text-[#151513] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums min-w-[24px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#F7F6F3] text-[#151513] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#151513] tabular-nums w-14 text-right">
                          ₹{(item.price * qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer Checkout Form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                {error && (
                  <div
                    role="alert"
                    className="p-3 text-xs text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="order-name"
                    className="block text-xs font-medium text-[#57554F] mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    placeholder="Your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[40px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-phone"
                    className="block text-xs font-medium text-[#57554F] mb-1"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="order-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[40px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513] tabular-nums"
                    required
                  />
                </div>

                {orderMode === 'Delivery' && (
                  <div>
                    <label
                      htmlFor="order-address"
                      className="block text-xs font-medium text-[#57554F] mb-1"
                    >
                      Delivery Address (Deccan / Pune)
                    </label>
                    <input
                      id="order-address"
                      type="text"
                      placeholder="Flat / Street / Landmark near Law College Rd"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[40px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513]"
                      required
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="order-notes"
                    className="block text-xs font-medium text-[#57554F] mb-1"
                  >
                    Preparation Notes (optional)
                  </label>
                  <input
                    id="order-notes"
                    type="text"
                    placeholder="Less ice, extra garlic dip, almond milk..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[40px] text-sm bg-[#F7F6F3] border border-[#E5E2DA] rounded-lg text-[#151513]"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Sticky Checkout Footer */}
        {!confirmedOrderId && cartItems.length > 0 && (
          <div className="p-6 bg-[#F7F6F3] border-t border-[#E5E2DA] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#57554F]">
                <span>Subtotal</span>
                <span className="tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#57554F]">
                <span>Taxes (5% GST)</span>
                <span className="tabular-nums">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#151513] pt-1.5 border-t border-[#E5E2DA]">
                <span>Total Payable</span>
                <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3 min-h-[44px] text-sm font-semibold text-white bg-[#28513E] hover:bg-[#1E3F30] rounded-lg transition-colors cursor-pointer"
            >
              Place {orderMode} Order · ₹{total.toLocaleString('en-IN')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

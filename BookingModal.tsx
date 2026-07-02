import React, { useState } from "react";
import { X, Calendar, Clock, User, Check, Sparkles, Phone, Scissors, MessageSquare } from "lucide-react";
import { SERVICES } from "../data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
}

export default function BookingModal({ isOpen, onClose, preSelectedServiceId }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceId: preSelectedServiceId || "haircut",
    date: "",
    time: "",
    stylist: "Any Stylist",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  if (!isOpen) return null;

  // Set the serviceId if it changed or was preselected
  React.useEffect(() => {
    if (preSelectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preSelectedServiceId }));
    }
  }, [preSelectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      alert("Please fill in all required fields.");
      return;
    }
    // Generate simple booking ID
    const randomId = "HM-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setIsSubmitted(true);
  };

  const selectedService = SERVICES.find((s) => s.id === formData.serviceId);

  // Send WhatsApp message setup
  const handleWhatsAppConfirm = () => {
    const text = `Hello Hair Mechanic Family Salon! I'd like to confirm my appointment:
- Booking ID: ${bookingId}
- Name: ${formData.name}
- Service: ${selectedService?.name || "General"}
- Date: ${formData.date}
- Time: ${formData.time}
- Stylist Pref: ${formData.stylist}
- Notes: ${formData.notes || "None"}
Please confirm my slot. Thank you!`;
    const url = `https://wa.me/917992200358?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A3426]/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-lg bg-[#F8F4EC] border border-[#E7D8C9] rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-wood-dark text-[#F8F4EC]">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-sand animate-pulse" />
            <h3 className="font-serif text-lg tracking-wide uppercase">Book An Appointment</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-wood-warm/50 text-[#F8F4EC] transition-colors"
            id="close-booking-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <p className="text-sm text-wood-dark/80 italic font-medium">
              Take a moment to secure your luxury grooming session. We will verify your slot instantly.
            </p>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-warm/60" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige bg-[#FFFDF9] text-wood-dark text-sm focus:outline-none focus:ring-2 focus:ring-wood-warm focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-warm/60" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 7992200358"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige bg-[#FFFDF9] text-wood-dark text-sm focus:outline-none focus:ring-2 focus:ring-wood-warm focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[10px] text-wood-dark/60 mt-1">10-digit mobile number without country code</p>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                Select Grooming Service <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-beige bg-[#FFFDF9] text-wood-dark text-sm focus:outline-none focus:ring-2 focus:ring-wood-warm focus:border-transparent transition-all"
              >
                {SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name} ({srv.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-warm/60 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-beige bg-[#FFFDF9] text-wood-dark text-sm focus:outline-none focus:ring-2 focus:ring-wood-warm focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-warm/60 pointer-events-none" />
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-beige bg-[#FFFDF9] text-wood-dark text-sm focus:outline-none focus:ring-2 focus:ring-wood-warm focus:border-transparent transition-all"
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preferred Stylist */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                Preferred Expert Stylist
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Any Stylist", "Senior Stylist", "Master Colorist"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, stylist: role })}
                    className={`px-2 py-2 rounded-lg border text-xs font-medium transition-all ${
                      formData.stylist === role
                        ? "bg-wood-warm text-cream border-wood-warm shadow-sm"
                        : "bg-[#FFFDF9] text-wood-dark border-beige hover:bg-beige/20"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-wood-warm mb-1">
                Optional Message / Requests
              </label>
              <textarea
                rows={2}
                placeholder="Share any special request, hair density, or skin allergy details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-beige bg-[#FFFDF9] text-wood-dark text-sm focus:outline-none focus:ring-2 focus:ring-wood-warm focus:border-transparent transition-all"
              />
            </div>

            {/* Total / Est Panel */}
            <div className="bg-[#E7D8C9]/30 p-3 rounded-xl border border-beige flex justify-between items-center">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-wood-warm">Estimated Service Charge</p>
                <p className="text-sm font-semibold text-wood-dark">{selectedService?.name}</p>
              </div>
              <p className="text-lg font-serif font-bold text-wood-warm">{selectedService?.price.split(" ")[0]}</p>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full bg-wood-warm text-cream hover:bg-wood-dark py-3 rounded-xl font-medium tracking-wide uppercase transition-all shadow-md hover:shadow-lg active:scale-98"
            >
              Confirm Appointment Slot
            </button>
          </form>
        ) : (
          /* Submission Success View */
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 animate-bounce">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl text-wood-dark font-bold">Booking Scheduled!</h4>
              <p className="text-xs text-wood-warm font-semibold tracking-wider uppercase">
                Booking ID: <span className="text-wood-dark font-mono font-bold bg-[#E7D8C9]/40 px-2 py-0.5 rounded">{bookingId}</span>
              </p>
            </div>

            <p className="text-sm text-wood-dark/80 leading-relaxed max-w-sm mx-auto">
              Thank you <strong className="text-wood-dark">{formData.name}</strong>, your luxury appointment for <strong className="text-wood-dark">{selectedService?.name}</strong> has been provisionally scheduled on:
              <br />
              <span className="font-semibold block mt-1 text-wood-warm">{formData.date} at {formData.time}</span>
            </p>

            {/* Address snippet */}
            <div className="bg-[#E7D8C9]/25 p-3 rounded-xl border border-beige/60 text-left text-xs text-wood-dark/80 space-y-1">
              <p className="font-bold">📍 Location:</p>
              <p>2nd Floor, SMM Complex, Morabadi, Boreya, Ranchi, Jharkhand - 834006</p>
              <p className="font-bold pt-1">📞 Inquiries:</p>
              <p>+91 7992200358</p>
            </div>

            {/* Dynamic Interactive confirmations */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppConfirm}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Confirm on WhatsApp
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full text-xs font-semibold text-wood-warm hover:text-wood-dark transition-colors py-1.5"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

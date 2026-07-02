import React, { useState, useEffect } from "react";
import {
  Scissors,
  Sparkles,
  Palette,
  Droplets,
  User,
  Flower,
  Sparkle,
  Crown,
  Gem,
  Hand,
  Activity,
  Droplet,
  ShieldCheck,
  Zap,
  Heart,
  Users,
  Award,
  MessageCircle,
  Smile,
  Wrench,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Check,
  ChevronUp,
  X,
  Menu,
  ExternalLink,
  MessageSquare,
  Sparkle as SparkleIcon
} from "lucide-react";

import { SERVICES, FEATURES, REVIEWS, GALLERY_ITEMS } from "./data";
import BookingModal from "./components/BookingModal";

// Interactive Count-up Component for premium feel
interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}
function CountUp({ end, suffix = "", duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-wood-warm tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function App() {
  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal Booking states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);

  // Filter states
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  // Lightbox modal state for gallery
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Show / Hide Back to Top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtered lists
  const filteredServices = serviceFilter === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.category === serviceFilter);

  // Extract unique categories for gallery filter
  const galleryCategories = ["all", "Hair Care", "Grooming", "Skin Care", "Makeup", "Nails", "Ambiance"];
  const filteredGalleryItems = galleryFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === galleryFilter);

  // Helper to map icon name to Lucide Component
  const renderServiceIcon = (iconName: string) => {
    const css = "w-6 h-6 text-wood-warm group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case "scissors": return <Scissors className={css} />;
      case "sparkles": return <Sparkles className={css} />;
      case "palette": return <Palette className={css} />;
      case "droplets": return <Droplets className={css} />;
      case "user": return <User className={css} />;
      case "flower": return <Flower className={css} />;
      case "sparkle": return <Sparkle className={css} />;
      case "crown": return <Crown className={css} />;
      case "gem": return <Gem className={css} />;
      case "hand": return <Hand className={css} />;
      case "activity": return <Activity className={css} />;
      case "droplet": return <Droplet className={css} />;
      case "shield-check": return <ShieldCheck className={css} />;
      case "zap": return <Zap className={css} />;
      case "heart": return <Heart className={css} />;
      default: return <Sparkles className={css} />;
    }
  };

  const renderFeatureIcon = (iconName: string) => {
    const css = "w-8 h-8 text-[#F8F4EC]";
    switch (iconName) {
      case "users": return <Users className={css} />;
      case "heart": return <Heart className={css} />;
      case "award": return <Award className={css} />;
      case "shield-check": return <ShieldCheck className={css} />;
      case "sparkles": return <Sparkles className={css} />;
      case "message-circle": return <MessageCircle className={css} />;
      case "smile": return <Smile className={css} />;
      case "cpu": return <Wrench className={css} />;
      default: return <Sparkles className={css} />;
    }
  };

  const openBookingWithService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const openGeneralBooking = () => {
    setPreSelectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setContactSuccess(true);
    // Reset form
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: "", phone: "", message: "" });
    }, 6000);
  };

  // Quick WhatsApp link trigger
  const triggerWhatsAppInquiry = () => {
    const text = `Hi Hair Mechanic Family Salon! I am browsing your premium website and have a question regarding salon bookings.`;
    window.open(`https://wa.me/917992200358?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-wood-warm selection:text-cream bg-[#F8F4EC] wood-grain-bg text-wood-dark">
      
      {/* HEADER & NAVIGATION */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-nav py-3.5 shadow-[0_10px_30px_rgba(39,25,16,0.06)] border-b border-wood-warm/15"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-wood-warm to-wood-dark flex items-center justify-center text-cream shadow-md group-hover:rotate-12 group-hover:scale-105 transition-all duration-300 frame-double-gold !p-0">
              <Scissors className="w-4 h-4 text-cream" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-black tracking-tight block uppercase text-wood-dark group-hover:text-wood-warm transition-colors duration-300">
                Hair Mechanic
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-wood-warm block -mt-1 font-bold">
                Family Salon
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-xs font-bold uppercase tracking-wider text-wood-dark hover:text-wood-warm transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-wood-warm hover:after:w-full after:transition-all">About Us</a>
            <a href="#services" className="text-xs font-bold uppercase tracking-wider text-wood-dark hover:text-wood-warm transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-wood-warm hover:after:w-full after:transition-all">Our Services</a>
            <a href="#features" className="text-xs font-bold uppercase tracking-wider text-wood-dark hover:text-wood-warm transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-wood-warm hover:after:w-full after:transition-all">Why Choose Us</a>
            <a href="#gallery" className="text-xs font-bold uppercase tracking-wider text-wood-dark hover:text-wood-warm transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-wood-warm hover:after:w-full after:transition-all">Gallery</a>
            <a href="#reviews" className="text-xs font-bold uppercase tracking-wider text-wood-dark hover:text-wood-warm transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-wood-warm hover:after:w-full after:transition-all">Testimonials</a>
            <a href="#contact" className="text-xs font-bold uppercase tracking-wider text-wood-dark hover:text-wood-warm transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-wood-warm hover:after:w-full after:transition-all">Contact</a>
          </nav>

          {/* Nav Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:7992200358"
              className="p-3 rounded-full border border-wood-warm/25 hover:bg-wood-warm/10 text-wood-warm transition-all hover:scale-105 active:scale-95"
              title="Call Salon"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={openGeneralBooking}
              className="bg-wood-warm hover:bg-wood-dark text-cream font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-97 hover:-translate-y-0.5"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-wood-dark hover:bg-beige/35 transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#F8F4EC]/95 backdrop-blur-md border-b border-beige p-6 flex flex-col gap-4 shadow-xl animate-fade-in-up">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-wood-dark hover:text-wood-warm text-xs uppercase tracking-wider border-b border-beige/40 pb-2.5"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-wood-dark hover:text-wood-warm text-xs uppercase tracking-wider border-b border-beige/40 pb-2.5"
            >
              Our Services
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-wood-dark hover:text-wood-warm text-xs uppercase tracking-wider border-b border-beige/40 pb-2.5"
            >
              Why Choose Us
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-wood-dark hover:text-wood-warm text-xs uppercase tracking-wider border-b border-beige/40 pb-2.5"
            >
              Gallery
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-wood-dark hover:text-wood-warm text-xs uppercase tracking-wider border-b border-beige/40 pb-2.5"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-wood-dark hover:text-wood-warm text-xs uppercase tracking-wider pb-1"
            >
              Contact & Map
            </a>
            
            <div className="flex flex-col gap-3 pt-3 border-t border-beige/40">
              <a
                href="tel:7992200358"
                className="w-full text-center border border-wood-warm text-wood-warm py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" /> Call: 7992200358
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openGeneralBooking();
                }}
                className="w-full bg-wood-warm text-cream hover:bg-wood-dark py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO BANNER SECTION */}
      <section id="home" className="relative pt-36 pb-24 md:py-44 lg:py-56 overflow-hidden min-h-[95vh] flex items-center">
        {/* Hero Background image overlay with soft ambient wood styling */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600"
            alt="Salon Background"
            className="w-full h-full object-cover scale-105 filter brightness-[0.22] blur-[1px]"
          />
          {/* Luxurious espresso/wood dark velvet vignette glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#271910] via-[#4A3426]/75 to-[#271910]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#271910]/90 via-transparent to-[#271910]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#F8F4EC]">
          <div className="max-w-3.5xl space-y-8 md:space-y-10">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-card-dark border border-gold/35 backdrop-blur-md animate-fade-in-up shadow-[0_4px_20px_rgba(212,175,55,0.1)]">
              <SparkleIcon className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                Unisex Hair, Beauty & Kids Spa
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] text-[#F8F4EC]">
                Where Style Meets <span className="text-gold italic block sm:inline font-normal">Perfection</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#E7D8C9] leading-relaxed max-w-2xl font-light">
                Professional Hair, Skin & Grooming Services for Men, Women & Kids. Step into Ranchi's most sophisticated sanctuary of natural wood aesthetics.
              </p>
            </div>

            {/* Quick rating snippet in Hero */}
            <div className="flex items-center gap-4 bg-espresso/60 backdrop-blur-md p-4 rounded-2xl border border-gold/20 inline-flex frame-double-gold !py-3">
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current text-gold" />
                ))}
              </div>
              <p className="text-xs font-medium tracking-wide text-cream">
                <span className="font-bold text-gold text-sm">4.9/5</span> (55 Verified Google Reviews)
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={openGeneralBooking}
                className="bg-wood-warm text-[#F8F4EC] hover:bg-[#F8F4EC] hover:text-[#271910] border border-gold/30 px-9 py-4.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-lg hover:shadow-[0_10px_35px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2.5 group hover:-translate-y-1 active:scale-97"
              >
                Book Appointment
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <a
                href="tel:7992200358"
                className="border-2 border-cream/50 hover:border-cream bg-transparent text-[#F8F4EC] hover:bg-cream/10 px-9 py-4.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2.5 hover:-translate-y-1 active:scale-97"
              >
                <Phone className="w-3.5 h-3.5 text-gold animate-pulse" />
                Call: 7992200358
              </a>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#E7D8C9]/60 hover:text-gold transition-colors duration-300 cursor-pointer" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
          <span className="text-[9px] tracking-[0.3em] uppercase font-bold">Explore More</span>
          <div className="w-6 h-10 rounded-full border-2 border-[#E7D8C9]/30 flex justify-center p-1.5">
            <div className="w-1 h-1 bg-gold rounded-full animate-bounce mt-0.5" />
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 md:py-32 bg-[#F8F4EC] relative overflow-hidden">
        {/* Stylistic background lines */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-beige/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Visual Bento of stats & gorgeous photo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-beige frame-double">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800"
                  alt="Hair Mechanic Ambience"
                  className="w-full h-[320px] sm:h-[400px] object-cover hover:scale-105 transition-transform duration-700 rounded-lg"
                />
                {/* Embedded Glass Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-espresso/85 backdrop-blur-md p-4 rounded-xl border border-gold/25 text-[#F8F4EC] flex justify-between items-center shadow-lg">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold">Ambiance Style</p>
                    <p className="text-xs font-serif italic text-cream mt-0.5">"Warm Natural Wood Interiors"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#E7D8C9] uppercase tracking-wider">Hygienic Care</p>
                    <p className="text-xs text-gold font-bold uppercase mt-0.5">100% Certified</p>
                  </div>
                </div>
              </div>

              {/* Mini Grid of local highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="premium-card-light p-5 rounded-2xl border border-beige/65 hover:border-wood-warm/40 hover:shadow-md transition-all duration-300">
                  <h4 className="font-serif font-bold text-wood-warm text-base">Unisex Care</h4>
                  <p className="text-xs text-wood-dark/75 leading-relaxed mt-1">Dedicated experts for men, women & kids haircuts.</p>
                </div>
                <div className="premium-card-light p-5 rounded-2xl border border-beige/65 hover:border-wood-warm/40 hover:shadow-md transition-all duration-300">
                  <h4 className="font-serif font-bold text-wood-warm text-base">Safe Products</h4>
                  <p className="text-xs text-wood-dark/75 leading-relaxed mt-1">Authorized brands only. No cheap chemicals.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative block */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-wood-warm">Discover Our Story</p>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-wood-dark">
                  Welcome to Hair Mechanic Family Salon
                </h2>
                <div className="w-16 h-1 bg-wood-warm rounded-full mt-3" />
              </div>

              <div className="space-y-5 text-wood-dark/80 text-sm md:text-base leading-relaxed font-light">
                <p>
                  Founded with a vision to redefine grooming in Ranchi, <strong className="text-wood-dark font-semibold">Hair Mechanic Family Salon</strong> is a premier unisex sanctuary located on the 2nd Floor of SMM Complex, Morabadi, Boreya. We offer a sophisticated escape where exceptional craft meets warm, natural hospitality.
                </p>
                <p>
                  Our salon is inspired by natural wood interiors—creating a comfortable, serene, and thoroughly hygienic environment suitable for the entire family. Whether you are stepping in for a precision haircut, an advanced organic facial, custom hair coloring, or a therapeutic pedicure, our licensed professionals work closely with you through personalized consultations to ensure perfect execution.
                </p>
                <div className="border-l-4 border-wood-warm pl-4 italic text-wood-warm font-serif bg-beige/15 py-4 pr-3 rounded-r-xl leading-relaxed text-sm">
                  "We believe that premium grooming is not a luxury reserved for special occasions—it is an essential form of self-care and confidence. That is why we provide affordable luxury without compromising on quality."
                </div>
              </div>

              {/* Key trust indicators */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-beige/60">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-serif font-black text-wood-warm">8+</p>
                  <p className="text-[10px] uppercase font-bold text-wood-dark/60 tracking-widest mt-1">Years of Pride</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-serif font-black text-wood-warm">12K+</p>
                  <p className="text-[10px] uppercase font-bold text-wood-dark/60 tracking-widest mt-1">Happy Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-serif font-black text-wood-warm">4.9⭐</p>
                  <p className="text-[10px] uppercase font-bold text-wood-dark/60 tracking-widest mt-1">Overall Rating</p>
                </div>
              </div>

              {/* Call to Action Row */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={openGeneralBooking}
                  className="bg-wood-dark text-cream hover:bg-wood-warm px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-97 hover:-translate-y-0.5"
                >
                  Book Your Experience
                </button>
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-wood-warm hover:text-wood-dark transition-all py-3.5 hover:translate-x-1"
                >
                  View Our Menu <ChevronRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC ANIMATED COUNTERS SECTION */}
      <section className="py-16 velvet-wood-dark text-[#F8F4EC] relative overflow-hidden shadow-inner border-t border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            
            <div className="space-y-2 p-4 rounded-xl border border-gold/5 bg-espresso/35 hover:bg-espresso/50 transition-colors duration-300">
              <CountUp end={8} suffix="+" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Years of Service</p>
            </div>
            
            <div className="space-y-2 p-4 rounded-xl border border-gold/5 bg-espresso/35 hover:bg-espresso/50 transition-colors duration-300">
              <CountUp end={12000} suffix="+" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Happy Clients</p>
            </div>
            
            <div className="space-y-2 p-4 rounded-xl border border-gold/5 bg-espresso/35 hover:bg-espresso/50 transition-colors duration-300">
              <CountUp end={25} suffix="+" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Premium Services</p>
            </div>
            
            <div className="space-y-2 p-4 rounded-xl border border-gold/5 bg-espresso/35 hover:bg-espresso/50 transition-colors duration-300">
              <CountUp end={55} suffix="+" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Google Reviews</p>
            </div>

          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section id="services" className="py-20 md:py-28 bg-[#F8F4EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wood-warm">Premium Indulgence</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-wood-dark">
              Our Professional Services
            </h2>
            <div className="w-16 h-1 bg-wood-warm mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-wood-dark/70 leading-relaxed pt-2">
              Explore our extensive selection of high-end salon treatments. All services are performed with authentic, dermatologically tested products.
            </p>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-3xl mx-auto">
            {[
              { id: "all", label: "All Treatments" },
              { id: "hair", label: "Hair Care" },
              { id: "skin", label: "Skincare" },
              { id: "grooming", label: "Men's Grooming" },
              { id: "makeup", label: "Makeup Artistry" },
              { id: "nails", label: "Nails & Spa" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setServiceFilter(tab.id)}
                className={`px-4.5 py-2.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${
                  serviceFilter === tab.id
                    ? "bg-wood-warm text-cream shadow-md scale-102 border-transparent"
                    : "bg-beige/25 text-wood-dark hover:bg-beige/55 border border-beige/45"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid (Responsive cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative premium-card-light p-6 rounded-2xl shadow-sm hover:shadow-[0_15px_30px_rgba(123,94,59,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card top: Icon and Category badge */}
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-xl bg-beige/30 group-hover:bg-wood-warm text-wood-warm group-hover:text-cream flex items-center justify-center transition-all duration-300">
                      {renderServiceIcon(service.icon)}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest bg-beige/35 text-wood-warm font-extrabold px-2.5 py-1 rounded-full border border-beige/60">
                      {service.category === "hair" ? "Hair Care" : service.category === "skin" ? "Skincare" : service.category === "makeup" ? "Makeup" : service.category === "nails" ? "Nails" : "Grooming"}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-wood-dark group-hover:text-wood-warm transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-xs text-wood-dark/75 leading-relaxed min-h-[40px] font-light">
                      {service.description}
                    </p>
                  </div>

                </div>

                {/* Card footer: Pricing & interactive Book CTA */}
                <div className="mt-6 pt-4 border-t border-beige/40 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-wood-warm font-semibold uppercase tracking-wider">Starting from</p>
                    <p className="text-base font-serif font-bold text-wood-dark">{service.price}</p>
                  </div>
                  
                  <button
                    onClick={() => openBookingWithService(service.id)}
                    className="flex items-center gap-1.5 bg-beige/35 group-hover:bg-wood-warm text-wood-dark group-hover:text-cream px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Book Now
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Quick Package Promo Banner */}
          <div className="mt-14 velvet-wood-dark text-cream p-7 md:p-10 rounded-2xl shadow-xl frame-double-gold flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            <div className="space-y-2 text-center lg:text-left relative z-10 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Family Package Special Offer</span>
              <h4 className="font-serif text-xl md:text-2xl lg:text-3xl font-black text-cream">Looking for custom packages or bridal bundles?</h4>
              <p className="text-xs text-[#E7D8C9] max-w-xl font-light leading-relaxed mt-1">
                We design tailored wedding, party, and routine family memberships. Enjoy additional discounts and complementary treatments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative z-10">
              <button
                onClick={triggerWhatsAppInquiry}
                className="bg-[#F8F4EC] text-wood-dark hover:bg-gold hover:text-espresso px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 shadow-sm"
              >
                Inquire on WhatsApp
              </button>
              <button
                onClick={openGeneralBooking}
                className="bg-wood-warm hover:bg-wood-dark hover:border-cream/30 border border-transparent text-cream px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 shadow-sm"
              >
                Customize Package
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US SECTION (BENTO GRID STYLE) */}
      <section id="features" className="py-24 md:py-32 velvet-wood-dark text-[#F8F4EC] relative border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold animate-pulse">Our Core Standards</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-cream">
              Why Choose Hair Mechanic?
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-[#E7D8C9]/90 leading-relaxed pt-2 font-light">
              We stand out by maintaining impeccable service principles. Discover what makes us the preferred unisex family salon in Ranchi.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="glass-card-dark border border-gold/15 hover:border-gold/35 p-6 rounded-2xl transition-all duration-300 space-y-5 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(212,175,55,0.08)]"
              >
                {/* Feature Icon */}
                <div className="w-14 h-14 rounded-xl bg-wood-warm/30 flex items-center justify-center border border-gold/20 text-gold shadow-md">
                  {renderFeatureIcon(feat.icon)}
                </div>

                {/* Feature details */}
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-cream">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#E7D8C9]/80 leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GALLERY SECTION (MASONRY & POPUP LIGHTBOX) */}
      <section id="gallery" className="py-24 md:py-32 bg-[#F8F4EC] relative overflow-hidden">
        {/* Artistic details */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-beige/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wood-warm">Visual Ambiance</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-wood-dark">
              Explore Our Gallery
            </h2>
            <div className="w-16 h-1 bg-wood-warm mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-wood-dark/70 leading-relaxed pt-2 font-light">
              A collection of our modern wood-themed interior layouts, active client styling sessions, and finished grooming work.
            </p>
          </div>

          {/* Gallery Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  galleryFilter === cat
                    ? "bg-wood-dark text-cream shadow-sm border border-transparent"
                    : "bg-beige/25 text-wood-dark hover:bg-beige/55 border border-beige/40"
                }`}
              >
                {cat === "all" ? "All Photos" : cat}
              </button>
            ))}
          </div>

          {/* Masonry Styled Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGalleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item.imageUrl)}
                className="group relative rounded-xl overflow-hidden shadow-sm border border-beige/60 aspect-square cursor-zoom-in frame-double !p-0.5"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-lg"
                />
                
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0.5 bg-gradient-to-t from-espresso/95 via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
                  <span className="text-[8px] uppercase tracking-widest text-gold font-bold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#F8F4EC] leading-tight mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-gold/90 mt-1 flex items-center gap-1 font-medium">
                    Click to view full image
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX PORTAL */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-105"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/15 frame-double-gold !p-1.5 shadow-2xl">
            <img
              src={lightboxImage}
              alt="Lightbox Zoom"
              className="w-full h-full object-contain max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}

      {/* CUSTOMER REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-24 md:py-32 bg-[#F8F4EC] relative overflow-hidden">
        {/* Subtle decorative ring */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-beige/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main review box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Aggregated Rating info */}
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left premium-card-light p-8 sm:p-10 rounded-2xl shadow-md border border-beige/85 hover:shadow-lg transition-shadow duration-500">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-wood-warm">Client Testimonials</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-wood-dark">
                Loved by Ranchi Families
              </h2>
              <div className="w-12 h-1 bg-wood-warm mx-auto lg:mx-0 rounded-full my-3.5" />
              
              <div className="py-4 space-y-2">
                <div className="flex justify-center lg:justify-start items-center gap-1.5 text-gold">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-6 h-6 fill-current text-gold" />
                  ))}
                </div>
                <p className="text-3xl font-serif font-black text-wood-dark">
                  4.9 <span className="text-xs font-sans font-bold text-wood-warm uppercase tracking-widest">/ 5 Rating</span>
                </p>
                <p className="text-xs text-wood-dark/75 font-semibold tracking-wider">
                  Based on 55+ Verified Google Reviews
                </p>
              </div>

              <div className="pt-4 border-t border-beige/65">
                <p className="text-xs text-wood-dark/75 leading-relaxed italic font-light">
                  "100% of customers reviewed their visit as hygienic, professional, and peaceful."
                </p>
              </div>
            </div>

            {/* Right Col: Three elegant testimonial cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="premium-card-light p-6 rounded-2xl shadow-sm hover:shadow-[0_12px_24px_rgba(123,94,59,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-beige/65"
                >
                  <div className="space-y-4">
                    {/* Stars and rating */}
                    <div className="flex items-center text-gold gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-gold" />
                      ))}
                    </div>

                    {/* Snippet */}
                    <p className="text-xs text-wood-dark/85 leading-relaxed italic font-light">
                      "{rev.snippet}"
                    </p>
                  </div>

                  {/* Customer bio footer */}
                  <div className="flex items-center gap-3 pt-4 mt-6 border-t border-beige/40">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-beige/70 shadow-sm"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-wood-dark">{rev.name}</h4>
                      <p className="text-[9px] text-wood-warm font-bold uppercase tracking-wider">{rev.date}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Book Appointment CTA Section below Testimonials */}
          <div className="mt-16 velvet-wood-dark text-[#F8F4EC] p-8 md:p-12 rounded-2xl text-center space-y-5 frame-double-gold border border-gold/15 shadow-2xl">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-black">Experience the Hair Mechanic Touch</h3>
            <p className="text-xs md:text-sm text-[#E7D8C9] max-w-xl mx-auto font-light leading-relaxed">
              Our expert stylists are waiting to provide you and your children with custom styling, clean haircuts, and rejuvenating treatments.
            </p>
            <div className="pt-3">
              <button
                onClick={openGeneralBooking}
                className="bg-wood-warm text-cream hover:bg-[#F8F4EC] hover:text-espresso border border-gold/30 px-9 py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md hover:shadow-lg active:scale-97 hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Schedule Appointment Slots <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT & EMBED GOOGLE MAPS SECTION */}
      <section id="contact" className="py-20 md:py-28 bg-[#F8F4EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wood-warm">Let's Connect</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-wood-dark">
              Contact & Directions
            </h2>
            <div className="w-16 h-1 bg-wood-warm mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-wood-dark/70 leading-relaxed pt-2">
              Find our address in Ranchi, drop us a direct request message, or open Google maps to navigate effortlessly to our salon block.
            </p>
          </div>

          {/* Contact Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Col 1: Contact Form (Left) */}
            <div className="lg:col-span-5 premium-card-light p-6 sm:p-8 rounded-2xl shadow-sm border border-beige/80 space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-wood-dark">Send Salon Message</h3>
                <p className="text-xs text-wood-dark/70 font-light">Have a custom inquiry or special bridal hair request? Drop us a line.</p>
              </div>

              {!contactSuccess ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-wood-warm mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-beige bg-[#FFFDF9] text-wood-dark text-xs focus:ring-1 focus:ring-wood-warm focus:outline-none focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-wood-warm mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7992200358"
                      pattern="[0-9]{10}"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-beige bg-[#FFFDF9] text-wood-dark text-xs focus:ring-1 focus:ring-wood-warm focus:outline-none focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-wood-warm mb-1.5">Inquiry Details</label>
                    <textarea
                      rows={4}
                      placeholder="Type details about bridal makeup bundles, pricing queries, or appointment modifications..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-beige bg-[#FFFDF9] text-wood-dark text-xs focus:ring-1 focus:ring-wood-warm focus:outline-none focus:border-transparent transition-all"
                    />
                  </div>

                  {/* CTA Submit */}
                  <button
                    type="submit"
                    className="w-full bg-wood-warm text-cream hover:bg-wood-dark py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
                  >
                    Send Direct Message
                  </button>
                </form>
              ) : (
                /* Success screen */
                <div className="p-8 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200/60 space-y-4 animate-fade-in-up">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-cream flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-wood-dark">Inquiry Dispatched!</h4>
                    <p className="text-xs text-wood-dark/70">
                      We received your query <strong className="text-wood-dark">{contactForm.name}</strong>. Our staff will coordinate on phone shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Trigger direct whatsapp helper
                      const text = `Hi Hair Mechanic Family Salon! This is ${contactForm.name}. I sent a message about: "${contactForm.message || "general services"}" on your portal. Please check.`;
                      window.open(`https://wa.me/917992200358?text=${encodeURIComponent(text)}`, "_blank");
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Send via WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Col 2: Info & Maps (Right) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Info Card 1: Hours */}
                <div className="premium-card-light p-5 rounded-2xl shadow-sm flex items-start gap-4 border border-beige/70">
                  <div className="p-3 bg-beige/35 rounded-xl text-wood-warm shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-wood-dark">Salon Timings</h4>
                    <p className="text-xs text-wood-dark/80 font-medium">Monday - Sunday</p>
                    <p className="text-xs font-bold text-wood-warm">10:00 AM - 08:30 PM</p>
                    <p className="text-[10px] text-wood-dark/60 italic pt-1 font-light">Open 7 days a week</p>
                  </div>
                </div>

                {/* Info Card 2: Contact Numbers */}
                <div className="premium-card-light p-5 rounded-2xl shadow-sm flex items-start gap-4 border border-beige/70">
                  <div className="p-3 bg-beige/35 rounded-xl text-wood-warm shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-wood-dark">Phone Details</h4>
                    <p className="text-xs text-wood-dark/80 font-light">Active Salon Hotline:</p>
                    <a href="tel:7992200358" className="text-sm font-bold text-wood-warm hover:underline block">
                      +91 7992200358
                    </a>
                    <p className="text-[10px] text-wood-dark/60 pt-1 font-light">WhatsApp & Call Available</p>
                  </div>
                </div>

                {/* Info Card 3: Exact Address */}
                <div className="premium-card-light p-5 rounded-2xl shadow-sm flex items-start gap-4 md:col-span-2 border border-beige/70">
                  <div className="p-3 bg-beige/35 rounded-xl text-wood-warm shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-serif text-base font-bold text-wood-dark">Our Location</h4>
                    <p className="text-xs text-wood-dark/80 leading-relaxed font-light">
                      2nd Floor, SMM Complex, Morabadi, Boreya, Ranchi, Jharkhand - 834006
                    </p>
                    <div className="pt-2">
                      <a
                        href="https://maps.app.goo.gl/pomnRXivrwoEuxPU8"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-wood-warm/10 text-wood-warm hover:bg-wood-warm hover:text-cream px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all"
                      >
                        Get Directions on Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Responsive Embedded Map */}
              <div className="rounded-2xl overflow-hidden border border-beige/80 shadow-md aspect-[16/9] min-h-[220px] frame-double !p-0.5 bg-cream">
                <iframe
                  title="Hair Mechanic Google Map Ranchi"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.1610487002046!2d85.33917897587884!3d23.418512101962383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e19b5bfb7223%3A0x6b7fa1b667bd46bc!2sBoreya%2C%20Ranchi%2C%20Jharkhand%20834006!5e0!3m2!1sen!2sin!4v1719921600000!5m2!1sen!2sin"
                  className="w-full h-full border-0 rounded-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1F120A] text-cream border-t border-gold/15 relative">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Col 1: Brand details */}
            <div className="space-y-5 md:col-span-1">
              <a href="#home" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-wood-warm flex items-center justify-center text-[#F8F4EC] frame-double-gold !p-0">
                  <Scissors className="w-4 h-4 text-cream" />
                </div>
                <div>
                  <span className="font-serif text-lg font-black tracking-tight block uppercase text-cream">
                    Hair Mechanic
                  </span>
                  <span className="text-[9px] tracking-[0.22em] uppercase text-gold block -mt-1 font-bold">
                    Family Salon
                  </span>
                </div>
              </a>
              <p className="text-xs text-[#E7D8C9]/80 leading-relaxed font-light">
                Premium unisex salon in Ranchi, Jharkhand. Delivering exceptional styles, haircuts, skin care solutions, and affordable bridal luxury packages in a comforting, wood-grain styled oasis.
              </p>
              
              <div className="flex gap-2.5 pt-2">
                {/* Social icons */}
                <a
                  href="https://maps.app.goo.gl/pomnRXivrwoEuxPU8"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8.5 h-8.5 rounded-full bg-cream/5 border border-beige/15 flex items-center justify-center hover:bg-wood-warm hover:text-cream text-[#F8F4EC] transition-all hover:scale-105"
                  title="Google Maps Location"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                </a>
                <a
                  href="https://wa.me/917992200358"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8.5 h-8.5 rounded-full bg-cream/5 border border-beige/15 flex items-center justify-center hover:bg-emerald-600 hover:text-cream text-[#F8F4EC] transition-all hover:scale-105"
                  title="WhatsApp Chat"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                </a>
                <a
                  href="#"
                  className="w-8.5 h-8.5 rounded-full bg-cream/5 border border-beige/15 flex items-center justify-center hover:bg-wood-warm hover:text-cream text-[#F8F4EC] transition-all hover:scale-105"
                  title="Instagram Page"
                >
                  <i className="fa-brands fa-instagram text-xs text-gold" />
                </a>
                <a
                  href="#"
                  className="w-8.5 h-8.5 rounded-full bg-cream/5 border border-beige/15 flex items-center justify-center hover:bg-wood-warm hover:text-cream text-[#F8F4EC] transition-all hover:scale-105"
                  title="Facebook Page"
                >
                  <i className="fa-brands fa-facebook text-xs text-gold" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-cream border-l-2 border-gold/40 pl-2.5">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-[#E7D8C9]/85 font-light">
                <li>
                  <a href="#about" className="hover:text-gold transition-colors block">About Our Salon</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-gold transition-colors block">Our Hair & Skin Treatments</a>
                </li>
                <li>
                  <a href="#features" className="hover:text-gold transition-colors block">Why Families Choose Us</a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-gold transition-colors block">Grooming Work Gallery</a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-gold transition-colors block">Client Reviews</a>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Services List */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-cream border-l-2 border-gold/40 pl-2.5">Featured Treatments</h4>
              <ul className="space-y-2 text-xs text-[#E7D8C9]/85 font-light">
                <li>• Precision Haircuts (Kids & Adults)</li>
                <li>• Keratin Protein Hair Reconstruction</li>
                <li>• Premium Glow facials (O3+)</li>
                <li>• Airbrush & HD Bridal Makeups</li>
                <li>• Therapeutic Nail Spa & Pedicure</li>
                <li>• Ammonia-free Global Hair Coloring</li>
              </ul>
            </div>

            {/* Col 4: Reach Us Info */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-cream border-l-2 border-gold/40 pl-2.5">Reach Us Directly</h4>
              <ul className="space-y-3.5 text-xs text-[#E7D8C9]/85 font-light">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span>2nd Floor, SMM Complex, Morabadi, Boreya, Ranchi, Jharkhand - 834006</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <a href="tel:7992200358" className="hover:underline hover:text-gold">
                    +91 7992200358
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>Daily: 10:00 AM – 08:30 PM</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright banner */}
          <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-xs text-[#E7D8C9]/70 font-light">
              Copyright © 2026 Hair Mechanic Family Salon. All Rights Reserved.
            </p>
            <p className="text-[10px] text-gold/60 font-light italic">
              Crafted with premium woody & natural aesthetics in Ranchi
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING ACTION CTA BUTTONS */}
      
      {/* Floating call now */}
      <a
        href="tel:7992200358"
        className="fixed bottom-20 left-4 z-40 p-4 rounded-full bg-wood-warm text-cream hover:bg-wood-dark shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-108 flex items-center justify-center border-2 border-beige shadow-[0_5px_15px_rgba(39,25,16,0.3)] hover:animate-pulse"
        title="Quick Call Now"
      >
        <Phone className="w-4 h-4 text-cream" />
      </a>

      {/* Floating WhatsApp */}
      <button
        onClick={triggerWhatsAppInquiry}
        className="fixed bottom-20 right-4 z-40 p-4 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-108 flex items-center justify-center border-2 border-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:animate-pulse"
        title="WhatsApp Support"
      >
        <MessageSquare className="w-4 h-4 text-white" />
      </button>

      {/* Floating Book Appointment quick bottom banner for mobile screens */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-[#1F120A] text-cream p-3 border-t border-gold/25 z-40 flex items-center justify-between shadow-2xl">
        <div className="pl-2">
          <p className="text-[9px] text-gold uppercase tracking-widest font-bold">Hair Mechanic Salon</p>
          <p className="text-xs font-serif font-black text-[#F8F4EC] tracking-tight">Where Style Meets Perfection</p>
        </div>
        <button
          onClick={openGeneralBooking}
          className="bg-wood-warm text-cream hover:bg-gold hover:text-espresso px-4.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
        >
          Book Now
        </button>
      </div>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-36 right-4 z-40 p-2.5 rounded-xl bg-wood-dark text-[#F8F4EC] hover:bg-wood-warm border border-beige/25 shadow-lg transition-all hover:translate-y-[-4px] flex items-center justify-center"
          title="Back to Top"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      )}

      {/* APPOINTMENT BOOKING MODAL PORTAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
      />

    </div>
  );
}

'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Form data:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', orderNumber: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.347389245063!2d34.01882947606253!3d34.99686627461659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e1763f1a3d7ad5%3A0x5a0b2c7a0e2e1f!2sNissi%20Beach!5e0!3m2!1sen!2s!4v1714390000000!5m2!1sen!2s";

  return (
    <div className="Contact min-h-screen py-12 px-4 sm:px-6" style={{ backgroundColor: "oklch(15.3% 0.006 107.1)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] mb-8">
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg text-white">
              Contact Us
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        {/* شبكة المحتوى */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* نموذج الاتصال */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 transition hover:shadow-2xl hover:bg-white/15">
            <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-white/80 font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition text-white placeholder-white/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition text-white placeholder-white/50"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label htmlFor="orderNumber" className="block text-white/80 font-medium mb-1">
                  Order Number (if applicable)
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition text-white placeholder-white/50"
                  placeholder="#ORD-12345"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/80 font-medium mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition resize-none text-white placeholder-white/50"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full linear-gradient(var(--tw-gradient-stops)) from-yellow-500 to-amber-500 text-black font-semibold py-3 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition shadow-md disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-center mt-2">✓ Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center mt-2">✗ Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition hover:shadow-2xl hover:bg-white/15">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                📧 Direct Support
              </h3>
              <p className="text-white/70 mb-3">
                For returns, refunds, or any inquiries, email us at:
              </p>
              <a
                href="mailto:support@islanderseasons.com"
                className="text-yellow-400 font-mono text-lg break-all hover:underline"
              >
                support@islanderseasons.com
              </a>
              <div className="mt-6 pt-4 border-t border-white/20">
                <h4 className="font-semibold text-white mb-2">📋 What to include in your email:</h4>
                <ul className="list-disc list-inside text-white/60 space-y-1 text-sm">
                  <li>Order number</li>
                  <li>Detailed description of the issue</li>
                  <li>Supporting images (if applicable)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition hover:shadow-2xl">
              <div className="relative w-full h-64 md:h-72">
                <iframe
                  src={mapSrc}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, margin: 0, padding: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Nissi Beach, Cyprus"
                />
              </div>
              <div className="p-4 text-center text-white/60 text-sm bg-white/5">
                <svg className="inline-block w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Our inspiration — Nissi Beach, Ayia Napa, Cyprus
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { X, Wallet, CreditCard, ArrowLeft, ExternalLink, Loader2, Eye, EyeOff } from 'lucide-react';
import { useSponsorModal } from '../../contexts/SponsorModalContext';
import { saveSponsor, trackButtonClick, createUserAccount } from '../../lib/firebase';

type Step = 'options' | 'crypto' | 'card-form' | 'card-success';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export default function SponsorPaymentModal() {
  const { isOpen, closeModal } = useSponsorModal();
  const [step, setStep] = useState<Step>('options');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('options');
    setFormData({ fullName: '', email: '', phone: '', password: '' });
    setErrors({});
    setSubmitError(null);
    closeModal();
  };

  const handleBack = () => {
    if (step === 'crypto' || step === 'card-form') {
      setStep('options');
    } else if (step === 'card-success') {
      setStep('card-form');
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create user account in Firebase Auth
      const authResult = await createUserAccount(formData.email, formData.password);
      
      if (!authResult.success && !authResult.existing) {
        setSubmitError('Failed to create account. Please try again.');
        return;
      }

      // Save sponsor to Firebase Firestore
      const result = await saveSponsor({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
      });

      if (result.success) {
        trackButtonClick('sponsor_form_submit', { step: 'success' });
        setStep('card-success');
      } else {
        setSubmitError('Failed to save your information. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option: 'crypto' | 'card-form') => {
    trackButtonClick(`sponsor_option_${option}`);
    setStep(option);
  };

  const renderContent = () => {
    switch (step) {
      case 'options':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-heading-lg text-text-primary font-bold mb-2">
                Become a Sponsor
              </h2>
              <p className="text-body-md text-text-secondary">
                Choose your preferred payment method
              </p>
            </div>

            <button
              onClick={() => handleOptionClick('crypto')}
              className="w-full p-6 bg-bg-surface border border-white/[0.08] rounded-xl hover:border-accent-primary/40 transition-all group flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-heading-md text-text-primary font-semibold mb-1">
                  Pay with Crypto
                </h3>
                <p className="text-body-sm text-text-secondary">
                  Connect your wallet to pay with ETH or tokens
                </p>
              </div>
            </button>

            <button
              onClick={() => handleOptionClick('card-form')}
              className="w-full p-6 bg-bg-surface border border-white/[0.08] rounded-xl hover:border-accent-primary/40 transition-all group flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent-primary to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-heading-md text-text-primary font-semibold mb-1">
                  Pay with Card
                </h3>
                <p className="text-body-sm text-text-secondary">
                  Secure checkout via Stripe
                </p>
              </div>
            </button>
          </div>
        );

      case 'crypto':
        return (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-body-sm">Back</span>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-heading-lg text-text-primary font-bold mb-2">
                Connect Wallet
              </h2>
              <p className="text-body-md text-text-secondary">
                Select a wallet to connect
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => trackButtonClick('wallet_connect', { wallet: 'metamask' })}
                className="w-full p-4 bg-bg-surface border border-white/[0.08] rounded-xl hover:border-orange-500/40 transition-all flex items-center gap-4"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  alt="MetaMask"
                  className="w-10 h-10"
                />
                <span className="text-heading-md text-text-primary font-medium">MetaMask</span>
              </button>

              <button 
                onClick={() => trackButtonClick('wallet_connect', { wallet: 'walletconnect' })}
                className="w-full p-4 bg-bg-surface border border-white/[0.08] rounded-xl hover:border-blue-500/40 transition-all flex items-center gap-4"
              >
                <svg className="w-10 h-10" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="300" rx="50" fill="#3B99FC"/>
                  <path d="M95.5 128C127.5 96 179.5 96 211.5 128L215.5 132C217 133.5 217 136 215.5 137.5L202 151C201.25 151.75 200 151.75 199.25 151L194 145.75C172 123.75 136 123.75 114 145.75L108.25 151.5C107.5 152.25 106.25 152.25 105.5 151.5L92 138C90.5 136.5 90.5 134 92 132.5L95.5 128ZM239.5 156L251.5 168C253 169.5 253 172 251.5 173.5L199 226C197.5 227.5 195 227.5 193.5 226L156 188.5C155.625 188.125 155 188.125 154.625 188.5L117.125 226C115.625 227.5 113.125 227.5 111.625 226L59 173.5C57.5 172 57.5 169.5 59 168L71 156C72.5 154.5 75 154.5 76.5 156L114 193.5C114.375 193.875 115 193.875 115.375 193.5L152.875 156C154.375 154.5 156.875 154.5 158.375 156L195.875 193.5C196.25 193.875 196.875 193.875 197.25 193.5L234.75 156C236.25 154.5 238.75 154.5 239.5 156Z" fill="white"/>
                </svg>
                <span className="text-heading-md text-text-primary font-medium">WalletConnect</span>
              </button>

              <button 
                onClick={() => trackButtonClick('wallet_connect', { wallet: 'coinbase' })}
                className="w-full p-4 bg-bg-surface border border-white/[0.08] rounded-xl hover:border-blue-600/40 transition-all flex items-center gap-4"
              >
                <svg className="w-10 h-10" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="56" height="56" rx="8" fill="#0052FF"/>
                  <path d="M28 44C36.8366 44 44 36.8366 44 28C44 19.1634 36.8366 12 28 12C19.1634 12 12 19.1634 12 28C12 36.8366 19.1634 44 28 44Z" fill="white"/>
                  <path d="M28 20C23.5817 20 20 23.5817 20 28C20 32.4183 23.5817 36 28 36C32.4183 36 36 32.4183 36 28C36 23.5817 32.4183 20 28 20Z" fill="#0052FF"/>
                </svg>
                <span className="text-heading-md text-text-primary font-medium">Coinbase Wallet</span>
              </button>
            </div>
          </div>
        );

      case 'card-form':
        return (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-body-sm">Back</span>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-heading-lg text-text-primary font-bold mb-2">
                Create Your CAMP Account
              </h2>
              <p className="text-body-md text-text-secondary">
                Join CoachAI Tech Camp as a sponsor
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-body-sm text-text-secondary mb-2">
                  Full Name <span className="text-semantic-error">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-surface border border-white/[0.1] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-semantic-error text-body-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-body-sm text-text-secondary mb-2">
                  Email Address <span className="text-semantic-error">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-surface border border-white/[0.1] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-semantic-error text-body-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-body-sm text-text-secondary mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-bg-surface border border-white/[0.1] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-body-sm text-text-secondary mb-2">
                  Password <span className="text-semantic-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-bg-surface border border-white/[0.1] rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                    placeholder="Create a password (min 6 characters)"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-semantic-error text-body-sm mt-1">{errors.password}</p>
                )}
              </div>

              {submitError && (
                <div className="p-3 bg-semantic-error/10 border border-semantic-error/30 rounded-lg">
                  <p className="text-semantic-error text-body-sm">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-body-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </button>
            </form>
          </div>
        );

      case 'card-success':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-semantic-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-semantic-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-heading-lg text-text-primary font-bold mb-3">
              Account Created!
            </h2>
            <p className="text-body-md text-text-secondary mb-2">
              Welcome, {formData.fullName}!
            </p>
            <p className="text-body-sm text-text-muted mb-8">
              You will receive a receipt for donation tax credit claim
            </p>

            <a
              href="https://stripe.com/checkout"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('stripe_checkout_redirect')}
              className="btn-primary px-8 py-4 text-body-lg inline-flex items-center gap-2"
            >
              <span>Proceed to Stripe Checkout</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleClose}
              className="block w-full mt-4 text-body-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-bg-spotlight to-bg-base border border-white/[0.1] rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.05]"
        >
          <X className="w-5 h-5" />
        </button>

        {renderContent()}
      </div>
    </div>
  );
}

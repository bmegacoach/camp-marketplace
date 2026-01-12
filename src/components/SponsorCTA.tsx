import { Check, ArrowRight, Layers } from 'lucide-react';
import { useSponsorModal } from '../contexts/SponsorModalContext';

interface SponsorCTAProps {
  variant?: 'default' | 'compact';
}

export default function SponsorCTA({ variant = 'default' }: SponsorCTAProps) {
  const { openModal } = useSponsorModal();

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-bg-spotlight to-bg-surface border border-white/[0.08] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-heading-md text-text-primary font-bold mb-2">
              Early Sponsors unlock exclusive benefits
            </h3>
            <p className="text-body-sm text-text-secondary">
              Lifetime founder rates, governance rights, completion guarantee, and 9% growth bi-annually.
            </p>
          </div>
          <button
            onClick={openModal}
            className="btn-primary px-8 py-3 text-body-md shadow-glow-accent inline-flex items-center gap-2 flex-shrink-0"
          >
            <span>SPONSOR NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-12">
      <div className="bg-gradient-to-br from-bg-spotlight to-bg-surface border border-white/[0.08] rounded-2xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary-muted rounded-full mb-6">
            <Layers className="w-4 h-4 text-accent-primary" />
            <span className="text-body-sm text-accent-primary font-semibold">Limited Sponsorship Slots</span>
          </div>
          
          <h2 className="text-display-sm text-text-primary font-bold mb-8">
            Early Sponsors unlock:
          </h2>

          <div className="bg-bg-primary/60 border border-accent-primary/30 rounded-xl p-8 mb-10">
            <ul className="space-y-4 text-left max-w-md mx-auto">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent-primary" />
                </div>
                <span className="text-body-lg text-text-primary">Lifetime founder rates</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent-primary" />
                </div>
                <span className="text-body-lg text-text-primary">Governance rights</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent-primary" />
                </div>
                <span className="text-body-lg text-text-primary">Completion Guarantee</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-semantic-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-semantic-success" />
                </div>
                <span className="text-body-lg text-text-primary">+ 9% growth bi-annually, via CAMP DeFi Treasury management</span>
              </li>
            </ul>
          </div>

          <button
            onClick={openModal}
            className="btn-primary px-12 py-4 text-body-lg shadow-glow-accent inline-flex items-center gap-2"
          >
            <span>SPONSOR NOW</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { createContext, useContext, useState, ReactNode } from 'react';

interface SponsorModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SponsorModalContext = createContext<SponsorModalContextType | undefined>(undefined);

export function SponsorModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SponsorModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SponsorModalContext.Provider>
  );
}

export function useSponsorModal() {
  const context = useContext(SponsorModalContext);
  if (!context) {
    throw new Error('useSponsorModal must be used within SponsorModalProvider');
  }
  return context;
}

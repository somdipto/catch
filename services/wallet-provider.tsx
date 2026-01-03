import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { MOCK_USER } from '../constants';
import { UserProfile } from '../types';

interface WalletContextType {
  connected: boolean;
  user: UserProfile | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const connect = () => {
    // Simulate wallet connection delay
    setTimeout(() => {
      setConnected(true);
      setUser(MOCK_USER);
    }, 600);
  };

  const disconnect = () => {
    setConnected(false);
    setUser(null);
  };

  return (
    <WalletContext.Provider value={{ connected, user, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
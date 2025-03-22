import { useState, useCallback } from 'react';
import { Client } from 'xrpl';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import Xrp from '@ledgerhq/hw-app-xrp';
import type Transport from '@ledgerhq/hw-transport';
import { TEXT } from '@/constants/text';

interface UseLedgerReturn {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  address: string | null;
  error: string | null;
  isLoading: boolean;
}

export const useLedger = (): UseLedgerReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transport, setTransport] = useState<Transport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connect = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Vérifier si le navigateur supporte WebUSB
      if (!navigator?.usb) {
        throw new Error(TEXT.ledger.browser_not_supported);
      }

      // 2. Demander l'accès USB
      const transport = await TransportWebUSB.create();
      
      // 3. Créer l'instance XRP
      const xrp = new Xrp(transport);
      
      try {
        // 4. Tenter d'obtenir l'adresse
        const { address } = await xrp.getAddress("44'/144'/0'/0/0");
        setAddress(address);
        setTransport(transport);
        setIsConnected(true);
        setError(null);
      } catch (ledgerErr) {
        throw new Error(TEXT.ledger.check_ledger);
      }
    } catch (err) {
      let errorMessage = TEXT.ledger.connection_error;
      
      if (err instanceof Error) {
        if (err.message.includes('Access denied') || err.message.includes('SecurityError')) {
          errorMessage = TEXT.ledger.access_denied;
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setIsConnected(false);
      if (transport) {
        await transport.close();
        setTransport(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setIsLoading(true);
    try {
      if (transport) {
        await transport.close();
        setTransport(null);
      }
      setIsConnected(false);
      setAddress(null);
      setError(null);
    } catch (err) {
      setError(TEXT.ledger.disconnect_error);
    } finally {
      setIsLoading(false);
    }
  }, [transport]);

  return {
    connect,
    disconnect,
    isConnected,
    address,
    error,
    isLoading,
  };
}; 
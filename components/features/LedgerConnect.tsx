'use client';

import { useLedger } from '@/hooks/useLedger';
import { Button } from '@/components';
import { TEXT } from '@/constants/text';

export const LedgerConnect = () => {
  const { connect, disconnect, isConnected, address, error, isLoading } = useLedger();

  if (error) {
    alert(error);
  }

  return (
    <div className="flex items-center gap-4">
      {isConnected && address && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300 font-medium">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        </div>
      )}
      
      <Button
        onClick={isConnected ? disconnect : connect}
        variant={isConnected ? "secondary" : "primary"}
        size="md"
        isLoading={isLoading}
      >
        {isConnected ? TEXT.ledger.disconnect : TEXT.ledger.connect}
      </Button>
    </div>
  );
}; 
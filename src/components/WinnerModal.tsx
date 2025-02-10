import React, { useEffect } from 'react';
import { WinnerModalProps } from '../types';
import { Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WinnerModal: React.FC<WinnerModalProps> = ({ house, onClose }) => {
  useEffect(() => {
    // Create fireworks effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create fireworks
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all
        animate-bounce-slow`}>
        <div className="flex flex-col items-center">
          <Trophy className={`w-16 h-16 ${house.color.text} mb-4 animate-pulse`} />
          <h2 className="text-2xl font-bold text-center mb-4">
            ¡{house.name} ha ganado la copa de las casas!
          </h2>
          <p className="text-gray-600 text-center mb-6">¡Felicidades!</p>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-full ${house.color.primary} text-white font-semibold 
              hover:opacity-90 transition-opacity shadow-lg`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
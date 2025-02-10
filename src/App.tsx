import React, { useState, useEffect } from 'react';
import { House } from './types';
import { HouseCylinder } from './components/HouseCylinder';
import { WinnerModal } from './components/WinnerModal';
import { Volume2, VolumeX } from 'lucide-react';

const initialHouses: House[] = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    color: {
      primary: 'bg-red-600',
      secondary: 'bg-yellow-500',
      text: 'text-red-600'
    },
    points: 0
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    color: {
      primary: 'bg-green-600',
      secondary: 'bg-gray-300',
      text: 'text-green-600'
    },
    points: 0
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    color: {
      primary: 'bg-yellow-500',
      secondary: 'bg-black',
      text: 'text-yellow-500'
    },
    points: 0
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    color: {
      primary: 'bg-blue-600',
      secondary: 'bg-gray-300',
      text: 'text-blue-600'
    },
    points: 0
  }
];

function App() {
  const [houses, setHouses] = useState<House[]>(() => {
    const saved = localStorage.getItem('hogwartsHouses');
    return saved ? JSON.parse(saved) : initialHouses;
  });
  
  const [winner, setWinner] = useState<House | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    localStorage.setItem('hogwartsHouses', JSON.stringify(houses));
    
    const winningHouse = houses.find(house => house.points >= 100);
    if (winningHouse) {
      setWinner(winningHouse);
    }
  }, [houses]);

  const handlePointsChange = (houseId: string, points: number) => {
    setHouses(houses.map(house => 
      house.id === houseId ? { ...house, points } : house
    ));
  };

  const handleCloseModal = () => {
    setWinner(null);
    setHouses(houses.map(house => ({ ...house, points: 0 })));
  };

  const toggleMute = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <audio
        id="bgMusic"
        autoPlay
        loop
        className="hidden"
        src="/music/theme.mp3"
      />
      
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMute}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-gray-800" />
          ) : (
            <Volume2 className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Copa de las Casas de Hogwarts
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {houses.map(house => (
            <HouseCylinder
              key={house.id}
              house={house}
              onPointsChange={(points) => handlePointsChange(house.id, points)}
            />
          ))}
        </div>
      </div>

      {winner && <WinnerModal house={winner} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import GameContainer from "@/components/game-container";
import canImage from "@assets/can_1755515297306.png";
import combImage from "@assets/comb_1755515297306.png";
import cupImage from "@assets/cup_1755515297306.png";
import dogImage from "@assets/dog_1755515297306.png";
import flowerImage from "@assets/flower_1755515297307.png";

const GAME_IMAGES = [
  { src: canImage, word: "can" },
  { src: combImage, word: "comb" },
  { src: cupImage, word: "cup" },
  { src: dogImage, word: "dog" },
  { src: flowerImage, word: "flower" },
];

export default function GamePage() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Generate unique session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
  }, []);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-child-cream flex items-center justify-center">
        <div className="text-2xl font-child text-gray-800">Loading...</div>
      </div>
    );
  }

  return <GameContainer sessionId={sessionId} images={GAME_IMAGES} />;
}

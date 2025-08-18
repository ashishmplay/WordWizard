import { useEffect, useState } from "react";
import GameContainer from "@/components/game-container";
import StartScreen from "@/components/start-screen";
import appleImage from "@assets/apple_1755515297303.png";
import babyImage from "@assets/baby_1755515297304.png";
import bananaImage from "@assets/banana_1755515297304.png";
import bathtubImage from "@assets/bathtub_1755515297305.png";
import bedImage from "@assets/bed_1755515297305.png";
import bookImage from "@assets/book_1755515297305.png";
import canImage from "@assets/can_1755515297306.png";
import combImage from "@assets/comb_1755515297306.png";
import cupImage from "@assets/cup_1755515297306.png";
import dogImage from "@assets/dog_1755515297306.png";
import flowerImage from "@assets/flower_1755515297307.png";

const GAME_IMAGES = [
  { src: appleImage, word: "apple" },
  { src: babyImage, word: "baby" },
  { src: bananaImage, word: "banana" },
  { src: bathtubImage, word: "bathtub" },
  { src: bedImage, word: "bed" },
  { src: bookImage, word: "book" },
  { src: canImage, word: "can" },
  { src: combImage, word: "comb" },
  { src: cupImage, word: "cup" },
  { src: dogImage, word: "dog" },
  { src: flowerImage, word: "flower" },
];

export default function GamePage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    // Generate unique session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleReturnHome = () => {
    setGameStarted(false);
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-child-cream flex items-center justify-center">
        <div className="text-2xl font-child text-gray-800">Loading...</div>
      </div>
    );
  }

  if (!gameStarted) {
    return <StartScreen onStartGame={handleStartGame} totalImages={GAME_IMAGES.length} />;
  }

  return <GameContainer sessionId={sessionId} images={GAME_IMAGES} shouldStartRecording={true} onReturnHome={handleReturnHome} />;
}

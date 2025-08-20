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
import cakeImage from "@assets/cake_1755718303273.jpg";
import catImage from "@assets/cat_1755718303274.jpg";
import crackersImage from "@assets/crackers_1755718303275.jpg";
import eggImage from "@assets/egg_1755718303275.jpg";
import elephantImage from "@assets/elephant_1755718303275.jpg";
import forkImage from "@assets/fork_1755718303275.jpg";
import hammerImage from "@assets/hammer_1755718303276.png";
import hangerImage from "@assets/hanger_1755718303276.png";
import hatImage from "@assets/hat_1755718303277.jpg";
import knifeImage from "@assets/knife_1755718303277.jpg";
import ladderImage from "@assets/ladder_1755718303278.png";
import monkeyImage from "@assets/monkey_1755718303278.png";
import nailsImage from "@assets/nails_1755718303278.png";
import pieImage from "@assets/pie_1755718303279.png";
import potatoesImage from "@assets/potatoes_1755718303279.jpg";
import tableImage from "@assets/table_1755718303279.jpg";
import thankYouImage from "@assets/thank_you_1755718303279.jpg";
import wagonImage from "@assets/wagon_1755718303280.jpg";
import witchImage from "@assets/witch_1755718303280.png";
import yesImage from "@assets/yes_1755718303280.jpg";
import baaImage from "@assets/baa_1755720303013.png";
import bowWowImage from "@assets/bhow%20bhow_1755720303014.png";
import giveImage from "@assets/give_1755720303014.png";
import mooImage from "@assets/moo_1755720303014.png";
import openImage from "@assets/open_1755720303014.png";
import popImage from "@assets/pop_1755720303015.png";
import upImage from "@assets/Up_1755720303015.png";

const GAME_IMAGES = [
  { src: appleImage, word: "apple" },
  { src: babyImage, word: "baby" },
  { src: bananaImage, word: "banana" },
  { src: bathtubImage, word: "bathtub" },
  { src: bedImage, word: "bed" },
  { src: bookImage, word: "book" },
  { src: cakeImage, word: "cake" },
  { src: canImage, word: "can" },
  { src: catImage, word: "cat" },
  { src: combImage, word: "comb" },
  { src: crackersImage, word: "crackers" },
  { src: cupImage, word: "cup" },
  { src: dogImage, word: "dog" },
  { src: eggImage, word: "egg" },
  { src: elephantImage, word: "elephant" },
  { src: flowerImage, word: "flower" },
  { src: forkImage, word: "fork" },
  { src: hammerImage, word: "hammer" },
  { src: hangerImage, word: "hanger" },
  { src: hatImage, word: "hat" },
  { src: knifeImage, word: "knife" },
  { src: ladderImage, word: "ladder" },
  { src: monkeyImage, word: "monkey" },
  { src: nailsImage, word: "nails" },
  { src: pieImage, word: "pie" },
  { src: potatoesImage, word: "potatoes" },
  { src: tableImage, word: "table" },
  { src: thankYouImage, word: "thank you" },
  { src: wagonImage, word: "wagon" },
  { src: witchImage, word: "witch" },
  { src: yesImage, word: "yes" },
  { src: baaImage, word: "baa" },
  { src: bowWowImage, word: "bow wow" },
  { src: giveImage, word: "give" },
  { src: mooImage, word: "moo" },
  { src: openImage, word: "open" },
  { src: popImage, word: "pop" },
  { src: upImage, word: "up" },
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

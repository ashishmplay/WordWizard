import { Button } from "@/components/ui/button";
import { Mic, Play, Eye } from "lucide-react";
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

const PREVIEW_IMAGES = [
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

interface StartScreenProps {
  onStartGame: () => void;
  totalImages: number;
}

export default function StartScreen({ onStartGame, totalImages }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-child-cream font-child flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Speech Learning Game
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600">
            Let's practice saying words together!
          </p>
        </div>

        {/* Image Preview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Words</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 mb-6 max-w-2xl mx-auto">
            {PREVIEW_IMAGES.map((image, index) => (
              <div key={index} className="bg-white rounded-xl p-2 shadow-lg border-2 border-gray-200">
                <img
                  src={image.src}
                  alt={image.word}
                  className="w-full h-12 sm:h-16 object-contain rounded-lg"
                />
                <p className="text-xs font-bold text-gray-700 text-center mt-1 truncate">{image.word}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 space-y-6">
          <div className="bg-child-blue bg-opacity-10 rounded-2xl p-6 border-2 border-child-blue border-opacity-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Eye className="w-6 h-6 mr-3 text-child-blue" />
              How to Play
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="bg-child-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">
                  1
                </div>
                <p>Look at the picture and read the word</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-child-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">
                  2
                </div>
                <p>Say the word out loud clearly</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-child-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">
                  3
                </div>
                <p>Parent clicks "Next" to continue</p>
              </div>
            </div>
          </div>

          <div className="bg-child-green bg-opacity-10 rounded-2xl p-6 border-2 border-child-green border-opacity-20">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
              <Mic className="w-5 h-5 mr-2 text-child-green" />
              Recording Information
            </h3>
            <p className="text-lg text-gray-700">
              We'll record your voice throughout the session to help track your progress. 
              There are <span className="font-bold text-child-purple">{totalImages} pictures</span> to go through.
            </p>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStartGame}
          size="lg"
          className="bg-child-blue hover:bg-blue-600 text-white px-12 py-6 rounded-3xl text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-6 h-6 mr-3" />
          Start Game
        </Button>

        {/* Permission Note */}
        <p className="mt-6 text-sm text-gray-500">
          Please allow microphone access when prompted to record your session
        </p>
      </div>
    </div>
  );
}
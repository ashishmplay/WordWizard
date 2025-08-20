import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Play, Eye, RotateCcw } from "lucide-react";

interface StartScreenProps {
  onStartGame: (startIndex?: number) => void;
  totalImages: number;
  imageWords: string[];
}

export default function StartScreen({ onStartGame, totalImages, imageWords = [] }: StartScreenProps) {
  const [startFromWord, setStartFromWord] = useState<string>("");

  const handleStartGame = () => {
    if (startFromWord) {
      const startIndex = parseInt(startFromWord);
      onStartGame(startIndex);
    } else {
      onStartGame();
    }
  };
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

        {/* Word Selection */}
        <div className="mb-8 bg-child-orange bg-opacity-10 rounded-2xl p-6 border-2 border-child-orange border-opacity-20">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <RotateCcw className="w-5 h-5 mr-2 text-child-orange" />
            Continue from where you left off?
          </h3>
          <div className="space-y-4">
            <Select value={startFromWord} onValueChange={setStartFromWord}>
              <SelectTrigger className="w-full max-w-md mx-auto bg-white border-2 border-gray-300 rounded-xl text-lg p-4 h-auto">
                <SelectValue placeholder="Start from the beginning" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-300 rounded-xl max-h-64">
                {imageWords.map((word, index) => (
                  <SelectItem key={index} value={index.toString()} className="text-lg p-3 hover:bg-child-cream">
                    {index + 1}. {word}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">
              {startFromWord && imageWords.length > 0
                ? `You'll start from "${imageWords[parseInt(startFromWord)]}" (word ${parseInt(startFromWord) + 1} of ${totalImages})`
                : "Select a word to start from, or begin from the first word"
              }
            </p>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStartGame}
          size="lg"
          className="bg-child-blue hover:bg-blue-600 text-white px-12 py-6 rounded-3xl text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-6 h-6 mr-3" />
          {startFromWord && imageWords.length > 0 ? `Start from "${imageWords[parseInt(startFromWord)]}"` : "Start Game"}
        </Button>

        {/* Permission Note */}
        <p className="mt-6 text-sm text-gray-500">
          Please allow microphone access when prompted to record your session
        </p>
      </div>
    </div>
  );
}
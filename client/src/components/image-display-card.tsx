import { useEffect, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";

interface GameImage {
  src: string;
  word: string;
}

interface ImageDisplayCardProps {
  image: GameImage;
  imageNumber: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const ImageDisplayCard = forwardRef<HTMLDivElement, ImageDisplayCardProps>(
  ({ image, imageNumber, onSwipeLeft, onSwipeRight }, ref) => {
    const { speak } = useTextToSpeech();

    // Auto-play word pronunciation when image changes
    useEffect(() => {
      const timer = setTimeout(() => {
        speak(image.word);
      }, 500); // Small delay to let the image load

      return () => clearTimeout(timer);
    }, [image.word, speak]);

    const handlePlayWord = () => {
      speak(image.word);
    };

    return (
      <div ref={ref} className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 text-center touch-pan-y">
        {/* Image Container */}
        <div className="mb-8">
          <div className="mx-auto w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            <img
              src={image.src}
              alt={image.word}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
            />
          </div>
        </div>
        
        {/* Word Display with Audio Button */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 tracking-wide">
              {image.word}
            </h1>
            <Button
              onClick={handlePlayWord}
              size="sm"
              className="bg-child-purple hover:bg-purple-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              aria-label={`Play pronunciation of ${image.word}`}
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Encouragement Text */}
        <div className="mb-8">
          <p className="text-xl sm:text-2xl text-gray-600 font-medium">
            Say the word out loud!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            On mobile: Swipe left for next word
          </p>
        </div>
      </div>
    );
  }
);

ImageDisplayCard.displayName = "ImageDisplayCard";

export default ImageDisplayCard;

import { forwardRef } from "react";
import { useSwipe } from "@/hooks/use-swipe";

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
        
        {/* Word Display */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 tracking-wide">
            {image.word}
          </h1>
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

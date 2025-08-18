import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface ParentControlsProps {
  currentIndex: number;
  totalImages: number;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export default function ParentControls({ 
  currentIndex, 
  totalImages, 
  onNext, 
  onPrevious, 
  isLoading 
}: ParentControlsProps) {
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === totalImages - 1;

  return (
    <div className="mt-8 flex justify-center space-x-4">
      {/* Previous Button */}
      <Button
        onClick={onPrevious}
        disabled={isFirstImage || isLoading}
        variant={isFirstImage ? "secondary" : "default"}
        size="lg"
        className={`px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-200 ${
          isFirstImage 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
            : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Previous
      </Button>
      
      {/* Next Button */}
      <Button
        onClick={onNext}
        disabled={isLoading}
        size="lg"
        className="bg-child-blue hover:bg-blue-600 text-white px-12 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        {isLastImage ? (
          <>
            Finish
            <Check className="w-5 h-5 ml-2" />
          </>
        ) : (
          <>
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}

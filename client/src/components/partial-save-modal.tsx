import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, Download, Home } from "lucide-react";

interface PartialSaveModalProps {
  show: boolean;
  onGoHome: () => void;
  isUploading: boolean;
  sessionId: string;
  wordsCompleted: number;
  totalWords: number;
}

export default function PartialSaveModal({ 
  show, 
  onGoHome,
  isUploading,
  sessionId,
  wordsCompleted,
  totalWords
}: PartialSaveModalProps) {
  const handleDownloadRecording = () => {
    // Create download link
    const downloadUrl = `/api/recordings/${sessionId}/download`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `partial-speech-session-${sessionId}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={show}>
      <DialogContent className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg mx-4 text-center border-none">
        <DialogTitle className="sr-only">Session Saved</DialogTitle>
        <DialogDescription className="sr-only">
          Your partial recording has been saved. You can download it or return to the home screen.
        </DialogDescription>
        <div className="mb-6">
          <Save className="w-16 h-16 text-child-green mb-4 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Recording Saved!</h2>
          <p className="text-xl text-gray-600">
            You completed {wordsCompleted} out of {totalWords} words
          </p>
        </div>
        
        <div className="mb-6">
          <div className="bg-child-green text-white px-6 py-3 rounded-2xl inline-flex items-center space-x-2">
            <Save className="w-5 h-5" />
            <span className="text-lg font-semibold">
              {isUploading ? "Saving Recording..." : "Recording Saved Successfully"}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {!isUploading && (
            <Button
              onClick={handleDownloadRecording}
              size="lg"
              className="bg-child-purple hover:bg-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
            >
              <Download className="w-5 h-5 mr-3" />
              Download Partial Recording
            </Button>
          )}
          
          <Button
            onClick={onGoHome}
            disabled={isUploading}
            size="lg"
            className="bg-child-blue hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
          >
            <Home className="w-5 h-5 mr-3" />
            Return to Home Screen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
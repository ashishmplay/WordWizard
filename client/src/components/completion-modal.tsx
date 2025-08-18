import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Mic, MicOff, Download } from "lucide-react";

interface CompletionModalProps {
  show: boolean;
  onStartNewSession: () => void;
  onClose?: () => void;
  isUploading: boolean;
  sessionId: string;
}

export default function CompletionModal({ 
  show, 
  onStartNewSession, 
  onClose,
  isUploading,
  sessionId 
}: CompletionModalProps) {
  const handleDownloadRecording = () => {
    // Create download link
    const downloadUrl = `/api/recordings/${sessionId}/download`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `speech-session-${sessionId}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={show} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg mx-4 text-center border-none">
        <DialogTitle className="sr-only">Session Complete</DialogTitle>
        <DialogDescription className="sr-only">
          Congratulations on completing the speech learning session. You can download your recording or start a new session.
        </DialogDescription>
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-child-orange mb-4 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Great Job!</h2>
          <p className="text-xl text-gray-600">You completed all the words!</p>
        </div>
        
        <div className="mb-6">
          <div className="bg-child-green text-white px-6 py-3 rounded-2xl inline-flex items-center space-x-2">
            {isUploading ? (
              <>
                <Mic className="w-5 h-5 animate-pulse" />
                <span className="text-lg font-semibold">Saving Recording...</span>
              </>
            ) : (
              <>
                <MicOff className="w-5 h-5" />
                <span className="text-lg font-semibold">Recording Saved</span>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {!isUploading && (
            <Button
              onClick={handleDownloadRecording}
              size="lg"
              className="bg-child-green hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
            >
              <Download className="w-5 h-5 mr-3" />
              Download Recording
            </Button>
          )}
          
          <Button
            onClick={onStartNewSession}
            disabled={isUploading}
            size="lg"
            className="bg-child-blue hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
          >
            Start New Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

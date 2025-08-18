import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorModalProps {
  show: boolean;
  onRetry: () => void;
}

export default function ErrorModal({ show, onRetry }: ErrorModalProps) {
  return (
    <Dialog open={show}>
      <DialogContent className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center border-none">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Microphone Access Needed</h2>
          <p className="text-gray-600">Please allow microphone access to record the session.</p>
        </div>
        
        <Button
          onClick={onRetry}
          size="lg"
          className="bg-child-blue hover:bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg font-bold"
        >
          Try Again
        </Button>
      </DialogContent>
    </Dialog>
  );
}

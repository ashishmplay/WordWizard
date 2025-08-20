import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ImageDisplayCard from "./image-display-card";
import ParentControls from "./parent-controls";
import CompletionModal from "./completion-modal";
import ErrorModal from "./error-modal";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { useSwipe } from "@/hooks/use-swipe";
import { useToast } from "@/hooks/use-toast";

interface GameImage {
  src: string;
  word: string;
}

interface GameContainerProps {
  sessionId: string;
  images: GameImage[];
  shouldStartRecording?: boolean;
  onReturnHome?: () => void;
}

export default function GameContainer({ sessionId, images, shouldStartRecording = true, onReturnHome }: GameContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showError, setShowError] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    isRecording,
    isPaused,
    recordingError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    audioBlob
  } = useAudioRecorder();

  // Swipe functionality for mobile
  const swipeRef = useSwipe({
    onSwipeLeft: () => {
      if (currentIndex < images.length - 1) {
        handleNext();
      }
    },
    onSwipeRight: () => {
      if (currentIndex > 0) {
        handlePrevious();
      }
    },
    threshold: 75
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/sessions", {
        sessionId,
        totalImages: images.length,
        currentIndex: 0,
        isCompleted: false
      });
      return response.json();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create session",
        variant: "destructive"
      });
    }
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: async ({ index, completed }: { index: number; completed: boolean }) => {
      const response = await apiRequest("PATCH", `/api/sessions/${sessionId}`, {
        currentIndex: index,
        isCompleted: completed
      });
      return response.json();
    }
  });

  // Upload recording mutation
  const uploadRecordingMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      const formData = new FormData();
      formData.append('audio', blob, `recording_${sessionId}.wav`);
      formData.append('sessionId', sessionId);
      
      const response = await fetch('/api/recordings', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload recording');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Recording saved successfully",
        variant: "default"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save recording",
        variant: "destructive"
      });
    }
  });

  // Initialize session and recording
  useEffect(() => {
    createSessionMutation.mutate();
    if (shouldStartRecording) {
      startRecording();
    }
  }, [shouldStartRecording]);

  // Handle recording error
  useEffect(() => {
    if (recordingError) {
      setShowError(true);
    }
  }, [recordingError]);

  // Handle session completion
  useEffect(() => {
    if (audioBlob && showCompletion) {
      uploadRecordingMutation.mutate(audioBlob);
    }
  }, [audioBlob, showCompletion]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateSessionMutation.mutate({ index: newIndex, completed: false });
    } else {
      // Session completed
      stopRecording();
      updateSessionMutation.mutate({ index: currentIndex, completed: true });
      setShowCompletion(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      updateSessionMutation.mutate({ index: newIndex, completed: false });
    }
  };

  const handleStartNewSession = () => {
    setCurrentIndex(0);
    setShowCompletion(false);
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    window.location.reload(); // Simple way to restart with new session
  };

  const handleCloseCompletion = () => {
    setShowCompletion(false);
    if (onReturnHome) {
      onReturnHome();
    }
  };

  const handleRetryMicrophone = () => {
    setShowError(false);
    startRecording();
  };

  const currentImage = images[currentIndex];
  const progress = ((currentIndex + 1) / images.length) * 100;

  return (
    <div className="min-h-screen bg-child-cream font-child flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg p-4 sm:p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Progress Section */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl sm:text-3xl font-bold text-gray-800">
              Image {currentIndex + 1} of {images.length}
            </div>
            {/* Progress Bar */}
            <div className="w-32 sm:w-48 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-child-orange h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Recording Status */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            isRecording && !isPaused
              ? 'bg-child-purple text-white' 
              : isPaused 
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              isRecording && !isPaused 
                ? 'bg-red-500 animate-pulse' 
                : isPaused 
                ? 'bg-yellow-300 animate-pulse'
                : 'bg-gray-400'
            }`} />
            <span className="text-lg font-semibold">
              {isRecording && !isPaused 
                ? 'Recording' 
                : isPaused 
                ? 'Paused (Speaking)'
                : 'Recording Stopped'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full">
          <ImageDisplayCard
            ref={swipeRef}
            image={currentImage}
            imageNumber={currentIndex + 1}
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrevious}
            onSpeechStart={pauseRecording}
            onSpeechEnd={resumeRecording}
          />
          
          <ParentControls
            currentIndex={currentIndex}
            totalImages={images.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLoading={updateSessionMutation.isPending}
          />
        </div>
      </main>

      <CompletionModal
        show={showCompletion}
        onStartNewSession={handleStartNewSession}
        onClose={handleCloseCompletion}
        isUploading={uploadRecordingMutation.isPending}
        sessionId={sessionId}
      />

      <ErrorModal
        show={showError}
        onRetry={handleRetryMicrophone}
      />
    </div>
  );
}

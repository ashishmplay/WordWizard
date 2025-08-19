import { useCallback, useRef } from "react";

export function useTextToSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    if (utteranceRef.current) {
      speechSynthesis.cancel();
    }

    // Check if speech synthesis is available
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech settings
    utterance.rate = 0.8; // Slightly slower for children
    utterance.pitch = 1.1; // Slightly higher pitch for children
    utterance.volume = 0.3; // Very low volume to minimize recording interference
    
    // Try to use a child-friendly voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('female') || voice.name.includes('woman') || voice.name.includes('child'))
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    utteranceRef.current = null;
  }, []);

  return { speak, stop };
}
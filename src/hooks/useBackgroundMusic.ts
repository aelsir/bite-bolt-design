import { useState, useEffect, useRef } from 'react';

export const useBackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    
    // Using a restaurant ambience audio file
    // This is a direct MP3 link that should work
    audio.src = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_ambiences_restaurant_busy_chatter_cutlery_movement_001_24004.mp3';
    
    // Set audio properties
    audio.loop = true;
    audio.volume = 0.1; // Very low volume (10%)
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    
    // Handle audio events
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audio.addEventListener('error', () => {
      console.log('Primary audio failed, trying fallback');
      // Try a different source
      audio.src = 'https://actions.google.com/sounds/v1/ambiences/restaurant_ambience.ogg';
      audio.load();
    });

    audioRef.current = audio;

    // Function to attempt playing audio
    const attemptPlay = async () => {
      if (!hasUserInteracted) return;
      
      try {
        await audio.play();
        setIsMuted(false);
      } catch (error) {
        console.log('Audio play failed:', error);
        setIsMuted(true);
      }
    };

    // Listen for user interaction to enable audio
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      if (isLoaded && !isMuted) {
        attemptPlay();
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    // Try to play when loaded and user has interacted
    if (audio.readyState >= 3 && hasUserInteracted) {
      attemptPlay();
    }

    return () => {
      audio.pause();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [hasUserInteracted, isLoaded, isMuted]);

  const toggleMute = async () => {
    if (!audioRef.current || !isLoaded) return;

    setHasUserInteracted(true);

    if (isMuted) {
      try {
        await audioRef.current.play();
        audioRef.current.volume = 0.1;
        setIsMuted(false);
      } catch (error) {
        console.log('Failed to play audio:', error);
      }
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return {
    isMuted,
    isLoaded,
    hasUserInteracted,
    toggleMute
  };
};
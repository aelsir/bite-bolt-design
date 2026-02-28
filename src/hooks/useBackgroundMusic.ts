import { useState, useEffect, useRef } from 'react';

export const useBackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    
    // YouTube video ID: kqWmBC2jsN0
    // Using a converted MP3 version (in a real app, you'd host this file)
    // For demo purposes, using a similar ambient restaurant sound
    audio.src = 'https://www.soundjay.com/misc/sounds/restaurant-ambience.mp3';
    
    // Set audio properties
    audio.loop = true;
    audio.volume = 0.15; // Very low volume (15%)
    audio.preload = 'auto';
    
    // Handle audio events
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audio.addEventListener('error', () => {
      console.log('Audio failed to load, using fallback');
      // Fallback to a different ambient sound
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
      setIsLoaded(true);
    });

    audioRef.current = audio;

    // Auto-play when loaded (browsers may block this)
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log('Autoplay blocked by browser');
        setIsMuted(true);
      }
    };

    if (audio.readyState >= 3) {
      playAudio();
    } else {
      audio.addEventListener('canplaythrough', playAudio, { once: true });
    }

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', () => {});
      audio.removeEventListener('error', () => {});
    };
  }, []);

  const toggleMute = async () => {
    if (!audioRef.current || !isLoaded) return;

    if (isMuted) {
      try {
        await audioRef.current.play();
        audioRef.current.volume = 0.15;
        setIsMuted(false);
      } catch (error) {
        console.log('Failed to play audio');
      }
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return {
    isMuted,
    isLoaded,
    toggleMute
  };
};
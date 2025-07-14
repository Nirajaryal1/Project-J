'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Square, Loader2 } from 'lucide-react';
import { getTranscriptionAndSummaryAction } from '@/app/actions';
import { type JournalEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';

interface VoiceRecorderProps {
  onNewEntry: (entry: JournalEntry) => void;
}

export function VoiceRecorder({ onNewEntry }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  };

  const handleStartRecording = async () => {
    if (typeof window === 'undefined' || !navigator.mediaDevices) {
      toast({
        variant: 'destructive',
        title: 'Unsupported Browser',
        description: 'Audio recording is not supported in this environment.',
      });
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const options = { mimeType: 'audio/webm;codecs=opus' };
      mediaRecorder.current = new MediaRecorder(stream, options);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: options.mimeType });
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        if (audioBlob.size === 0) {
          toast({ variant: 'destructive', title: 'Recording Error', description: 'No audio was recorded.' });
          setIsProcessing(false);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const { transcript, summary } = await getTranscriptionAndSummaryAction(base64Audio);
            onNewEntry({
              id: new Date().toISOString(),
              date: new Date(),
              audioDataUri: base64Audio,
              transcript,
              summary,
            });
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Processing Error',
              description: error instanceof Error ? error.message : 'An unknown error occurred.',
            });
          } finally {
            setIsProcessing(false);
          }
        };
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setTimer(0);
      timerInterval.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Microphone Error',
        description: 'Could not access microphone. Please check permissions.',
      });
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
      stopTimer();
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Card className="w-full shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className='font-headline'>New Journal Entry</span>
           { (isRecording || isProcessing) && <Badge variant="destructive" className="animate-pulse">{isRecording ? "RECORDING" : "PROCESSING"}</Badge> }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="text-6xl font-mono font-bold text-primary tabular-nums">
          {formatTime(timer)}
        </div>
        <Button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={isProcessing || !isClient}
          size="lg"
          className="w-48 h-16 rounded-full text-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isProcessing ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : isRecording ? (
            <Square className="h-8 w-8 mr-2" />
          ) : (
            <Mic className="h-8 w-8 mr-2" />
          )}
          {isProcessing ? 'Processing...' : isRecording ? 'Stop' : 'Record'}
        </Button>
      </CardContent>
    </Card>
  );
}

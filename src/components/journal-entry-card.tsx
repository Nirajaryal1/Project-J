'use client';
import { useState, useEffect } from 'react';
import { type JournalEntry } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Calendar, FileText, Sparkles } from 'lucide-react';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const [formattedDate, setFormattedDate] = useState('');
  const [detailedFormattedDate, setDetailedFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(entry.date).toLocaleString());
    setDetailedFormattedDate(new Date(entry.date).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, [entry.date]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full flex flex-col cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200">
          <CardHeader>
            <CardTitle className="font-headline text-lg truncate">{entry.summary}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {entry.transcript}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto">View Details</Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Journal Entry</DialogTitle>
          <DialogDescription>
            {detailedFormattedDate}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              AI Summary
            </h3>
            <p className="text-sm text-foreground/80">{entry.summary}</p>
          </div>
          <audio controls src={entry.audioDataUri} className="w-full">
            Your browser does not support the audio element.
          </audio>
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-primary">
              <FileText className="h-4 w-4" />
              Transcript
            </h3>
            <ScrollArea className="h-48 rounded-md border p-4">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {entry.transcript}
              </p>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

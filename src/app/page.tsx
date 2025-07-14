'use client';

import { useState } from 'react';
import { type JournalEntry } from '@/lib/types';
import { VoiceRecorder } from '@/components/voice-recorder';
import { JournalEntryList } from '@/components/journal-entry-list';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const handleNewEntry = (newEntry: JournalEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-4 md:p-8 bg-background font-body">
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
             <Sparkles className="h-8 w-8 text-primary" />
             <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              VoiceJournalAI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Record your thoughts, get instant summaries.
          </p>
        </header>

        <VoiceRecorder onNewEntry={handleNewEntry} />

        <JournalEntryList entries={entries} />
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center py-4 mt-8">
          <p className="text-xs text-muted-foreground">
              Built with Next.js and Firebase Genkit.
          </p>
      </footer>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { type JournalEntry } from '@/lib/types';
import { VoiceRecorder } from '@/components/voice-recorder';
import { JournalEntryList } from '@/components/journal-entry-list';
import { Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleNewEntry = (newEntry: JournalEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };
  const filteredEntries = entries.filter((entry) => {
    if (!selectedDate) return true;
    const entryDate = new Date(entry.date);
    return entryDate.toDateString() === selectedDate.toDateString();
  });

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

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold font-headline text-primary/80">Past Entries</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Filter by date...</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
                 {selectedDate && <Button onClick={() => setSelectedDate(undefined)} variant="ghost" className="w-full text-center">Clear Filter</Button>}
              </PopoverContent>
            </Popover>
        </div>
        <JournalEntryList entries={filteredEntries} />
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center py-4 mt-8">
          <p className="text-xs text-muted-foreground">
              Built with Next.js and Firebase Genkit.
          </p>
      </footer>
    </div>
  );
}

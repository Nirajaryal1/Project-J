'use client';

import { type JournalEntry } from '@/lib/types';
import { JournalEntryCard } from './journal-entry-card';
import { AnimatePresence, motion } from 'framer-motion';

interface JournalEntryListProps {
  entries: JournalEntry[];
}

export function JournalEntryList({ entries }: JournalEntryListProps) {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold mb-4 font-headline text-primary/80">Past Entries</h2>
      {entries.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">You have no journal entries yet.</p>
          <p className="text-muted-foreground text-sm">Click "Record" to create your first entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <JournalEntryCard entry={entry} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

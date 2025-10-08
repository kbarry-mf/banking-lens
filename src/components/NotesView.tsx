import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "./RichTextEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Note {
  id: string;
  timestamp: string;
  author: string;
  content: string;
  category: string;
  activityType?: string;
}

export const NotesView = () => {
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      timestamp: "Aug 14, 2025 - 12:14 PM",
      author: "Patrick Foran",
      content: "12% Spoke with Randy, said Mike would be best POC.... Mike has over 180 companies so Randy thinks he is using the funds to acquire more businesses, went over stacking and forgiveness",
      category: "SALES",
      activityType: "Outbound call to +15163144400"
    },
    {
      id: "2",
      timestamp: "Aug 14, 2025 - 11:26 AM",
      author: "Patrick Foran",
      content: "SE Randy requesting callback",
      category: "SALES",
    }
  ]);

  const handlePost = () => {
    if (!noteContent.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      author: "Current User",
      content: noteContent,
      category: "SALES"
    };
    
    setNotes([newNote, ...notes]);
    setNoteContent("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Notes and Activity</h2>
          <Button onClick={handlePost} size="sm" className="bg-accent hover:bg-accent/90">
            Post
          </Button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Selected Role:</label>
          <RichTextEditor 
            value={noteContent}
            onChange={setNoteContent}
            placeholder="Add a note..."
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {notes.map((note, index) => (
            <div key={note.id}>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">{note.timestamp}</div>
                <div className="font-semibold text-sm text-foreground">
                  {note.author}
                  {note.activityType && (
                    <span className="font-normal"> - {note.activityType}</span>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{note.content}</p>
                <div className="flex justify-end">
                  <Badge variant="secondary" className="text-xs bg-accent/10 text-accent hover:bg-accent/20">
                    {note.category}
                  </Badge>
                </div>
              </div>
              {index < notes.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

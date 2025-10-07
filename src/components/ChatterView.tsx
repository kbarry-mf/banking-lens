import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Palette, 
  List, 
  ListOrdered, 
  Image, 
  Link as LinkIcon, 
  Smile, 
  AtSign,
  Paperclip,
  Search,
  ChevronDown
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const ChatterView = () => {
  const [postContent, setPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-4 space-y-4">
      {/* Post Publisher */}
      <Card className="overflow-hidden">
        <div className="border-b px-4 py-2">
          <h3 className="text-sm font-medium text-foreground">Post</h3>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Text Area */}
          <Textarea
            placeholder="Share an update..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[120px] resize-none border-2 focus-visible:ring-2"
          />
          
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 flex-wrap">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Palette className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <AtSign className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-right">
            To link to a record, enter / then start typing the record name.
          </div>

          {/* To Field and Actions */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">To</span>
              <Button variant="ghost" className="h-8 px-2 justify-between flex-1 max-w-[200px]">
                <span className="text-sm truncate">Mulligan Funding,... Only</span>
                <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button className="h-8 px-6">
                Share
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Search Feed */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search this feed..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Empty State */}
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-64 h-48 opacity-30">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Mountain landscape illustration */}
              <g stroke="currentColor" fill="none" strokeWidth="2" className="text-primary/20">
                {/* Sun */}
                <circle cx="300" cy="80" r="30" fill="currentColor" opacity="0.3" />
                <circle cx="300" cy="80" r="45" opacity="0.2" />
                <circle cx="300" cy="80" r="60" opacity="0.1" />
                
                {/* Clouds */}
                <path d="M 50 120 Q 60 110 70 115 Q 80 100 90 110 Q 100 105 105 115 L 105 130 L 50 130 Z" fill="currentColor" opacity="0.2" />
                <path d="M 150 140 Q 160 130 170 135 Q 180 120 190 130 Q 200 125 205 135 L 205 150 L 150 150 Z" fill="currentColor" opacity="0.2" />
                
                {/* Mountains */}
                <path d="M 0 200 L 100 100 L 200 200 Z" fill="currentColor" opacity="0.15" />
                <path d="M 150 200 L 250 120 L 350 200 Z" fill="currentColor" opacity="0.15" />
                
                {/* Trees */}
                <path d="M 100 200 L 110 160 L 120 200 Z" fill="currentColor" opacity="0.25" />
                <path d="M 105 180 L 115 140 L 125 180 Z" fill="currentColor" opacity="0.25" />
                <path d="M 200 200 L 210 165 L 220 200 Z" fill="currentColor" opacity="0.25" />
                <path d="M 350 200 L 360 170 L 370 200 Z" fill="currentColor" opacity="0.25" />
                
                {/* Ground line */}
                <line x1="0" y1="200" x2="400" y2="200" strokeWidth="3" />
              </g>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Collaborate here!</h3>
            <p className="text-sm text-muted-foreground">
              Here's where you start talking with your colleagues about this record.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

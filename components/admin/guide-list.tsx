"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GuideListProps {
  selectedGuide: string | null
  onSelectGuide: (id: string) => void
}

export function GuideList({ selectedGuide, onSelectGuide }: GuideListProps) {
  // TODO: Replace with actual guide data
  const guides = [
    { id: '1', title: 'Network Troubleshooting' },
    { id: '2', title: 'Printer Setup Guide' },
    { id: '3', title: 'Software Installation' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Guides</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectGuide('new')}
        >
          New
        </Button>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-2">
          {guides.map((guide) => (
            <Button
              key={guide.id}
              variant={selectedGuide === guide.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectGuide(guide.id)}
            >
              {guide.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
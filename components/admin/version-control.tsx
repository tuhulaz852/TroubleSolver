"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface VersionControlProps {
  selectedGuideId: string | null
}

export function VersionControl({ selectedGuideId }: VersionControlProps) {
  // TODO: Replace with actual version data
  const versions = [
    { id: '1', version: '1.0.0', date: '2024-03-20', changes: 'Initial release' },
    { id: '2', version: '1.1.0', date: '2024-03-21', changes: 'Added new steps' },
    { id: '3', version: '1.2.0', date: '2024-03-22', changes: 'Updated images' },
  ]

  if (!selectedGuideId) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Select a guide to view version history
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Version History</h2>
        <Button>Create New Version</Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {versions.map((version) => (
            <Card key={version.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Version {version.version}</h3>
                  <p className="text-sm text-muted-foreground">{version.date}</p>
                  <p className="mt-2">{version.changes}</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
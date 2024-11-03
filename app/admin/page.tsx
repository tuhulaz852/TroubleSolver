"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GuideEditor } from "@/components/admin/guide-editor"
import { GuideList } from "@/components/admin/guide-list"
import { VersionControl } from "@/components/admin/version-control"

export default function AdminPage() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="versions">Version Control</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1 p-4">
              <GuideList 
                selectedGuide={selectedGuide}
                onSelectGuide={setSelectedGuide}
              />
            </Card>
            
            <Card className="md:col-span-3 p-4">
              <GuideEditor selectedGuideId={selectedGuide} />
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="versions">
          <Card className="p-4">
            <VersionControl selectedGuideId={selectedGuide} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
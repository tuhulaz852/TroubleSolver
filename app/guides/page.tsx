import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, ArrowRight, Lightbulb } from "lucide-react"

export default function GuidesPage() {
  const guides = [
    {
      title: "Network Troubleshooting",
      description: "Diagnose and fix common network connectivity issues.",
      category: "Networking",
      difficulty: "Intermediate",
    },
    {
      title: "Printer Setup",
      description: "Step-by-step guide to setting up and configuring printers.",
      category: "Hardware",
      difficulty: "Beginner",
    },
    {
      title: "Software Installation",
      description: "Learn how to properly install and configure software.",
      category: "Software",
      difficulty: "Beginner",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Troubleshooting Guides</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Find step-by-step solutions to common problems
            </p>
          </div>
          <Link href="/guides/interactive">
            <Button className="gap-2">
              <Lightbulb className="w-4 h-4" />
              Interactive Mode
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {guides.map((guide, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">{guide.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {guide.category}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {guide.difficulty}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
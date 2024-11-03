import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Lightbulb, History, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Welcome to TroubleSolver
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your interactive platform for step-by-step troubleshooting guides and expert documentation.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/guides">
            <Button size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Browse Guides
            </Button>
          </Link>
          <Link href="/guides/interactive">
            <Button size="lg" variant="outline" className="gap-2">
              <Lightbulb className="w-5 h-5" />
              Interactive Mode
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="p-6">
          <BookOpen className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Expert Documentation</h2>
          <p className="text-muted-foreground">
            Access comprehensive guides written by industry experts, with detailed steps and best practices.
          </p>
        </Card>

        <Card className="p-6">
          <Lightbulb className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Interactive Guides</h2>
          <p className="text-muted-foreground">
            Follow step-by-step instructions with interactive checklists and progress tracking.
          </p>
        </Card>

        <Card className="p-6">
          <History className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Version Control</h2>
          <p className="text-muted-foreground">
            Access guides for different software versions, ensuring accurate instructions for your specific needs.
          </p>
        </Card>
      </section>

      <section className="text-center bg-accent rounded-lg p-8">
        <Users className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create an account to track your progress, bookmark guides, and contribute to our growing knowledge base.
        </p>
        <Button size="lg">Sign Up Now</Button>
      </section>
    </div>
  )
}
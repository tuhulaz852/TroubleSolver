"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, ChevronRight, HelpCircle, RotateCcw } from "lucide-react"

export default function InteractiveGuidePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Example guide data - in a real app, this would come from an API or database
  const guide = {
    title: "Network Connectivity Troubleshooter",
    description: "Follow these steps to diagnose and fix network connectivity issues.",
    steps: [
      {
        title: "Check Physical Connections",
        description: "Ensure all network cables are properly connected and network devices are powered on.",
        questions: [
          "Is your network cable firmly plugged in?",
          "Are your modem and router powered on?",
          "Do you see any status lights on your networking devices?"
        ]
      },
      {
        title: "Verify Wi-Fi Connection",
        description: "Check if your device is properly connected to the correct Wi-Fi network.",
        questions: [
          "Is Wi-Fi enabled on your device?",
          "Are you connected to the correct network?",
          "Is the signal strength adequate?"
        ]
      },
      {
        title: "Test Internet Connection",
        description: "Perform basic connectivity tests to identify the issue.",
        questions: [
          "Can you access your router's admin page?",
          "Can you ping google.com?",
          "Are other devices on the network experiencing similar issues?"
        ]
      }
    ]
  }

  const handleNextStep = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    )
  }

  const resetProgress = () => {
    setCurrentStep(0)
    setCompletedSteps([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{guide.title}</h1>
            <p className="text-muted-foreground mt-2">{guide.description}</p>
          </div>
          <Button variant="outline" onClick={resetProgress}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Progress
          </Button>
        </div>

        <div className="space-y-6">
          {guide.steps.map((step, index) => (
            <Card
              key={index}
              className={`p-6 transition-all ${
                currentStep === index ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
                      {completedSteps.includes(index) ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
                {currentStep === index && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleStepCompletion(index)}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <HelpCircle className="w-5 h-5" />
                    )}
                  </Button>
                )}
              </div>

              {currentStep === index && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    {step.questions.map((question, qIndex) => (
                      <div key={qIndex} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-1 text-muted-foreground" />
                        <p>{question}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={currentStep === guide.steps.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>

        {completedSteps.length === guide.steps.length && (
          <Card className="mt-8 p-6 bg-primary/5">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">Troubleshooting Complete!</h3>
                <p className="text-muted-foreground">
                  You've completed all the steps. If you're still experiencing issues,
                  consider contacting technical support.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
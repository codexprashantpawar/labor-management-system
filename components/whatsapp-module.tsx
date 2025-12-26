"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { FormInput } from "@/components/form-input"
import { MessageCircle, Send, FileText, HelpCircle } from "lucide-react"

export function WhatsAppModule() {
  const [activeTab, setActiveTab] = useState<"leave" | "salary" | "qa">("leave")
  const [isOpen, setIsOpen] = useState(false)
  const [leaveMessage, setLeaveMessage] = useState("")
  const [question, setQuestion] = useState("")

  const handleSendLeaveRequest = async () => {
    // WhatsApp Business API placeholder
    // const response = await fetch('/api/whatsapp/send', {
    //   method: 'POST',
    //   body: JSON.stringify({ type: 'leave', message: leaveMessage })
    // })
    console.log("Sending leave request via WhatsApp:", leaveMessage)
    setLeaveMessage("")
    alert("Leave request sent via WhatsApp!")
  }

  const handleRequestSalarySip = async () => {
    // WhatsApp Business API placeholder
    console.log("Requesting salary slip via WhatsApp")
    alert("Salary slip request sent via WhatsApp!")
  }

  const handleSendQuestion = async () => {
    // WhatsApp Business API placeholder for real-time Q&A
    console.log("Sending question via WhatsApp:", question)
    setQuestion("")
    alert("Question sent! Our team will respond soon.")
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">WhatsApp Integration</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Request leaves, salary slips, and get support via WhatsApp
            </p>
          </div>
          <Button onClick={() => setIsOpen(true)} className="gap-2 bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4" />
            Open WhatsApp
          </Button>
        </div>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="WhatsApp Business - Labor Management">
        <div className="space-y-4">
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab("leave")}
              className={`pb-2 px-4 text-sm font-medium transition-colors ${
                activeTab === "leave"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageCircle className="h-4 w-4 inline-block mr-2" />
              Leave Request
            </button>
            <button
              onClick={() => setActiveTab("salary")}
              className={`pb-2 px-4 text-sm font-medium transition-colors ${
                activeTab === "salary"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4 inline-block mr-2" />
              Salary Slip
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`pb-2 px-4 text-sm font-medium transition-colors ${
                activeTab === "qa"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HelpCircle className="h-4 w-4 inline-block mr-2" />
              Q&A Support
            </button>
          </div>

          {activeTab === "leave" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Request a leave via WhatsApp message</p>
              <FormInput
                label="Leave Request"
                type="textarea"
                placeholder="Describe your leave request (e.g., Casual leave for 2 days, reason: family visit)"
                value={leaveMessage}
                onChange={setLeaveMessage}
              />
              <Button onClick={handleSendLeaveRequest} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Leave Request
              </Button>
              <p className="text-xs text-muted-foreground">
                Your request will be sent to the HR team via WhatsApp Business API
              </p>
            </div>
          )}

          {activeTab === "salary" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Request your salary slip via WhatsApp</p>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium text-foreground">Select Month:</p>
                <FormInput label="Month" type="select" required>
                  <option value="">-- Select Month --</option>
                  <option value="jan2025">January 2025</option>
                  <option value="dec2024">December 2024</option>
                  <option value="nov2024">November 2024</option>
                </FormInput>
              </div>
              <Button onClick={handleRequestSalarySip} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Request Salary Slip
              </Button>
              <p className="text-xs text-muted-foreground">
                Your salary slip will be sent to your WhatsApp within 5 minutes
              </p>
            </div>
          )}

          {activeTab === "qa" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Ask questions and get real-time support</p>
              <FormInput
                label="Your Question"
                type="textarea"
                placeholder="Ask any question about leaves, salary, shifts, etc."
                value={question}
                onChange={setQuestion}
              />
              <Button onClick={handleSendQuestion} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Question
              </Button>
              <p className="text-xs text-muted-foreground">
                Our team will respond to your question via WhatsApp within 24 hours
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

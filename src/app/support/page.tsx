import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  Video,
  Users,
} from "lucide-react"

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Support Center</h2>
          <p className="text-muted-foreground">
            Get help with your Emergent Fortuity account and platform features
          </p>
        </div>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          Live Chat
        </Button>
      </div>

      {/* Contact Options */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Live Chat</h3>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-4">
              Get instant help from our support team
            </p>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available now</span>
            </div>
          </div>
        </div>

        <div className="cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Phone Support</h3>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-4">
              Speak directly with our financial advisors
            </p>
            <p className="text-sm font-medium">+1 (800) 555-HELP</p>
            <p className="text-xs text-muted-foreground">Mon-Fri 8AM-8PM EST</p>
          </div>
        </div>

        <div className="cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Email Support</h3>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-4">
              Send us a detailed message about your issue
            </p>
            <p className="text-sm font-medium">support@emergentfortuity.com</p>
            <p className="text-xs text-muted-foreground">Response within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Help Resources */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Help Resources</h3>
          <p className="text-muted-foreground">Find answers to common questions and learn about platform features</p>
        </div>
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">FAQ</h4>
              <p className="text-xs text-muted-foreground">Common questions and answers</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">User Guides</h4>
              <p className="text-xs text-muted-foreground">Step-by-step tutorials</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Video Tutorials</h4>
              <p className="text-xs text-muted-foreground">Visual learning resources</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Community</h4>
              <p className="text-xs text-muted-foreground">User forums and discussions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Contact Form</h3>
            <p className="text-muted-foreground">Send us a message and we&apos;ll get back to you</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select a topic</option>
                <option value="account">Account Issues</option>
                <option value="billing">Billing Questions</option>
                <option value="technical">Technical Support</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="w-full p-2 border rounded-md h-32 resize-none"
                placeholder="Describe your issue or question..."
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Support Hours</h3>
            <p className="text-muted-foreground">When our team is available to help</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">24/7 Available</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-8PM EST</p>
                  <p className="text-sm text-muted-foreground">Sat-Sun: 9AM-5PM EST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  <p className="text-sm text-muted-foreground">Priority support for Premium users</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-medium mb-2">Premium Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get priority support with dedicated account management
              </p>
              <Button variant="outline" className="w-full">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Smartphone,
  Mail,
  Lock,
  Eye,
} from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    portfolio: true,
    market: true,
    security: true,
    newsletter: false,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input id="email" defaultValue="john@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Input id="address" defaultValue="123 Financial St, New York, NY" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              <CardTitle>Portfolio Preferences</CardTitle>
            </div>
            <CardDescription>
              Configure your investment preferences and risk tolerance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <select className="w-full p-2 border rounded-md" defaultValue="moderate">
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
            <div>
              <Label htmlFor="investmentGoal">Investment Goal</Label>
              <select className="w-full p-2 border rounded-md" defaultValue="retirement">
                <option value="retirement">Retirement</option>
                <option value="education">Education</option>
                <option value="home">Home Purchase</option>
                <option value="general">General Wealth Building</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timeHorizon">Time Horizon</Label>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <select className="flex-1 p-2 border rounded-md" defaultValue="long">
                  <option value="short">1-3 years</option>
                  <option value="medium">3-10 years</option>
                  <option value="long">10+ years</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
              <Input id="monthlyContribution" type="number" defaultValue="1000" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle>Security & Privacy</CardTitle>
            </div>
            <CardDescription>
              Manage your account security and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Badge variant="outline">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Update Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'portfolio', label: 'Portfolio Updates', description: 'Performance reports and rebalancing alerts' },
              { key: 'market', label: 'Market News', description: 'Important market updates and analysis' },
              { key: 'security', label: 'Security Alerts', description: 'Login attempts and security notifications' },
              { key: 'newsletter', label: 'Newsletter', description: 'Weekly financial insights and tips' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Button
                  variant={notifications[item.key as keyof typeof notifications] ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                >
                  {notifications[item.key as keyof typeof notifications] ? "On" : "Off"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Billing Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-orange-600" />
              <CardTitle>Billing & Subscription</CardTitle>
            </div>
            <CardDescription>
              Manage your subscription and billing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Premium Plan</h4>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Advanced portfolio management with AI insights
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$49/month</span>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Next billing date</p>
                  <p className="text-sm text-muted-foreground">January 15, 2025</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="**** **** **** 1234" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <Button className="w-full">Update Payment Method</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
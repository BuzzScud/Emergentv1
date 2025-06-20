"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Star,
  Lightbulb,
  Bug,
  Heart,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [feedbackType, setFeedbackType] = useState("")

  const feedbackTypes = [
    { id: "general", label: "General Feedback", icon: MessageSquare, color: "text-blue-600" },
    { id: "feature", label: "Feature Request", icon: Lightbulb, color: "text-yellow-600" },
    { id: "bug", label: "Bug Report", icon: Bug, color: "text-red-600" },
    { id: "compliment", label: "Compliment", icon: Heart, color: "text-pink-600" },
  ]

  const recentFeedback = [
    {
      user: "Sarah M.",
      rating: 5,
      comment: "The AI models have significantly improved my portfolio performance. Excellent platform!",
      type: "compliment",
      date: "2 days ago"
    },
    {
      user: "Michael R.",
      rating: 4,
      comment: "Would love to see more customizable dashboard widgets for tracking specific metrics.",
      type: "feature",
      date: "3 days ago"
    },
    {
      user: "Jennifer L.",
      rating: 5,
      comment: "Outstanding risk management tools. The stress testing feature is incredibly valuable.",
      type: "compliment",
      date: "5 days ago"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feedback</h2>
          <p className="text-muted-foreground">
            Help us improve Emergent Fortuity with your valuable feedback
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Star className="mr-1 h-3 w-3" />
            4.8/5 Average Rating
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Feedback</h3>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Average Rating</h3>
            <Star className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last month
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Features Implemented</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              From user suggestions
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Response Rate</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">
              Within 48 hours
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Feedback Form */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Share Your Feedback</h3>
            <p className="text-muted-foreground">Tell us about your experience with Emergent Fortuity</p>
          </div>
          <div className="space-y-4">
            {/* Feedback Type Selection */}
            <div>
              <Label>Feedback Type</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {feedbackTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <div
                      key={type.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        feedbackType === type.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setFeedbackType(type.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className={`h-4 w-4 ${type.color}`} />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label>Overall Rating</Label>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      star <= rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating > 0 && `${rating}/5`}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name (Optional)</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>

            {/* Feedback Message */}
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <textarea
                id="feedback"
                className="w-full p-3 border rounded-md h-32 resize-none mt-2"
                placeholder="Share your thoughts, suggestions, or report issues..."
              />
            </div>

            <Button className="w-full">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Recent Community Feedback</h3>
            <p className="text-muted-foreground">See what other users are saying about Emergent Fortuity</p>
          </div>
          <div>
            <div className="space-y-4">
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{feedback.user}</span>
                      <Badge variant="outline" className="text-xs">
                        {feedback.type === 'compliment' ? 'Compliment' : 
                         feedback.type === 'feature' ? 'Feature Request' : 'Feedback'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= feedback.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  <p className="text-xs text-muted-foreground">{feedback.date}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Requests */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Popular Feature Requests</h3>
          <p className="text-muted-foreground">Top community-requested features and their development status</p>
        </div>
        <div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Advanced Portfolio Comparison Tool</p>
                <p className="text-sm text-muted-foreground">Compare multiple portfolios side-by-side</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                In Development
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mobile App for iOS/Android</p>
                <p className="text-sm text-muted-foreground">Native mobile application</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                Planned
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Cryptocurrency Portfolio Integration</p>
                <p className="text-sm text-muted-foreground">Track and analyze crypto investments</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                Under Review
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
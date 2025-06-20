"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Star,
} from "lucide-react"

const models = [
  {
    id: "financial-advisor-pro",
    name: "Financial Advisor Pro",
    description: "Advanced AI model specialized in comprehensive financial planning and investment strategies",
    status: "Active",
    accuracy: "94.2%",
    specialty: "Portfolio Optimization",
    icon: Brain,
    features: ["Risk Assessment", "Portfolio Rebalancing", "Tax Optimization", "Retirement Planning"],
  },
  {
    id: "market-predictor",
    name: "Market Predictor",
    description: "Predictive model for market trends and investment opportunities using machine learning",
    status: "Active",
    accuracy: "87.8%",
    specialty: "Market Analysis",
    icon: TrendingUp,
    features: ["Trend Analysis", "Price Prediction", "Market Sentiment", "Technical Indicators"],
  },
  {
    id: "risk-guardian",
    name: "Risk Guardian",
    description: "Comprehensive risk management model for portfolio protection and volatility analysis",
    status: "Active",
    accuracy: "91.5%",
    specialty: "Risk Management",
    icon: Shield,
    features: ["Risk Scoring", "Volatility Analysis", "Stress Testing", "Correlation Analysis"],
  },
  {
    id: "wealth-optimizer",
    name: "Wealth Optimizer",
    description: "AI-powered wealth management and tax-efficient investment strategy generator",
    status: "Beta",
    accuracy: "89.3%",
    specialty: "Wealth Management",
    icon: Zap,
    features: ["Tax Planning", "Asset Allocation", "Wealth Preservation", "Estate Planning"],
  },
]

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Model Performance
          </Button>
          <Button>
            Deploy New Model
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 in production, 1 in beta
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90.7%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Uptime</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {models.map((model) => {
          const IconComponent = model.icon
          return (
            <Card key={model.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                  </div>
                  <Badge variant={model.status === "Active" ? "default" : "secondary"}>
                    {model.status}
                  </Badge>
                </div>
                <CardDescription>{model.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Accuracy</p>
                    <p className="text-2xl font-bold text-green-600">{model.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Specialty</p>
                    <p className="text-sm text-muted-foreground">{model.specialty}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Features</p>
                  <div className="flex flex-wrap gap-1">
                    {model.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure
                  </Button>
                  <Button size="sm" className="flex-1">
                    Test Model
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 
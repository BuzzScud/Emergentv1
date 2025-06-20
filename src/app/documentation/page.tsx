import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FileText,
  Shield,
  Code,
  TrendingUp,
  Calculator,
  HelpCircle,
  ExternalLink,
} from "lucide-react"

const documentationSections = [
  {
    title: "Getting Started",
    description: "Learn the basics of using Emergent Fortuity for financial planning",
    icon: BookOpen,
    articles: [
      { title: "Platform Overview", time: "5 min read", new: true },
      { title: "Setting Up Your Account", time: "3 min read" },
      { title: "First Investment Portfolio", time: "8 min read" },
      { title: "Understanding Risk Profiles", time: "6 min read" },
    ],
  },
  {
    title: "Investment Guide",
    description: "Comprehensive guide to investment strategies and portfolio management",
    icon: TrendingUp,
    articles: [
      { title: "Asset Allocation Strategies", time: "12 min read" },
      { title: "Diversification Principles", time: "10 min read" },
      { title: "Market Analysis Tools", time: "15 min read", new: true },
      { title: "Tax-Efficient Investing", time: "8 min read" },
    ],
  },
  {
    title: "Risk Management",
    description: "Learn how to protect and manage your investment risks",
    icon: Shield,
    articles: [
      { title: "Risk Assessment Framework", time: "7 min read" },
      { title: "Volatility Management", time: "9 min read" },
      { title: "Stress Testing Portfolios", time: "11 min read" },
      { title: "Insurance and Hedging", time: "6 min read" },
    ],
  },
  {
    title: "API Reference",
    description: "Technical documentation for developers and integrations",
    icon: Code,
    articles: [
      { title: "Authentication", time: "4 min read" },
      { title: "Portfolio API", time: "8 min read" },
      { title: "Market Data Endpoints", time: "6 min read" },
      { title: "Webhooks and Events", time: "7 min read" },
    ],
  },
]

const quickLinks = [
  { title: "FAQ", description: "Frequently asked questions", icon: HelpCircle },
  { title: "Video Tutorials", description: "Step-by-step video guides", icon: FileText },
  { title: "Financial Calculator", description: "Built-in calculation tools", icon: Calculator },
  { title: "Support Center", description: "Get help from our team", icon: ExternalLink },
]

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground">
            Everything you need to know about Emergent Fortuity
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            PDF Download
          </Button>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            API Docs
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link, index) => {
          const IconComponent = link.icon
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-sm">{link.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {documentationSections.map((section, index) => {
          const IconComponent = section.icon
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{article.title}</span>
                        {article.new && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{article.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Articles
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest changes and new features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Enhanced Risk Analytics</h4>
                <Badge variant="outline">Dec 15, 2024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                New risk assessment algorithms and volatility predictions
              </p>
            </div>
            <div className="border-l-2 border-green-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">API v2.0 Release</h4>
                <Badge variant="outline">Dec 10, 2024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Improved performance and new portfolio management endpoints
              </p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Tax Optimization Tools</h4>
                <Badge variant="outline">Dec 5, 2024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Advanced tax-loss harvesting strategies and planning tools
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
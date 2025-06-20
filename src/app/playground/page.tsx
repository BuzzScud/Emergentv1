"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Calculator,
  TrendingUp,
  PieChart,
  DollarSign,
  BarChart3,
} from "lucide-react"

export default function PlaygroundPage() {
  const [investment, setInvestment] = useState("")
  const [years, setYears] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculateCompoundInterest = () => {
    const principal = parseFloat(investment)
    const rate = parseFloat(interestRate) / 100
    const time = parseFloat(years)
    
    if (principal && rate && time) {
      const compoundInterest = principal * Math.pow(1 + rate, time)
      setResult(compoundInterest)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Investment Tools</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Across 5 sectors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">
              Moderate risk level
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Portfolio performance chart would go here</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Compound Interest Calculator
              </CardTitle>
              <CardDescription>
                Calculate potential investment growth over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="investment">Initial Investment ($)</Label>
                <Input
                  id="investment"
                  placeholder="10000"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="years">Years</Label>
                <Input
                  id="years"
                  placeholder="10"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  placeholder="7"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
              <Button onClick={calculateCompoundInterest} className="w-full">
                Calculate
              </Button>
              {result && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Future Value: <strong>${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
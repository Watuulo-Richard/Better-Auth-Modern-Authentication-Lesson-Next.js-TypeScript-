"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, DollarSign, CreditCard, Wallet, PiggyBank } from "lucide-react"

// Mock data
const monthlyData = [
  { month: "Jan", income: 4500, expenses: 3200, savings: 1300 },
  { month: "Feb", income: 4800, expenses: 3400, savings: 1400 },
  { month: "Mar", income: 4200, expenses: 3800, savings: 400 },
  { month: "Apr", income: 5200, expenses: 3600, savings: 1600 },
  { month: "May", income: 4900, expenses: 3300, savings: 1600 },
  { month: "Jun", income: 5400, expenses: 3900, savings: 1500 },
]

const expenseCategories = [
  { name: "Housing", value: 1200, color: "hsl(var(--chart-1))" },
  { name: "Food", value: 800, color: "hsl(var(--chart-2))" },
  { name: "Transportation", value: 400, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 300, color: "hsl(var(--chart-4))" },
  { name: "Healthcare", value: 200, color: "hsl(var(--chart-5))" },
  { name: "Others", value: 300, color: "hsl(var(--chart-1))" },
]

const dailySpending = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 85 },
  { day: "Wed", amount: 200 },
  { day: "Thu", amount: 95 },
  { day: "Fri", amount: 180 },
  { day: "Sat", amount: 250 },
  { day: "Sun", amount: 160 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--color-chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--color-chart-2)",
  },
  savings: {
    label: "Savings",
    color: "var(--color-chart-3)",
  },
  amount: {
    label: "Amount",
    color: "var(--color-chart-4)",
  },
}

export default function AnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$29,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$21,200</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,800</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26.9%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Income vs Expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="var(--color-chart-1)" name="Income" />
                  <Bar dataKey="expenses" fill="var(--color-chart-2)" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of monthly expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-popover border border-border rounded-lg p-2 shadow-md">
                            <p className="font-medium text-popover-foreground">{data.name}</p>
                            <p className="text-sm text-muted-foreground">${data.value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Savings Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Trend</CardTitle>
            <CardDescription>Monthly savings accumulation</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="var(--color-chart-3)"
                    fill="var(--color-chart-3)"
                    fillOpacity={0.3}
                    name="Savings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Spending */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Spending</CardTitle>
            <CardDescription>This week&apos;s daily spending pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySpending}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-chart-4)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-4)" }}
                    name="Daily Spending"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Category Details</CardTitle>
          <CardDescription>Detailed breakdown of expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="font-medium text-foreground">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">${category.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {((category.value / expenseCategories.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

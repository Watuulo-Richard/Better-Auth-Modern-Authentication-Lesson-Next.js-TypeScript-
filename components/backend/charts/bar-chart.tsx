"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { MonthlyAnalytics } from "@/types/bar-chart-analytics-type"
import { getMonthlyAnalytics } from "@/actions/visitors"

export const description = "A multiple bar chart"

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile:  { label: "Mobile",  color: "var(--chart-2)" },
  tablet:  { label: "Tablet",  color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartBarMultiple() {
  const [data, setData]       = React.useState<MonthlyAnalytics | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError]     = React.useState<string | null>(null)

  React.useEffect(() => {
    getMonthlyAnalytics()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const dateRangeLabel = React.useMemo(() => {
    if (!data) return ""
    const first = data.rows[0]?.fullMonth ?? ""
    const last  = data.rows[data.rows.length - 1]?.fullMonth ?? ""
    return `${first} – ${last}`
  }, [data])

  const TrendIcon =
    data?.trend === "up"   ? TrendingUp   :
    data?.trend === "down" ? TrendingDown :
    Minus

  const trendColor =
    data?.trend === "up"   ? "text-emerald-500" :
    data?.trend === "down" ? "text-rose-500"    :
    "text-muted-foreground"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>
          {loading ? "Loading…" : error ? "Failed to load" : dateRangeLabel}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <p className="text-muted-foreground text-sm py-10 text-center">
            Loading analytics…
          </p>
        )}
        {error && (
          <p className="text-destructive text-sm py-10 text-center">{error}</p>
        )}
        {!loading && !error && data && (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data.rows}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
              <Bar dataKey="tablet"  fill="var(--color-tablet)"  radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {!loading && !error && data ? (
          <>
            <div className={`flex gap-2 leading-none font-medium ${trendColor}`}>
              {data.trend === "flat"
                ? "No change vs last month"
                : `Trending ${data.trend} by ${data.trendPercent}% this month`}
              <TrendIcon className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing desktop, mobile & tablet visitors for the last 6 months
            </div>
          </>
        ) : (
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
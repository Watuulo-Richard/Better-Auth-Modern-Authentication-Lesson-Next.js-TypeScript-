"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { type PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DeviceType } from "@/types/analytics-types"
import { getAnalyticsSummary } from "@/actions/visitor-analytics"

// ─── Chart config ─────────────────────────────────────────────────────────────

const chartConfig = {
  visitors: { label: "Visitors" },
  desktop:  { label: "Desktop", color: "var(--chart-1)" },
  mobile:   { label: "Mobile",  color: "var(--chart-2)" },
  tablet:   { label: "Tablet",  color: "var(--chart-3)" },
  unknown:  { label: "Unknown", color: "var(--chart-4)" },
} satisfies ChartConfig

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartRow {
  device:   DeviceType
  visitors: number
  fill:     string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChartPieInteractive() {
  const id = "pie-interactive"

  const [chartData, setChartData]       = React.useState<ChartRow[]>([])
  const [totalViews, setTotalViews]     = React.useState(0)
  const [activeDevice, setActiveDevice] = React.useState<DeviceType | "">("")
  const [loading, setLoading]           = React.useState(true)
  const [error, setError]               = React.useState<string | null>(null)

  React.useEffect(() => {
    getAnalyticsSummary()
      .then((summary) => {
        const rows: ChartRow[] = summary.deviceBreakdown.map((d) => ({
          device:   d.device,
          visitors: d.count,
          fill:     `var(--color-${d.device})`,
        }))
        setChartData(rows)
        setTotalViews(summary.totalViews)
        if (rows.length > 0) setActiveDevice(rows[0].device)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const activeIndex = React.useMemo(
    () => chartData.findIndex((d) => d.device === activeDevice),
    [activeDevice, chartData]
  )

  const activeVisitors = chartData[activeIndex]?.visitors ?? 0

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Visitors by Device</CardTitle>
          <CardDescription>
            {loading
              ? "Loading…"
              : error
              ? "Failed to load data"
              : `${totalViews.toLocaleString()} total views`}
          </CardDescription>
        </div>

        {!loading && !error && chartData.length > 0 && (
          <Select
            value={activeDevice}
            onValueChange={(v) => setActiveDevice(v as DeviceType)}
          >
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a device"
            >
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {chartData.map((row) => {
                const config = chartConfig[row.device as keyof typeof chartConfig]
                if (!config) return null
                return (
                  <SelectItem
                    key={row.device}
                    value={row.device}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-xs"
                        style={{ backgroundColor: `var(--color-${row.device})` }}
                      />
                      {config.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        {loading && (
          <p className="text-muted-foreground text-sm py-10">Loading analytics…</p>
        )}
        {error && (
          <p className="text-destructive text-sm py-10">{error}</p>
        )}
        {!loading && !error && chartData.length === 0 && (
          <p className="text-muted-foreground text-sm py-10">No visitor data yet.</p>
        )}
        {!loading && !error && chartData.length > 0 && (
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="device"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {activeVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
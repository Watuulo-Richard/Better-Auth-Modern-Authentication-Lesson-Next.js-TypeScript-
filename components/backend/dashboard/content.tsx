import { Wallet } from "lucide-react"

import { ChartBarMultiple } from "../charts/bar-chart"
import { ChartBarInteractive } from "../charts/bar-chart-interactive"
import { ChartPieInteractive } from "../charts/pie-chart"

export default function Content() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 flex flex-col border border-border">
          <h2 className="text-lg font-bold text-card-foreground mb-4 text-left flex items-center gap-2">
            <Wallet className="w-3.5 h-3.5 text-foreground" />
            Accounts
          </h2>
          <div className="flex-1">
            <ChartPieInteractive />
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 flex flex-col border border-border">
          {/* <h2 className="text-lg font-bold text-card-foreground mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-foreground" />
            Recent Transactions
          </h2> */}
          <div className="flex-1">
            <ChartBarMultiple />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <ChartBarInteractive />
      </div>
    </div>
  )
}

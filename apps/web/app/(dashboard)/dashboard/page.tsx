"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts"
import { useDashboardAnalytics } from "~/hooks/api/form"
import { useAuth } from "~/app/AuthProvider"

export default function DashboardPage() {
  // const { analytics, isLoading } = useDashboardAnalytics()
  const { user, isLoading } = useAuth();

  const { analytics } =  useDashboardAnalytics(!!user && !isLoading);

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading dashboard...
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold title-font-color">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Overview of your BuildForms workspace
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-xl card-bx brdbx transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardHeader>
            <CardTitle>Total Forms</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {analytics.totalForms}
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bx brdbx transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardHeader>
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-green-500">
            {analytics.publishedForms}
          </CardContent>
        </Card> 

        <Card className="rounded-xl card-bx brdbx transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-yellow-500">
            {analytics.draftForms}
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bx brdbx transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {analytics.totalResponses}
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="rounded-xl card-bx brdbx transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
        <CardHeader>
          <CardTitle>Responses Over Time</CardTitle>
        </CardHeader>

        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.responsesByDate}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#55C96B"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
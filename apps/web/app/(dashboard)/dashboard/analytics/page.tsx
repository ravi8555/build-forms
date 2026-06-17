"use client";

import React from "react";
import {
  BarChart3,
  FileText,
  Globe,
  EyeOff,
  ClipboardList,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useDashboardAnalytics } from "~/hooks/api/form";

const COLORS = ["#55C96B", "#f59e0b", "#3b82f6"];

export default function AnalyticsPage() {
  const { analytics, isLoading } = useDashboardAnalytics();

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  if (!analytics) return null;

  const visibilityData = [
    {
      name: "Published",
      value: analytics.publishedForms,
    },
    {
      name: "Draft",
      value: analytics.draftForms,
    },
    {
      name: "Unlisted",
      value: analytics.unlistedForms,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold title-font-color">
          Analytics
        </h1>

        <p className="text-muted-foreground mt-1">
          Insights into your forms and submissions
        </p>
      </div>

      {/* KPI */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Forms
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {analytics.totalForms}
              </h2>
            </div>

            <FileText className="h-8 w-8 text-[#55C96B]" />
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Responses
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {analytics.totalResponses}
              </h2>
            </div>

            <ClipboardList className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Published Forms
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {analytics.publishedForms}
              </h2>
            </div>

            <Globe className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Unlisted Forms
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {analytics.unlistedForms}
              </h2>
            </div>

            <EyeOff className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Bar chart */}
        <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardHeader>
            <CardTitle>Responses Over Time</CardTitle>

            <CardDescription>
              Submission trend across your forms
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[320px]">
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

        {/* Pie chart */}
        <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
          <CardHeader>
            <CardTitle>Visibility Breakdown</CardTitle>

            <CardDescription>
              Distribution of form visibility
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visibilityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {visibilityData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Forms */}
      <Card className="rounded-xl card-bg border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
        <CardHeader>
          <CardTitle>Recent Forms</CardTitle>

          <CardDescription>
            Latest created forms
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {analytics.recentForms.length === 0 ? (
              <p className="text-muted-foreground">
                No forms found
              </p>
            ) : (
              analytics.recentForms.map((form) => (
                <div
                  key={form.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {form.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {form.visibility}
                    </p>
                  </div>

                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
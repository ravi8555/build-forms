"use client"

import Link from "next/link"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import { useListPublicForms } from "~/hooks/api/form"

export default function ExplorePage() {
  const { forms, isLoading, isError } =
    useListPublicForms()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 px-6 py-12 max-w-7xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#55C96B]">
            Explore Public Forms
          </h1>

          <p className="text-muted-foreground mt-3">
            Discover forms published by creators
          </p>
        </div>

        {isLoading && (
          <p className="text-center">Loading forms...</p>
        )}

        {isError && (
          <p className="text-center text-red-500">
            Failed to load forms
          </p>
        )}

        {forms && forms.length === 0 && (
          <p className="text-center text-muted-foreground">
            No public forms available
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms?.map((form) => (
            <div
              key={form.id}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {form.title}
              </h2>

              <p className="text-muted-foreground mt-2 min-h-[48px]">
                {form.description || "No description"}
              </p>

              <div className="mt-6">
                <Link
                  href={`/form/${form.id}`}
                  className="inline-flex h-10 items-center rounded-xl bg-[#55C96B] px-5 text-white hover:bg-[#49b85f]"
                >
                  Open Form
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
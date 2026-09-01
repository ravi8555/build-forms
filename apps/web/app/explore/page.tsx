"use client"

import Link from "next/link"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import { useListPublicForms, useGetFormSubmissions } from "~/hooks/api/form"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LoadingSpinner } from "~/components/LoadingSpinner"

export default function ExplorePage() {
  const { forms, isLoading, isError } =
    useListPublicForms()
    // console.log(forms);   

    return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 px-6 py-12 max-w-7xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold title-font-color">
            Explore Public Forms
          </h1>

          <p className="text-muted-foreground mt-3">
            Discover forms published by creators
          </p>
        </div>

        {isLoading && (
          <div className="text-center">
            Loading forms...
            <LoadingSpinner/>
          </div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {forms?.map((form) => (

   
            <div
              key={form.id} 
              className="p-6
             rounded-xl card-bx border transition-all  shadow-blue-500/50
             duration-300
            brdbx
             hover:-translate-y-1">
              <div className="res-cnt text-xs flex justify-between">
                <span className="text-muted-foreground">Theme: {form.theme ?? "DEFAULT"}</span> <span className="text-muted-foreground">{form.responseCount} Responses</span>
              </div>
              <h2 className="text-xl title-font-color">
                {form.title}
              </h2>

              <p className="text-muted-foreground mt-2 min-h-[48px]">
                {form.description || "No description"}
              </p>

              <div className="mt-6">
                <Link
                  href={`/form/${form.id}`}
                  className="inline-flex h-10 items-center rounded-md title-font-color border brd pl-5 pr-5"
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
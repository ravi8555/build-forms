"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetForm, useSubmitForm, useHasReported } from "~/hooks/api/form";
import { useAuth } from "~/app/AuthProvider";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FORM_THEMES } from "~/lib/form-themes";
import ReportFormDialog from "~/components/forms/ReportFormDialog";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label"; 
import { RatingField } from "~/components/RatingField";


import { cn } from "~/lib/utils";

import {
  CheckCircle2,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const Page = () => {
  
  const {user} = useAuth()
  const { form_id } = useParams<{ form_id: string }>();
  const { theme, setTheme } = useTheme();

  const { form, isLoading, error } = useGetForm(form_id);
  const { submitFormAsync } = useSubmitForm();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [openReport, setOpenReport] = useState(false);
  
  const isDark = theme === "dark";
  const { hasReported } = useHasReported(form?.id ?? "");
const themeConfig =
  FORM_THEMES[
    (form?.theme as keyof typeof FORM_THEMES)
      || "DEFAULT"
  ];
  
  const handleChange = (key: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      const mappedValues = form.fields
        .filter((field) => values[field.labelKey] !== undefined)
        .map((field) => ({
          formFieldId: field.id,
          value: String(values[field.labelKey]),
        }));

      await submitFormAsync({
        formId: form.id,
        values: mappedValues,
      });

      setSubmitted(true);
    } catch (error) {
      const message =
        (error as { message?: string } | null)?.message ??
        "Something went wrong. Please try again.";

      if (message.includes("RESPONSE_LIMIT_REACHED")) {
        setSubmitError(
          "This form has reached its response limit. Please try again later."
        );
      } else {
        setSubmitError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: any) => {
   
    switch (field.type) {
      case "TEXT":
        return (
          <Input
            placeholder={field.placeholder ?? ""}
            value={values[field.labelKey] ?? ""}
            onChange={(e) =>
              handleChange(field.labelKey, e.target.value)
            }
            required={field.isRequired}
          />
        );

      case "EMAIL":
        return (
          <Input
            type="email"
            placeholder={field.placeholder ?? ""}
            value={values[field.labelKey] ?? ""}
            onChange={(e) =>
              handleChange(field.labelKey, e.target.value)
            }
            required={field.isRequired}
          />
        );

      case "PASSWORD":
        return (
          <Input
            type="password"
            placeholder={field.placeholder ?? ""}
            value={values[field.labelKey] ?? ""}
            onChange={(e) =>
              handleChange(field.labelKey, e.target.value)
            }
            required={field.isRequired}
          />
        );

      case "NUMBER":
        return (
          <Input  
            type="number"
            placeholder={field.placeholder ?? ""}
            value={values[field.labelKey] ?? ""}
            onChange={(e) =>
              handleChange(field.labelKey, e.target.value)
            }
            required={field.isRequired}
          /> 
        );

      case "YES_NO":
        return (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={values[field.labelKey] ?? false}
              onCheckedChange={(checked) =>
                handleChange(field.labelKey, checked)
              }
            />
            <span className="text-sm text-muted-foreground">
              Yes
            </span>
          </div>
        );
// case "RATING":
//   return (
//     <div className="flex gap-2 text-3xl">
//       {[1,2,3,4,5].map((star) => (
//         <button
//           type="button"
//           key={star}
//           onClick={() =>
//             handleChange(
//               field.labelKey,
//               star
//             )
//           }
//           className={
//             (values[field.labelKey] ?? 0) >= star
//               ? "text-yellow-400"
//               : "text-gray-500"
//           }
//         >
//           ★
//         </button>
//       ))}
//     </div>
//   );

case "RATING":
  return (
    <RatingField
      theme={form?.theme ?? "DEFAULT"}
      value={values[field.labelKey] ?? 0}
      onChange={(rating) =>
        handleChange(field.labelKey, rating)
      }
    />
  );

 case "OPTION":
  return (
    <RadioGroup
      value={values[field.labelKey] ?? ""}
      onValueChange={(value) =>
        handleChange(field.labelKey, value)
      }
    >
      {field.options?.map((option: string) => (
        <div
          key={option}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem
            value={option}
            id={`${field.id}-${option}`}
          />

          <Label htmlFor={`${field.id}-${option}`}>
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
      default:
        return null;
    }

    
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="flex items-center justify-center h-[80vh] 
                      p-6
             rounded-xl card-bg border transition-all  shadow-blue-500/50
             duration-300
             hover:border-[#55C96B]
                      
                    ">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="animate-spin" />
            Loading form...
          </div>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="flex items-center justify-center h-[80vh] px-6">
          <Card className="max-w-md w-full shadow-xl p-6
             rounded-xl card-bg border transition-all  shadow-blue-500/50
             duration-300 hover:border-[#55C96B] ">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-red-500">
                Form not found
              </h2>
              <p className="text-muted-foreground mt-3">
                This form may have been removed or the link is invalid.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (

    <>
  <Header />

  <main
    className={cn(
      "flex-1 flex items-center justify-center px-6 py-8",
      themeConfig.wrapperClass
    )}
    style={{
      backgroundImage: themeConfig.backgroundImage
        ? `url(${themeConfig.backgroundImage})`
        : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="w-full max-w-2xl">
      <Card
        className={cn(
          "",
          themeConfig.cardClass
        )}
      >
         <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2
                    className="mx-auto title-font-color"
                    size={56}
                  />

                  <h2 className="text-3xl font-bold mt-6 title-font-color">
                    Submission Successful
                  </h2>

                  <p className="text-muted-foreground mt-4">
                    Thank you for submitting this form.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold title-font-color">
                      {form.title}
                    </h1>

                    {form.description && (
                      <p className="text-muted-foreground mt-3">
                        {form.description}
                      </p>

                    )}
{/* <ReportFormDialog
formId={form.id}
/> */}


{user && (

hasReported ? (

<Button
    disabled
    variant="secondary"
>
    ✓ Already Reported
</Button>

) : (

<Button
    type="button"
    variant="outline"
    className="text-red-500"
    onClick={() => setOpenReport(true)}
>
    🚩 Report Form
</Button>

)

)}             
                  </div>

                  <form
                    className="space-y-6"
                    onSubmit={onSubmit}
                  >
                    {form.fields.map((field) => (
                      <div
                        key={field.id}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium mb-2 flex label-font-color">
                          {field.label}

                          {field.isRequired && (
                            <span className="text-red-500 ml-1">
                              *
                            </span>
                          )}
                        </label>

                        {renderField(field)}

                        {field.description && (
                          <p className="text-xs text-muted-foreground">
                            {field.description}
                          </p>
                        )}
                      </div>
                    ))}

                    {submitError && (
                      <p className="text-sm text-[#ef4444] mb-4">
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting}
                      className={cn(
    "w-full bg-[#55C96B] hover:bg-[#49b85f] text-white h-12",
    themeConfig.buttonClass
  )}
                      // className="w-full bg-[#55C96B] hover:bg-[#49b85f] text-white h-12"
                    >
                      {submitting
                        ? "Submitting..."
                        : "Submit Form"}
                    </Button>

                    {/* <Button
        variant="outline"
        className="text-red-500 border-red-500 hover:bg-red-50"
        onClick={() => setOpenReport(true)}
    >
        🚩 Report Form
    </Button> */}

                  </form>
                </>
              )}
            </CardContent>
         
      </Card>
    </div>
    <ReportFormDialog
    open={openReport}
    onOpenChange={setOpenReport}
    formId={form.id}
/>
  </main>

  <Footer />
  
</>





  );
  
};


export default Page;






// "use client";

// import React, { useState } from "react";
// import { useParams } from "next/navigation";
// import { useGetForm, useSubmitForm } from "~/hooks/api/form";

// import { Card, CardContent } from "~/components/ui/card";
// import { Input } from "~/components/ui/input";
// import { Button } from "~/components/ui/button";
// import { Textarea } from "~/components/ui/textarea";
// import { Checkbox } from "~/components/ui/checkbox";

// import {
//   CheckCircle2,
//   Loader2,
// } from "lucide-react";

// const Page = () => {
//   const { form_id } = useParams<{ form_id: string }>();

//   const { form, isLoading, error } = useGetForm(form_id);
//   const { submitFormAsync } = useSubmitForm();

//   const [submitted, setSubmitted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [values, setValues] = useState<Record<string, any>>({});

//   const handleChange = (key: string, value: any) => {
//     setValues((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form) return;

//     try {
//       setSubmitting(true);

//       const mappedValues = form.fields
//         .filter(
//           (field) => values[field.labelKey] !== undefined
//         )
//         .map((field) => ({
//           formFieldId: field.id,
//           value: String(values[field.labelKey]),
//         }));

//       await submitFormAsync({
//         formId: form.id,
//         values: mappedValues,
//       });

//       setSubmitted(true);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const renderField = (field: any) => {
//     switch (field.type) {
//       case "TEXT":
//         return (
//           <Input
//             placeholder={field.placeholder ?? ""}
//             value={values[field.labelKey] ?? ""}
//             onChange={(e) =>
//               handleChange(field.labelKey, e.target.value)
//             }
//             required={field.isRequired}
//           />
//         );

//       case "EMAIL":
//         return (
//           <Input
//             type="email"
//             placeholder={field.placeholder ?? ""}
//             value={values[field.labelKey] ?? ""}
//             onChange={(e) =>
//               handleChange(field.labelKey, e.target.value)
//             }
//             required={field.isRequired}
//           />
//         );

//       case "PASSWORD":
//         return (
//           <Input
//             type="password"
//             placeholder={field.placeholder ?? ""}
//             value={values[field.labelKey] ?? ""}
//             onChange={(e) =>
//               handleChange(field.labelKey, e.target.value)
//             }
//             required={field.isRequired}
//           />
//         );

//       case "NUMBER":
//         return (
//           <Input
//             type="number"
//             placeholder={field.placeholder ?? ""}
//             value={values[field.labelKey] ?? ""}
//             onChange={(e) =>
//               handleChange(field.labelKey, e.target.value)
//             }
//             required={field.isRequired}
//           />
//         );

//       case "YES_NO":
//         return (
//           <div className="flex items-center gap-3">
//             <Checkbox
//               checked={values[field.labelKey] ?? false}
//               onCheckedChange={(checked) =>
//                 handleChange(field.labelKey, checked)
//               }
//             />
//             <span className="text-sm text-muted-foreground">
//               Yes
//             </span>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="flex items-center gap-3 text-muted-foreground">
//           <Loader2 className="animate-spin" />
//           Loading form...
//         </div>
//       </div>
//     );
//   }

//   if (error || !form) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center px-6">
//         <Card className="max-w-md w-full">
//           <CardContent className="p-8 text-center">
//             <h2 className="text-2xl font-semibold text-red-500">
//               Form not found
//             </h2>
//             <p className="text-muted-foreground mt-3">
//               This form may have been removed or the link is invalid.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background px-6 py-12">
//       <div className="max-w-2xl mx-auto">
//         <Card className="shadow-xl border-border">
//           <CardContent className="p-8">
//             {submitted ? (
//               <div className="text-center py-10">
//                 <CheckCircle2
//                   className="mx-auto text-[#55C96B]"
//                   size={56}
//                 />

//                 <h2 className="text-3xl font-bold mt-6 text-[#55C96B]">
//                   Submission Successful
//                 </h2>

//                 <p className="text-muted-foreground mt-4">
//                   Thank you for submitting the form.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="mb-8">
//                   <h1 className="text-4xl font-bold text-[#55C96B]">
//                     {form.title}
//                   </h1>

//                   {form.description && (
//                     <p className="text-muted-foreground mt-3">
//                       {form.description}
//                     </p>
//                   )}
//                 </div>

//                 <form
//                   className="space-y-6"
//                   onSubmit={onSubmit}
//                 >
//                   {form.fields.map((field) => (
//                     <div
//                       key={field.id}
//                       className="space-y-2"
//                     >
//                       <label className="text-sm font-medium">
//                         {field.label}

//                         {field.isRequired && (
//                           <span className="text-red-500 ml-1">
//                             *
//                           </span>
//                         )}
//                       </label>

//                       {renderField(field)}

//                       {field.description && (
//                         <p className="text-xs text-muted-foreground">
//                           {field.description}
//                         </p>
//                       )}
//                     </div>
//                   ))}

//                   <Button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full bg-[#55C96B] hover:bg-[#49b85f] text-white h-12"
//                   >
//                     {submitting
//                       ? "Submitting..."
//                       : "Submit Form"}
//                   </Button>
//                 </form>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetForm, useSubmitForm } from "~/hooks/api/form";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

import {
  CheckCircle2,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const Page = () => {
  const { form_id } = useParams<{ form_id: string }>();
  const { theme, setTheme } = useTheme();

  const { form, isLoading, error } = useGetForm(form_id);
  const { submitFormAsync } = useSubmitForm();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});

  const isDark = theme === "dark";

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
      console.error(error);
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

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="flex items-center justify-center h-[80vh]">
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
          <Card className="max-w-md w-full">
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
    <div className="min-h-screen bg-background">
      

      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-border">
            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2
                    className="mx-auto text-[#55C96B]"
                    size={56}
                  />

                  <h2 className="text-3xl font-bold mt-6 text-[#55C96B]">
                    Submission Successful
                  </h2>

                  <p className="text-muted-foreground mt-4">
                    Thank you for submitting this form.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#55C96B]">
                      {form.title}
                    </h1>

                    {form.description && (
                      <p className="text-muted-foreground mt-3">
                        {form.description}
                      </p>
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
                        <label className="text-sm font-medium">
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

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#55C96B] hover:bg-[#49b85f] text-white h-12"
                    >
                      {submitting
                        ? "Submitting..."
                        : "Submit Form"}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
  
};

// function Header({
//   isDark,
//   setTheme,
// }: {
//   isDark: boolean;
//   setTheme: (theme: string) => void;
// }) {
//   return (
//     <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-background border-b border-border shadow-sm">
//       <Link
//         href="/"
//         className="text-2xl font-bold text-[#55C96B]"
//       >
//         BuildForms
//       </Link>

//       <button
//         onClick={() =>
//           setTheme(isDark ? "light" : "dark")
//         }
//         className="relative flex h-10 w-20 items-center rounded-full bg-muted border border-border px-1 transition"
//       >
//         <div
//           className={`absolute h-8 w-8 rounded-full bg-[#55C96B] transition-transform duration-300 ${
//             isDark
//               ? "translate-x-10"
//               : "translate-x-0"
//           }`}
//         />

//         <div className="relative z-10 flex w-full justify-between px-1">
//           <Moon
//             size={16}
//             className={
//               isDark
//                 ? "text-white"
//                 : "text-muted-foreground"
//             }
//           />
//           <Sun
//             size={16}
//             className={
//               !isDark
//                 ? "text-white"
//                 : "text-muted-foreground"
//             }
//           />
//         </div>
//       </button>
//     </header>
//   );
// }

export default Page;

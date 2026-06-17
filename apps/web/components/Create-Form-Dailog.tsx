import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCreateForm, useListForms } from "~/hooks/api/form";

import { CirclePlusIcon } from "lucide-react";

export type FormTheme = "DEFAULT" | "WANO" | "STARK" | "BATMAN";

import { useSnackbar } from "notistack";


const CreateFormDailog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { forms } = useListForms();
  const { createFormAsync } = useCreateForm();

  const handleCreateForm = async () => {
    if (!title.trim()) {
      enqueueSnackbar("Form title is required", { variant: "error" });

      return;
    }

    try {
      await createFormAsync({
        title,
        description,
        theme:theme as FormTheme,
      } as any);

      enqueueSnackbar("Form created successfully", { variant: "success" });

      setTitle("");
      setDescription("");
      setTheme("");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span
          data-variant="default"
            className="
              h-8
              px-3
              inline-flex
              items-center
              justify-center
              transition-all
              cursor-pointer
              greenBg
              rounded-md
              text-white
            "
            style={{ display: "inline-flex" }}
          >
            <CirclePlusIcon style={{ marginRight: "8px", width:"16px", height:"16px" }} />
            Create Form
          </span>
        </DialogTrigger>

        <DialogContent className=" p-6
             rounded-xl card-bg border transition-all  shadow-blue-500/50
             duration-300
             hover:border-[#55C96B]
             
             text-left ">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
            className="border rounded-lg h-10 px-4"
              placeholder="Form title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
            className="border rounded-lg h-10 px-4"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <select
              value={theme}
              // onChange={(e) => setTheme(e.target.value)}
              onChange={(e) => setTheme(e.target.value as FormTheme)}
              className="w-full border rounded-lg h-10 px-3 text-gray-400"
            >
 <option value="" disabled>
                Select a Theme
              </option>
              
              <option value="DEFAULT">Default</option>

              <option value="WANO">Wano Country</option>

              <option value="STARK">Stark Tech</option>

              <option value="BATMAN">Gotham Knight</option>
            </select>

            <Button
              onClick={handleCreateForm}
              className="w-full bg-[#55C96B] text-[#fff] cursor-pointer"
            >Create Form</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFormDailog;

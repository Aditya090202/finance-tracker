"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  Amount: z.number(),
  Category: z
    .string()
    .min(5, { message: "Category must be at least 5 characters" })
    .max(50),
  Type: z
    .string()
    .min(5, { message: "Type should be at least 5 characters" })
    .max(20),
});
type FormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Category: "",
      Type: "",
    },
  });
  async function onSubmit(values: FormData) {
    // this is where you do all your API calling to your backend
    try {
      const response = await fetch("http://localhost:8080/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Transaction created:", result);
        form.reset();
        // You can add a success message or redirect here
      } else {
        console.error("Failed to create transaction");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  }

  return (
    <div className="flex w-full justify-center max-h-screen">
      <div className="border border-black rounded-xl p-5 w-fit ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="$0.00"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : parseFloat(value)
                        );
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a category" {...field} />
                  </FormControl>
                  <FormDescription>What category is this?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a type" {...field} />
                  </FormControl>
                  <FormDescription>
                    What type of transaction is this?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

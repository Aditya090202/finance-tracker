"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  amount: z.number().min(0.0, { message: "Amount must be at least 1" }),
  category: z.string().min(5, { message: "Category is required" }).max(20),
  type: z.string().min(5, { message: "Type is required" }).max(20),
});

type FormData = z.infer<typeof formSchema>;

export default function TransactionForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      type: "",
    },
  });

  async function onSubmit(values: FormData) {
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Transaction</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Food, Entertainment, Bills"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What category does this transaction belong to?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Credit Or Debit" {...field} />
                </FormControl>
                <FormDescription>Is this an expense or income?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </Form>
    </div>
  );
}

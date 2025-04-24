import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TagInput from "@/components/ui/tag-input"
import { useToast } from "@/components/ui/use-toast"
import { createDEPrepQuestion } from "@/utils/queries";

const formSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  substackLink: z.string().url("Please enter a valid URL"),
})

const categories = [
  "ETL/ELT",
  "Data Warehousing",
  "Data Modeling",
  "SQL",
  "Distributed Systems",
  "Big Data",
]

const DEPrepForm = () => {
  const { toast } = useToast()
  const [tags, setTags] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      category: "",
      tags: [],
      substackLink: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createDEPrepQuestion(values);
      toast({
        title: "Success",
        description: "DE Prep question has been submitted",
      });
      form.reset();
      setTags([]);
    } catch (error) {
      console.error('Error submitting DE Prep question:', error);
      toast({
        title: "Error",
        description: "Failed to submit DE Prep question",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your question"
                  className="bg-[#242424] border-[#333]"
                  {...field}
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#242424] border-[#333]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#242424] border-[#333]">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  placeholder="Add tags..."
                  tags={tags}
                  setTags={(newTags) => {
                    setTags(newTags)
                    field.onChange(newTags)
                  }}
                  className="bg-[#242424] border-[#333]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="substackLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Substack Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://..."
                  className="bg-[#242424] border-[#333]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Submit Question
        </Button>
      </form>
    </Form>
  )
}

export default DEPrepForm

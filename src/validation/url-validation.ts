import z from "zod";


export const urlValidationSchema = z.object({
  url: z
    .string()
    .url("Invalid URL format")
    .min(1, "URL is required")

});
import { z } from "zod";

export function getZodErrors(error: unknown): Record<string, string> {
  if (error instanceof z.ZodError) {
    const errors: Record<string, string> = {};
    
    error.issues.forEach((issue) => {
      if (issue.path.length > 0) {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      }
    });
    
    return errors;
  }
  
  return {};
}
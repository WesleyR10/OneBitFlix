import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceOptions } from "./course";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category, // Vem do models arquivo index
    options: categoryResourceOptions
  },
  {
    resource: Course, // Vem do models arquivo index
    options: courseResourceOptions
  },
]
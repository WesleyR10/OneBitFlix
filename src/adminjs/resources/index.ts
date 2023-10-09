import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceFeatures, courseResourceOptions } from "./course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episdode";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category, // Vem do models arquivo index
    options: categoryResourceOptions
  },
  {
    resource: Course, // Vem do models arquivo index
    options: courseResourceOptions,
    features: courseResourceFeatures
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  },
]
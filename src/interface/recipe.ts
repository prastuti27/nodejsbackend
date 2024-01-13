export interface createRecipePayloadInterface {
  title: string;
  description: string;
  ingredients: { name: string; quantity: number }[];
  instructions: string[];
  photo: string;
  created_by?: number;
}

export interface updateRecipePayloadInterface {
  title?: string;
  description?: string;
  ingredients?: { name: string; quantity: number }[];
  instructions?: string[];
  photo?: string;
  updatedAt: Date;
}

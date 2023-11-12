import Elysia from "elysia";
import { createRecipe, getAllRecipes } from "../services/recipe.service";
import { verifyToken } from "../services/auth.service";

export const recipeController = (app: Elysia) => {
  app.post("/create-recipe", async (context) => {
    try {
      const authHeader = context.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        throw new Error("Invalid token");
      }

      const verifiedToken = verifyToken(token as string);

      const recipeData: any = context.body;

      const newRecipe = await createRecipe({
        title: recipeData.title,
        body: recipeData.body,
        userId: verifiedToken?.id,
      });

      return {
        recipe: newRecipe,
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.get("/recipes", async () => {
    try {
      const recipes = await getAllRecipes();

      return {
        recipes,
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });
};

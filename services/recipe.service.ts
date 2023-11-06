import { prisma } from "../index";
import { verifyToken } from "./auth.service";

export const createRecipe = async (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  const { title, body, userId } = data;

  const recipe = await prisma.recipe.create({
    data: {
      title,
      body,
      userId,
    },
  });

  return recipe;
};

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      user: true,
      comments: true,
    },
  });

  return recipes;
};

export const getRecipeById = async (id: number) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return recipe;
};

// export const updateRecipe = async (
//   id: number,
//   data: { title: string; body: string },
//   token: string
// ) => {
//   const isTokenValid: any = verifyToken(token);

//   if (!isTokenValid) {
//     throw new Error("Invalid token");
//   }

//   const { title, body } = data;

//   const recipe = await prisma.recipe.update({
//     where: {
//       id,
//       userId: isTokenValid.id,
//     },
//     data: {
//       title,
//       body,
//     },
//   });

//   return recipe;
// };

// export const deleteRecipe = async (id: number, token: string) => {
//   const isTokenValid: any = verifyToken(token);

//   if (!isTokenValid) {
//     throw new Error("Invalid token");
//   }

//   const recipe = await prisma.recipe.delete({
//     where: {
//       id,
//       userId: isTokenValid.id,
//     },
//   });

//   if (!recipe) {
//     throw new Error("Recipe not found");
//   }

//   return recipe;
// };

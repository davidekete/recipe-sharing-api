import { prisma } from "../index";

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



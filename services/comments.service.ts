import { prisma } from "../index";

export const createComment = async (data: {
  body: string;
  recipeId: number;
  userId: number;
}) => {
  try {
    const { body, recipeId, userId } = data;

    const comment = await prisma.comment.create({
      data: {
        body,
        userId,
        recipeId: recipeId,
      },
    });

    return comment;
  } catch (error: any) {
    throw error;
  }
};

export const getAllCommentsForRecipe = async (recipeId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      recipeId,
    },
    include: {
      user: true,
    },
  });

  return comments;
};

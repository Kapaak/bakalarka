import { prisma } from "./prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});

  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      routes: true,
    },
  });
  return user;
};

export const createUser = async (email: string, name: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  return user;
};

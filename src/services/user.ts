import UserModel from "../model/users";
import NotFoundError from "../error/notFoundError";

export const getAll = async () => {
  const data = await UserModel.getAll();

  return data;
};

export const getById = async (id: number) => {
  const data = await UserModel.getById(id);

  if (!data) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  return data;
};

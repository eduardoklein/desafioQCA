import * as repository from "../repository/categories.repository";
import { getProductsByCategoryId } from "../repository/products.repository";
import { ApiError } from "../utils/apiError";

export async function getAllCategories() {
  try {
    const categories = await repository.getAllCategories();
    if (categories.length === 0) {
      throw new ApiError(
        404,
        "NO_CATEGORIES_FOUND",
        "Nenhuma categoria encontrada."
      );
    }
    return categories;
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao buscar categorias."
    );
  }
}

export async function getCategoryById(id: number) {
  try {
    const category = await repository.getCategoryId(id);
    if (!category) {
      throw new ApiError(
        404,
        "CATEGORY_NOT_FOUND",
        "Categoria não encontrada."
      );
    }
    return category;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao buscar categoria."
    );
  }
}

export async function getCategoryByName(name: string) {
  return await repository.getCategoryByName(name);
}

export async function createCategory(name: string) {
  try {
    const checkExistence = await repository.getCategoryByName(name);
    if (checkExistence) {
      throw new ApiError(
        409,
        "CATEGORY_ALREADY_EXISTS",
        "Categoria já existe."
      );
    }
    return await repository.createCategory(name);
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao criar categoria."
    );
  }
}

export async function updateCategory(id: number, name: string) {
  try {
    const categoryByName = await repository.getCategoryByName(name);
    if (categoryByName) {
      throw new ApiError(
        409,
        "CATEGORY_ALREADY_EXISTS",
        "Categoria já existe."
      );
    }

    const categoryById = await repository.getCategoryId(id);
    if (!categoryById) {
      throw new ApiError(
        404,
        "CATEGORY_NOT_FOUND",
        "Categoria não encontrada."
      );
    }
    return await repository.updateCategory(id, name);
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao atualizar categoria."
    );
  }
}

export async function deleteCategory(id: number) {
  const categoryById = await repository.getCategoryId(id);
  if (!categoryById) {
    throw new ApiError(404, "CATEGORY_NOT_FOUND", "Categoria não encontrada.");
  }
  const associatedProducts = await getProductsByCategoryId(id);
  if (associatedProducts.length > 0) {
    throw new ApiError(
      400,
      "CATEGORY_HAS_PRODUCTS",
      "Não é possível deletar uma categoria que possui produtos associados."
    );
  }
  try {
    return await repository.deleteCategory(id);
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao deletar categoria."
    );
  }
}

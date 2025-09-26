import * as repository from "../repository/products.repository";
import {
  createInventory,
  deleteInventory,
} from "../repository/inventories.repository";

import { ApiError } from "../utils/apiError";

export async function getAllProducts() {
  try {
    const products = await repository.getAllProducts();
    return products;
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao buscar produtos."
    );
  }
}

export async function getProductById(id: number) {
  try {
    const product = repository.getProductById(id);
    if (!product) {
      throw new ApiError(404, "PRODUCT_NOT_FOUND", "Produto não encontrado.");
    }
    return product;
  } catch (error) {
    throw new ApiError(500, "INTERNAL_SERVER_ERROR", "Erro ao buscar produto.");
  }
}

export async function createProduct(
  name: string,
  sku: string,
  categoryId: number,
  quantity: number
) {
  try {
    const productExists = await repository.getProductBySKU(sku);
    if (productExists) {
      throw new ApiError(409, "PRODUCT_ALREADY_EXISTS", "Produto já existe.");
    }
    const product = await repository.createProduct(name, sku, categoryId);
    await createInventory({
      productId: product.id,
      quantity,
    });
    return product;
  } catch (error) {
    throw new ApiError(500, "INTERNAL_SERVER_ERROR", "Erro ao criar produto.");
  }
}

export async function updateProduct(
  id: number,
  name: string,
  sku: string,
  categoryId: number
) {
  try {
    const product = await repository.getProductById(id);
    if (!product) {
      throw new ApiError(404, "PRODUCT_NOT_FOUND", "Produto não encontrado.");
    }
    return await repository.updateProduct(id, name, sku, categoryId);
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao atualizar produto."
    );
  }
}

export async function deleteProduct(id: number) {
  try {
    const product = await repository.getProductById(id);
    if (!product) {
      throw new ApiError(404, "PRODUCT_NOT_FOUND", "Produto não encontrado.");
    }
    await deleteInventory(id);
    return await repository.deleteProduct(id);
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao deletar produto."
    );
  }
}

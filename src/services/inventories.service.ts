import { create } from "domain";
import * as repository from "../repository/inventories.repository";
import { ApiError } from "../utils/apiError";
import { createTransaction } from "../repository/transactions.repository";

export async function getAllInventories() {
  try {
    const inventories = await repository.getAllInventories();
    if (inventories.length === 0) {
      throw new ApiError(
        404,
        "NO_INVENTORIES_FOUND",
        "Nenhum inventário encontrado."
      );
    }
    return inventories;
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao buscar inventários."
    );
  }
}

export async function getInventoriesByProductId(productId: number) {
  try {
    const inventories = await repository.getInventoriesByProductId(productId);
    if (!inventories) {
      throw new ApiError(
        404,
        "NO_INVENTORY_FOUND_FOR_PRODUCT",
        "Nenhum inventário encontrado para o produto."
      );
    }
    return inventories;
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao buscar inventário por ID do produto."
    );
  }
}

export async function registerProductOnInventory(
  productId: number,
  quantity: number
) {
  if (quantity <= 0) {
    throw new ApiError(
      400,
      "INVALID_QUANTITY",
      "A quantidade precisa ser maior que 0."
    );
  }
  try {
    const products = await repository.getInventoriesByProductId(productId);
    if (!products) {
      throw new ApiError(
        404,
        "PRODUCT_NOT_FOUND",
        "Produto não encontrado no inventário."
      );
    }
    const newQuantity = products.quantity + quantity;
    return await repository.inventoryTransaction(
      productId,
      newQuantity,
      "ENTRADA"
    );
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao alterar quantidade do produto no inventário."
    );
  }
}

export async function removeProductOnInventory(
  productId: number,
  quantity: number
) {
  if (quantity <= 0) {
    throw new ApiError(
      400,
      "INVALID_QUANTITY",
      "A quantidade precisa ser maior que 0."
    );
  }
  try {
    const products = await repository.getInventoriesByProductId(productId);
    if (!products) {
      throw new ApiError(
        404,
        "PRODUCT_NOT_FOUND",
        "Produto não encontrado no inventário."
      );
    }
    const newQuantity = products.quantity - quantity;
    if (newQuantity < 0) {
      throw new ApiError(
        400,
        "INSUFFICIENT_QUANTITY",
        "Quantidade insuficiente no inventário."
      );
    }
    return await repository.inventoryTransaction(
      productId,
      newQuantity,
      "SAIDA"
    );
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao alterar quantidade do produto no inventário."
    );
  }
}

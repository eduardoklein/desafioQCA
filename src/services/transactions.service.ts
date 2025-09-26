import { ApiError } from "../utils/apiError";

import * as repository from "../repository/transactions.repository";

export async function getAllTransactions() {
  try {
    const transactions = await repository.getAllTransactions();
    if (!transactions) {
      throw new ApiError(404, "NOT_FOUND", "Nenhuma transação encontrada.");
    }
    return transactions;
  } catch (error) {
    throw new ApiError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Erro ao buscar transações."
    );
  }
}

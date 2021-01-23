import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((acc, value) => acc + value, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((acc, value) => acc + value, 0);

    const total = parseFloat((income - outcome).toFixed(2));

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
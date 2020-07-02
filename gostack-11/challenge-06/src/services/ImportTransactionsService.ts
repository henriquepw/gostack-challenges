import { getCustomRepository, getRepository, In } from 'typeorm';

import csvParse from 'csv-parse';

import fs from 'fs';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const contactsReadStream = fs.createReadStream(filePath);

    const parser = csvParse({
      from_line: 2,
    });

    const transactions: CSVTransaction[] = [];
    const categoriesSet: Set<string> = new Set();

    const parseCSV = contactsReadStream.pipe(parser);

    parseCSV.on('data', line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categoriesSet.add(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const categoriesList: string[] = Array.from(categoriesSet);

    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categoriesList),
      },
    });

    const existentCategoriesTitles = existentCategories.map(
      ({ title }) => title,
    );

    const addCategoryTitle = categoriesList.filter(
      category => !existentCategoriesTitles.includes(category),
    );

    const newCategories = categoriesRepository.create(
      addCategoryTitle.map(title => ({ title })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...existentCategories, ...newCategories];

    const newTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    const createdTransactions = await transactionsRepository.save(
      newTransactions,
    );

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;

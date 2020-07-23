import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not exists');
    }

    const existentProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existentProducts.length) {
      throw new AppError('Could not find any products with the ids.');
    }

    const existentProductsIds = existentProducts.map(product => product.id);

    const inexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (inexistentProducts.length) {
      throw new AppError(
        `Could not find products with the ids ${inexistentProducts.join(', ')}`,
      );
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product =>
        existentProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError(
        `The quantity of the products ${findProductsWithNoQuantityAvailable.join(
          ', ',
        )} is not availble.`,
      );
    }

    const serializedProducts = products.map(({ id, quantity }) => ({
      price: existentProducts.filter(p => p.id === id)[0].price,
      product_id: id,
      quantity,
    }));

    const order = await this.ordersRepository.create({
      products: serializedProducts,
      customer,
    });

    const orderedProductQuantity = existentProducts.map(product => ({
      ...product,
      quantity:
        product.quantity -
        products.filter(p => p.id === product.id)[0].quantity,
    }));

    await this.productsRepository.updateQuantity(orderedProductQuantity);

    return order;
  }
}

export default CreateOrderService;

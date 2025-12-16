import {IApi, IProduct, IOrder, IOrderResult, IServerResponse} from '../../types/index.ts';

export class Communication {
  constructor(private api: IApi) {}

  // Получение списка товаров
  async getCatalog(): Promise<IProduct[]> {
    const response = await this.api.get<IServerResponse>('/product/');
    return response.items;
  }

  // Создание заказа
  async postOrder(order: IOrder): Promise<IOrderResult> {
    return await this.api.post<IOrderResult>('/order/', order);
  }
}
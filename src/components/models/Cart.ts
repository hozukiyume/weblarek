import {IProduct} from '../../types/index.ts';

export class Cart {
  private items: IProduct[] = [];

  getItems(): IProduct[] {
    return this.items
  }

  addItem(item: IProduct): void {
    this.items.push(item)
  }

  deleteItem(item: IProduct): void {
    this.items = this.items.filter(i => i.id !== item.id);
  }

  clear(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items
    .map((item) => item.price ?? 0)
    .reduce((total, current)=>(total + current), 0);
  }

  getTotalAmount(): number {
    return this.items.length;
  }

  isAvailable(id: string): boolean {
    return this.items.some(item => item.id === id); 
  }
}
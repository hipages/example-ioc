export class ShoppingCartItem {
  description: string;
  productId: number;
  quantity: number;
  itemCost: number;
}

export class ShoppingCart {
  private id: number;
  private items: Array<ShoppingCartItem> = [];
  private subTotal: number;
  private tax: number;
  private total: number;

}

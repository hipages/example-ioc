import { Tax } from './Tax';
import { ShoppingCartItem, ShoppingCart } from './../dao/ShoppingCart';

export class CalculateTax {
    private GST: number;
    constructor(GST) {
        this.GST = GST;
    }
  // tslint:disable-next-line:prefer-function-over-method
  private calculateTax(item: ShoppingCart): ShoppingCart {
    item['tax'] = item['subTotal'] * 10 / 100;
    return item;
  }
}

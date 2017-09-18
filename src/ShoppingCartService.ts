/**
 * Setting up base for this tutorial
 */
import * as mysql from 'mysql';
import * as _ from 'lodash';
import { ShoppingCartItem, ShoppingCart } from './dao/ShoppingCart';
import { ShoppingCartDao } from './dao/ShoppingCartDao';

export class ShoppingCartService {
  private items: Array<ShoppingCartItem> = [];
  private shoppingCartId: number;
  private ShoppingCartDao: ShoppingCartDao;
  private mysqlClient: mysql;

  constructor(dbConfig) {
    this.mysqlClient = this.getConnection(dbConfig);
    this.ShoppingCartDao = new ShoppingCartDao(this.mysqlClient);
    return this;
  }

  // tslint:disable-next-line:prefer-function-over-method
  protected getConnection(dbConfig) {
    return mysql.createConnection(dbConfig).connect();
  }
  public addProduct(item: ShoppingCartItem) {
    if (this.items.length < 3) {
      this.items.push(item);
    }
  }

  public count() {
    return this.items.length;
  }

  calculateSubTotal() {
    return _.sumBy(this.items, 'subtotal');
  }

  checkout() {
    if (this.items.length === 0) {
      throw new Error('Cannot checkout an empty cart');
    }
    this.clear();
  }

  clear() {
    this.items = [];
  }

}

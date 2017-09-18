/**
 * Setting up base for this tutorial
 */
import * as mysql from 'mysql';
import * as _ from 'lodash';

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

export class ShoppingCartService {
  private items: Array<ShoppingCartItem> = [];
  private shoppingCartId: number;
  private mysqlClient: mysql;

  constructor() {
    this.mysqlClient = mysql.createConnection({
      host     : 'localhost',
      user     : 'me',
      password : 'secret',
      database : 'my_db',
    }).connect();
    return this;
  }

  private executeQuery(query: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mysqlClient.query(query, params,
        (err, records) => {
          // And done with the connection.
          this.mysqlClient.release();
          if (err) {
            return reject(new Error(`Unable to execute query: ${err.message || 'connection error'}`));
          }
          if (records && records.length > 0) {
            return resolve(records);
          }
        },
      );
    });
  }
  public getShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {
    try {
      // tslint:disable-next-line:no-invalid-this
      return this.executeQuery('SELECT * FROM shopping_cart WHERE id = ?', [shoppingCartId]);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  }

  public async setShoppingCart(): Promise<number> {
    try {
      return await this.executeQuery('INSERT INTO ?? VALUES ?', ['shopping_cart', this.items]);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  }
  public async UpdateShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {
    try {
      // tslint:disable-next-line:no-invalid-this
      return this.executeQuery('UPDATE shopping_cart SET items = ?, subTotal = ?, tax = ?, total = ? WHERE id = ?', [shoppingCartId]);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  }

  public addProduct(item: ShoppingCartItem) {
    if (this.items.length < 3) {
      this.items.push(item);
    }
  }

  public count() {
    return this.items.length;
  }

  // tslint:disable-next-line:prefer-function-over-method
  private calculateTax(item: ShoppingCart): ShoppingCart {
    item['tax'] = item['subTotal'] * 10 / 100;
    return item;
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

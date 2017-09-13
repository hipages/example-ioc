/**
 * Setting up base for this tutorial
 */
import * as mysql from 'mysql';
import * as _ from 'lodash';


export enum Size {
  ExtraSmall,
  Small,
  Medium,
  Large,
  ExtraLarge
}

export interface Item {
  name: string,
  price: number,
  size?: Size
}


export class ShoppingCartService {
  private items: Array<Item> = [];
  private mysqlClient: mysql; 

  constructor() {
    this.mysqlClient = mysql.createConnection({
      host     : 'localhost',
      user     : 'me',
      password : 'secret',
      database : 'my_db'
    }).connect();    
    return this;
  }
  
  public getShoppingCart(shoppingCartId: number): Array<Item> {
    this.mysqlClient.query('SELECT * FROM shopping_cart WHERE shoppingCartId = ?', [shoppingCartId],
      (err, records) => {
        // And done with the connection. 
        this.mysqlClient.release();
        if (err) {
          throw new Error(`Unable to fetch shoppoint cart: ${err.message || 'connection error'}`);
        }
        return records;
      }
    );
  }

  public setShoppingCart(): number {
    this.mysqlClient.query('INSSERT INTO ?? VALUES ?', ['shopping_cart', this.items],
      (err, records) => {
        // And done with the connection. 
        this.mysqlClient.release();
        if (err) {
          throw new Error(`Unable to insert shoppoint cart: ${err.message || 'connection error'}`);
        }
        return records[0].shoppingCartId;
      }
    );
  }
  public UpdateShoppingCart(shoppingCartId: number): Array<Item> {
    this.mysqlClient.query('UPDATE shopping_cart SET productId = ?, userId = ?, amount = ?, tax = ?, subtotal = ? WHERE shoppingCartId = ?', this.items.concat([shoppingCartId]),
      (err, records) => {
        // And done with the connection. 
        this.mysqlClient.release();
        if (err) {
          throw new Error(`Unable to update shoppoint cart: ${err.message || 'connection error'}`);
        }
        return records;
      }
    );
  }

  public addProduct(item: Item) {
    if (this.items.length < 3) {
      this.items.push(item);
    }
  }

  public count() {
    return this.items.length;
  }

  private calculateGST() {

  }

  private calculateServiceTax() {

  }
  calculateSubTotal() {
    return _.sumBy(this.items, 'subtotal');
  }

  checkout() {
    if (this.items.length == 0) {
      throw new Error("Cannot checkout an empty cart")
    }
    this.clear();
  }

  clear() {
    this.items = [];
  }  

}
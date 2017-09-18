import * as _ from 'lodash';
import { DBClient } from 'inceptum';
import { MySqlDao } from './MySqlDao';
import { ShoppingCartItem, ShoppingCart } from './ShoppingCart';
export abstract class ShoppingCartEssentials {
  /**
   *
   * @public
   * @abstract
   * @param {number} shoppingCartId
   * @returns {Promise<ShoppingCart>}
   * @memberof ShoppingCartEssentials
   */
  public abstract getShoppingCart(shoppingCartId: number): Promise<ShoppingCart>;

  /**
   *
   * @public
   * @abstract
   * @param {any} items
   * @returns {Promise<number>}
   * @memberof ShoppingCartEssentials
   */
  public abstract setShoppingCart(items): Promise<number>;

  /**
   *
   * @public
   * @abstract
   * @param {number} shoppingCartId
   * @returns {Promise<ShoppingCart>}
   * @memberof ShoppingCartEssentials
   */
  public abstract updateShoppingCart(shoppoingCart: ShoppingCartItem, shoppingCartId: number): Promise<ShoppingCart>;
}
export class ShoppingCartDao extends MySqlDao implements ShoppingCartEssentials {

    constructor(mysqlClient: DBClient) {
        super(mysqlClient);
    }

    public getShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {
        try {
          // tslint:disable-next-line:no-invalid-this
          return super.executeQuery('SELECT * FROM shopping_cart WHERE id = ?', [shoppingCartId]);
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }

      public async setShoppingCart(items): Promise<number> {
        try {
          return await super.executeQuery('INSERT INTO ?? VALUES ?', ['shopping_cart', items]);
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }
      public async updateShoppingCart(shoppingCart: ShoppingCartItem, shoppingCartId: number): Promise<ShoppingCart> {
        try {
          const updateParams = Object.keys(shoppingCart).reduce((acc, item) => acc.concat([`${item} = ?`]), []).join();
          // tslint:disable-next-line:no-invalid-this
          return super.executeQuery(`UPDATE shopping_cart SET ${updateParams} WHERE id = ?`, [_.values(shoppingCart), shoppingCartId]);
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }
}

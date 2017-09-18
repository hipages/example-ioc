import { DBClient } from 'inceptum';
import * as mysql from 'mysql';
import { ShoppingCartItem, ShoppingCart } from './ShoppingCart';

export abstract class ShoppingCartEssentials {
  /**
   *
   * @protected
   * @abstract
   * @param {number} shoppingCartId
   * @returns {Promise<ShoppingCart>}
   * @memberof ShoppingCartEssentials
   */
  protected abstract getShoppingCart(shoppingCartId: number): Promise<ShoppingCart>;

  /**
   *
   * @protected
   * @abstract
   * @param {any} items
   * @returns {Promise<number>}
   * @memberof ShoppingCartEssentials
   */
  protected abstract setShoppingCart(items): Promise<number>;

  /**
   *
   * @protected
   * @abstract
   * @param {number} shoppingCartId
   * @returns {Promise<ShoppingCart>}
   * @memberof ShoppingCartEssentials
   */
  protected abstract updateShoppingCart(shoppingCartId: number): Promise<ShoppingCart>;
}

export class MySqlDao extends ShoppingCartEssentials {

    protected mysqlClient: mysql;

    constructor(mysqlClient: DBClient) {
      super();
        this.mysqlClient = mysqlClient;
    }

    protected executeQuery(query: string, params: any): Promise<any> {
        return this.mysqlClient.query(query, params,
          (err, records) => {
            // And done with the connection.
            this.mysqlClient.release();
            if (err) {
              return Promise.reject(new Error(`Unable to execute query: ${err.message || 'connection error'}`));
            }
            if (records && records.length > 0) {
              return Promise.resolve(records);
            }
          },
        );
    }
    /**
     *
     * @param shoppingCartId
     */
    // tslint:disable-next-line:prefer-function-over-method
    protected getShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {
      throw new Error('This is just a placeholder. you need to implement this method');
    }
    /**
     *
     * @param items
     */
    // tslint:disable-next-line:prefer-function-over-method
    protected setShoppingCart(items): Promise<number> {
      throw new Error('This is just a placeholder. you need to implement this method');
    }
    /**
     *
     *
     * @param {number} shoppingCartId
     * @returns {Promise<ShoppingCart>}
     * @memberof MySqlDao
     */
    // tslint:disable-next-line:prefer-function-over-method
    protected updateShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {
      throw new Error('This is just a placeholder. you need to implement this method');
    }

}

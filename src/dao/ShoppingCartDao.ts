import { DBClient } from 'inceptum';
import { MySqlDao } from './MySqlDao';
import { ShoppingCartItem, ShoppingCart } from './ShoppingCart';
export class ShoppingCartDao extends MySqlDao {

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
      public async UpdateShoppingCart(shoppingCartId: number): Promise<ShoppingCart> {
        try {
          // tslint:disable-next-line:no-invalid-this
          return super.executeQuery('UPDATE shopping_cart SET items = ?, subTotal = ?, tax = ?, total = ? WHERE id = ?', [shoppingCartId]);
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }
}

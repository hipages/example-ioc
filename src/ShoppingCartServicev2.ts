import * as mysql from 'mysql';



export class ShoppingCartService {

  getShoppingCart(shoppingCartId: number): Array<Todo> {
    const client = mysql("");
    client.query('SELECT * FROM todos', (err, data) => {
      
    });

  }

}
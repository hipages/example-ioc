import { DBClient } from 'inceptum';
import * as mysql from 'mysql';
import { ShoppingCartItem, ShoppingCart } from './ShoppingCart';

export class MySqlDao {

    protected mysqlClient: mysql;

    constructor(mysqlClient: DBClient) {
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
}

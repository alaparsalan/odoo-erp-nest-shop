import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as Odoo from "odoo-xmlrpc";
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService {

    private odoo: Odoo;

    constructor(private readonly databaseService: DatabaseService) { }

    async getAllOrders() {
        if (!this.databaseService) {
            return "Error: Database service not available";
        }
        return new Promise((resolve, reject) => {

            this.databaseService.getConnection().execute_kw('sale.order', 'search_read', [[]], function (err, value) {
                if (err) {
                    console.log("error: fatching orders", err);
                    reject(err);
                } else {
                    console.log("fatching orders", value);
                    resolve(value);
                }
            });
        }).then((res) => {
            return res;
        }).catch((err) => {
            console.log("Error Occured", err);
            return err;
        })
    }
}

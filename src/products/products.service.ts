import { Injectable } from '@nestjs/common';
import * as Odoo from "odoo-xmlrpc";
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {

    private odoo: Odoo;

    constructor(private readonly databaseService: DatabaseService) { }

    async getAllProducts(limit: number, offset: number) {
        if (!this.databaseService) {
            return "Error: Database service not available";
        }
        return new Promise((resolve, reject) => {
            const params = {
                limit: limit,
                offset: offset
            };

            this.databaseService.getConnection().execute_kw('product.template', 'search_read', [[], params], function (err, value) {
                if (err) {
                    console.log("Failed to retrieve product list :", err);
                    reject(err);
                } else {
                    console.log("Product List :", value);
                    resolve(value);
                }
            });
        });
    }

    getProductsData(limit: number, offset: number) {
        const result = this.getAllProducts(limit, offset)
            .then((value) => value)
            .catch((err) => console.log("Error Occured", err));
        return result;
    }
}

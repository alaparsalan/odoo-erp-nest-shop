import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as Odoo from "odoo-xmlrpc";

@Injectable()
export class DatabaseService {

    private odoo: Odoo;

    constructor() {
        this.odoo = new Odoo({
            url: process.env.ODOO_URL,
            db: process.env.ODOO_DB,
            username: process.env.ODOO_USERNAME,
            password: process.env.ODOO_PASSWORD,
        });
    }

    //Called once all modules have been initialized, but before listening for connections.
    async onApplicationBootstrap() {
        this.connectOdoo();
    }

    async connectOdoo() {
        try {
            const value = await new Promise((resolve, reject) => {
                this.odoo.connect((err, value) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(value);
                    }
                });
            });
            console.log('Database connection successful!');

        } catch (error) {
            console.log('Database connection failed:', error);

        }
    }
    getConnection() {
        return this.odoo !== undefined ? this.odoo : undefined;
    }
}

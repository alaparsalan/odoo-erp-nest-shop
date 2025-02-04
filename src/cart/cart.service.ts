import { Injectable } from '@nestjs/common';
import * as Odoo from "odoo-xmlrpc";
import { orderLineDto } from './dto/productAdd-dto';
import { DatabaseService } from 'src/database/database.service';
import { rejects } from 'assert';
import { log } from 'console';
import { IsEmail, IsEmpty, isEmpty } from 'class-validator';

@Injectable()
export class CartService {
    private odoo: Odoo;

    constructor(private readonly databaseService: DatabaseService) { }

    async fetchProducts() {
        if (!this.databaseService) {
            return "Error: database service not available";
        }
        try {
            const value = await new Promise((resolve, reject) => {
                this.databaseService.getConnection().execute_kw('sale.order.line', 'search_read', [[]], (err, value) => {
                    if (err) {
                        console.log("Error: Product fetching products:", err);
                        reject(err);
                    } else {
                        resolve(value);
                    }
                });
            });
            return value;
        } catch (err) {
            console.log("An error occurred while fetching products :", err);
            return "Error: Failed to fetch products";
        }
    }

    async fetchCart(id) {
        if (!this.databaseService) {
            return "Error: Database service not available";
        }
        try {
            const value = await new Promise((resolve, reject) => {
                this.databaseService.getConnection().execute_kw('sale.order.line', 'search_read', [
                    [[['order_partner_id', '=', Number(id)]]],
                    {}
                ], (err, value) => {
                    if (err) {
                        console.error("Error: fetching cart:", err);
                        reject(err);
                    } else {
                        resolve(value);
                    }
                });
            });
            return value;
        } catch (err) {
            console.log("An error occurred while fetching cart :", err);
            return "Error: Failed to fetch cart";
        }
    }

    async removeItemFromCart(cartRemoveId) {
        if (!this.databaseService) {
            return "Error: Database service not available";
        }
        try {
            const cartId = Number(cartRemoveId);

            const value = await new Promise((resolve, reject) => {
                this.databaseService.getConnection().execute_kw('sale.order.line', 'unlink', [[cartId]], (err, value) => {
                    if (err) {
                        console.log("Error: removing item from cart:", err);
                        reject(err);
                    } else {
                        console.log(value);
                        resolve(value);
                    }
                });
            });

            return value;
        } catch (err) {
            console.log("An error occurred while removing item from cart :", err);
            return "Error: Failed to remove item from cart";
        }
    }

    async updateItemInCart(cartId, quantity) {
        if (!this.databaseService) {
            return "Error: Database service not available";
        }
        try {
            const updatedQty = { product_uom_qty: quantity };

            const value = await new Promise((resolve, reject) => {
                this.databaseService.getConnection().execute_kw('sale.order.line', 'write', [[cartId, updatedQty]], (err, value) => {
                    if (err) {
                        console.error("Error: updating item from cart:", err);
                        reject(err);
                    } else {
                        console.log(value);
                        resolve(value);
                    }
                });
            });
            return value;
        } catch (err) {
            console.log("An error occurred while updating item in cart :", err);
            return "Error: Failed to update item in cart";
        }
    }

    async addToCart(data) {
        if (!this.databaseService) {
            return "Error: Database service not available";
        }

        const { partnerId, productId, quantity } = data;

        try {
            const id = partnerId;

            const value = await new Promise((resolve, reject) => {

                this.databaseService.getConnection().execute_kw('sale.order', 'search_read', [ // Search order_id
                    [[['partner_id', '=', Number(id)]]],
                    {}
                ], (err, value) => {
                    if (err) {
                        console.log("Error: Order searching", err);
                        reject(err);
                    } else {
                        resolve(value);
                    }
                });
            });

            if (Object.keys(value).length === 0) { // if order id is not found
                const orderline = [0, 0, { product_id: productId, product_uom_qty: Number(quantity) }];
                const args = [{
                    partner_id: partnerId,
                    order_line: [orderline],
                    state: 'draft',
                }];

                const value = await new Promise((resolve, reject) => {
                    this.databaseService.getConnection().execute_kw('sale.order', 'create', [args], (err, value) => {
                        if (err) {
                            console.log("Error: Create order Id", err);

                            reject(err);
                        } else {
                            resolve(value);
                        }
                    });
                });
                return `Order Id is : ${value}`;
            }
            else {   // if order id found
                const OID = value[0].id;
                const saleOrderLineData = {
                    order_id: OID, // ID of the existing sale order 
                    product_id: productId, // ID of the product 
                    product_uom_qty: quantity, // Quantity of the product

                };

                const value1 = await new Promise((resolve, reject) => {
                    this.databaseService.getConnection().execute_kw('sale.order.line', 'create', [[saleOrderLineData]], (err, value) => {
                        if (err) {
                            console.log("Error: create Order Line ", err);
                            reject(err);
                        } else {
                            console.log(value);
                            resolve(value);
                        }
                    });
                });
                return `Order_Line Id is : ${value1}`;
            }

        } catch (error) {
            console.error("Error adding item to cart:", error);
            return "Error: Failed to add item to cart";
        }
    }
}

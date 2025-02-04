import { Injectable } from '@nestjs/common';
import * as Odoo from "odoo-xmlrpc";
import { signUpDTO } from './dto/auth-dto';
import { DatabaseService } from 'src/database/database.service';
import { copyFileSync } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { mergeScan } from 'rxjs';
import { MESSAGES } from '@nestjs/core/constants';
import { error } from 'console';
import { rejects } from 'assert';
// import * as xmlrpc from 'xmlrpc';

@Injectable()
export class AuthenticationService {

    private odoo: Odoo;

    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) { }

    async createUser(data, partnerID) {
        if (!this.databaseService) {
            return "Error"
        }
        return new Promise((resolve, reject) => {

            this.databaseService.getConnection().execute_kw('res.users', 'create', [[{ name: data.name, login: data.email, password: data.password, partner_id: partnerID, }]], function (err, value) {
                if (err) {
                    console.log("Error: create user", err)
                    reject(err);
                }
                resolve(value);
            });
        })
    }

    async createPartnerId(data: signUpDTO) {
        if (!this.databaseService) {
            return "Error"
        }
        let domain = [{ name: data.name, email: data.email, customer_rank: 1 }]
        return new Promise((resolve, reject) => {

            this.databaseService.getConnection().execute_kw('res.partner', 'create', [domain], function (err, value) {
                if (err) {
                    console.log("Error: create partner id", err);
                    reject(err);
                }
                resolve(value);
            });
        })
    }

    async register(data: signUpDTO) {

        try {
            let PartnerID = await this.createPartnerId(data);
            let UserID = await this.createUser(data, PartnerID);

            const msg = {
                "message": "User Register Successfully!",
                "ID": `your user ID is ${UserID}`
            }
            return msg;

        } catch (error) {
            console.log("Error: register User", error);

            const msg = {
                "Massage": "You can not have two users with the same login!",
            }
            return msg;
        }
    }

    authenticateUser(data) {

        if (!this.databaseService) {
            return "Error"
        }

        let params = [process.env.ODOO_DB, data.email, data.password, {}]
        return new Promise((resolve, reject) => {
            this.databaseService.getConnection().execute_kw('res.users', 'authenticate', [params], function (err, value) {
                if (err) {
                    console.log("Error: authenticate user", err)
                    reject(err)
                }
                resolve(value);
            });
        })
    }

    // authenticateUser(data) {

    //     if (!this.databaseService) {
    //         return "Error"
    //     }
    //     return new Promise((resolve, reject) => {
    //         const common = xmlrpc.createClient({
    //             url: `${process.env.ODOO_URL}/xmlrpc/2/common`,
    //         });
    //         common.methodCall('authenticate', [process.env.ODOO_DB, data.email, data.password, {}], (err, value) => {

    //             if (err) {
    //                 console.log("Error: authenticate user", err)
    //                 reject(err)
    //             }
    //             console.log("User ID: ", value);
    //             if (value !== false) {
    //                 resolve(value);
    //             }
    //             else {
    //                 reject("Email or Password is invalid");
    //             }
    //         });
    //     })
    // }

    serarchPartnerId(data) {
        if (!this.databaseService) {
            return "Error"
        }
        return new Promise((resolve, reject) => {
            this.databaseService.getConnection().execute_kw('res.partner', 'search', [[[["email", "=", data.email]]]], function (err, value) {
                if (err) {
                    console.log("Error: search partner Id", err);
                    reject(err);

                }
                resolve(value);

            });
        })
    }

    async signIn(data) {
        try {
            let userid = await this.authenticateUser(data);
            let partnerId = await this.serarchPartnerId(data);

            const payload = {
                customer_user_id: userid,
                partner_user_id: partnerId,
            }

            const accessToken = this.jwtService.sign(payload);
            const msg = {
                "Massage": "Login Successfully",
                token: accessToken,
            }
            return msg;

        } catch (error) {
            console.log("Error: signIn User", error);
            const msg = {
                "Massage": "Email or Password is invalid",
            }
            return msg;
        }
    }
}

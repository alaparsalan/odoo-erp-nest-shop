# Odoo eCommerce and JWT Authentication Integration in NestJS with Odoo ERP 17.0

## Overview

This application integrates Odoo’s eCommerce functionalities with NestJS through external APIs, utilizing Odoo ERP 17.0. The integration allows seamless management of key business operations, including product listings, order processing, and cart management, by tapping into Odoo’s robust eCommerce capabilities.

To secure sensitive operations, the application incorporates JWT (JSON Web Token) authentication. This ensures that only authorized users can access protected routes, such as adding products to the cart, viewing orders, and updating cart items, providing a secure environment for eCommerce transactions.

By leveraging Odoo's external APIs for eCommerce features, users benefit from the full capabilities of Odoo ERP, while the system remains protected with token-based authentication to ensure both security and efficiency in the online store management.

- **Odoo Instance**: [https://arsalanweb.odoo.com/](https://arsalanweb.odoo.com/)
- **Odoo Documentation**: [https://www.odoo.com/documentation/17.0/](https://www.odoo.com/documentation/17.0/)
- **Repository Clone Link**: [https://github.com/alaparsalan/odoo-erp-nest-shop](https://github.com/alaparsalan/odoo-erp-nest-shop)

## Features

- **JWT Authentication**: Secure routes with token-based authentication.
- **XML-RPC Integration**: Seamless communication between the NestJS application and Odoo ERP 17.0 for eCommerce management.
- **Basic eCommerce Features**:
  - Add products to the cart
  - View cart products
  - Update cart products
  - Remove products from the cart
  - View all products
  - View customer orders
- **Security Enhancements**: Strengthening application security through secure authentication practices.

## Technology Stack

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Odoo ERP 17.0**: Open-source business application suite for managing various business operations like sales, inventory, accounting, and more.
- **JWT (JSON Web Tokens)**: For securing API routes.
- **XML-RPC**: For integrating Odoo ERP with the NestJS application.

## Setup and Installation

Follow these steps to set up the application locally:

### Prerequisites

- Node.js (v16 or later)
- NPM (or Yarn)
- Odoo ERP 17.0 instance
- Odoo XML-RPC library

### 1. Clone the repository

``` bash
git clone https://github.com/alaparsalan/odoo-erp-nest-shop.git
cd odoo-erp-nest-shop
```

### 2. Install dependencies

Run the following command to install the necessary dependencies for the project:

``` bash
npm install

```
### 3. Configure environment variables

Create a `.env` file in the root directory of the project and add the necessary environment variables:

``` .env
ODOO_URL=https://arsalanweb.odoo.com
ODOO_DB=<your_odoo_db_name>
ODOO_USERNAME=<your_odoo_username>
ODOO_PASSWORD=<your_odoo_password>
JWT_SECRET=<your_jwt_secret_key>

```

Make sure to replace the placeholders with your actual Odoo instance details and JWT secret key.

### 4. Run the application

Start the NestJS application locally:

``` bash
npm run start:dev

```
This will start the server on `http://localhost:3000`.

### 5. Access the application

- Navigate to `http://localhost:3000` to access the eCommerce functionality.
- Use Postman or any API testing tool to test the JWT-secured routes.

---

## API Endpoints

### 1. **Sign Up**

- **POST** `http://localhost:3000/auth/register`

**Request Body**:

``` json
{
  "name": "<your_name>",
  "password": "<your_password>",
  "new_password": "<new_password>",
  "email": "<your_email>"
}

```
### 2. **Login**

- **POST** `http://localhost:3000/auth/signin`

**Request Body**:

``` json
{
  "email": "<your_email>",
  "password": "<your_password>"
}
```

### 3. **View All Carts**

- **GET** `http://localhost:3000/cart/products`

### 4. **View Cart by Partner ID**

- **GET** `http://localhost:3000/cart/:partnerId`

### 5. **Add to Cart**

- **POST** `http://localhost:3000/cart/addtocart`

**Request Body**:

``` json
{
  "partnerId": <partner_id>,
  "productId": <product_id>,
  "quantity": <quantity>
}

```
### 6. **Update Cart**

- **PUT** `http://localhost:3000/cart/updatecart`

**Request Body**:

``` json
{
  "partnerId": <partner_id>,
  "cartId": <cart_id>,
  "qty": <quantity>
}

```
### 7. **Delete Cart Item**

- **DELETE** `http://localhost:3000/cart/removeitem`

**Request Body**:

``` json
{
  "cartId": <cart_id>
}

```
### 8. **View All Orders**

- **GET** `http://localhost:3000/orders/fetch`

### 9. **Fetch All Products**

- **GET** `http://localhost:3000/products/fetch?limit=1&offset=0`

**Query Parameters**:
- `limit`: Number of products to fetch.
- `offset`: Starting point for pagination.

---

## Securing Routes with JWT

Ensure that any route requiring authentication has the JWT token in the `Authorization` header. The format should be:

#bash
Authorization: Bearer <jwt_token>


## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Odoo ERP 17.0 Documentation](https://www.odoo.com/documentation/17.0/)

## Contributing

We welcome contributions to this project! If you'd like to contribute, feel free to fork the repository, submit pull requests, or open issues.

### Steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

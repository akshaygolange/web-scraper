# Web Scraper Backend

## Overview

A Node.js backend that scrapes book data from World of Books using Playwright, stores the data in MongoDB, and exposes REST APIs to retrieve and refresh product information.

## Features

* Scrape book categories
* Scrape products from category pages
* Scrape product details (title, author, price)
* Store data in MongoDB Atlas
* REST API endpoints for products
* Scrape product details on demand

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Playwright
* Morgan
* CORS

## Project Structure

```text
backend
├── config
├── models
├── routes
├── scrapers
├── services
├── app.js
├── server.js
└── test.js
```

## Installation

```bash
git clone https://github.com/akshaygolange/web-scraper/
cd web-scrapper/backend
npm install
```

## Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Run Server

```bash
npm run dev
```

## Run Scrapers

```bash
npm run test
```

## API Endpoints

### Get All Products

```http
GET /api/products
```

### Get Product By Slug

```http
GET /api/products/:slug
```

### Scrape Product Details

```http
POST /api/products/:slug/scrape
```

## Example Response

```json
{
  "title": "The Daisy Chain Flower Shop",
  "author": "Laurie Gilmore",
  "price": 4.24,
  "slug": "daisy-chain-flower-shop-book-laurie-gilmore-9780008761479"
}
```

## Future Improvements

* Scrape descriptions
* Scrape ISBN information
* Scrape availability and condition
* Bulk product refresh endpoint
* Pagination and filtering APIs

## Author

Akshay Golange

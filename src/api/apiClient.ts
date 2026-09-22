import {APIRequestContext} from '@playwright/test';
export class ApiClient {
    constructor(private request: APIRequestContext) {}
    async getProducts() {
        return await this.request.get('https://fakestoreapi.com/products');
    }
}
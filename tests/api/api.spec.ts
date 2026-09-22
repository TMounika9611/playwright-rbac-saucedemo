import {test, expect} from '@playwright/test';
import {ApiClient} from '../../src/api/apiClient';
test('api test', async ({request}) => {
    const api=new ApiClient(request);
    const res=await api.getProducts();
    expect(res.status()).toBe(200);
});
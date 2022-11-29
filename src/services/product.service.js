import httpClient from "../infrastructure/http/httpClient";

export function fetchProducts() {
    return httpClient.get('/product');
};
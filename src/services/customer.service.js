import httpClient from "../infrastructure/http/httpClient";

export function fetchCustomer() {
    return httpClient.get('/customer');
};
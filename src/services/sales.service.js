import httpClient from "../infrastructure/http/httpClient";

export function fetchSales() {
    return httpClient.get('/sale');
};
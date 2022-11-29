import httpClient from "../infrastructure/http/httpClient";

export function fetchSeller() {
    return httpClient.get('/seller');
};
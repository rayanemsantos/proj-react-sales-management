import httpClient from "../infrastructure/http/httpClient";

export function fetchSales() {
    return httpClient.get('/sale');
};

export function deleteSale(id) {
    return httpClient.del(`/sale/${id}/` );
};
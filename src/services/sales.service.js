import httpClient from "../infrastructure/http/httpClient";

export function fetchSales() {
    return httpClient.get('/sale/');
};

export function fetchSalesCommissions(date_init, date_end) {
    return httpClient.get(`/sale_commissions/?date_init=${date_init}&date_end=${date_end}`);
};

export function fetchSale(id) {
    return httpClient.get('/sale/' + id);
};

export function deleteSale(id) {
    return httpClient.del(`/sale/${id}/` );
};

export function fetchNewSale(data) {
    return httpClient.post('/sale/', data);
};

export function fetchSaveSale(id, data) {
    return httpClient.put('/sale/' + id + '/', data);
};
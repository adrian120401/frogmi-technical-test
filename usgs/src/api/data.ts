const API_URL = 'http://127.0.0.1:3000/api/';

export const getFeatures = async (page: number, per_page: number, mag_types: Array<string>) => {
    let filters = `page=${page}&per_page=${per_page}`;
    if(mag_types.length > 0) {
        filters += `&mag_type=${mag_types.join(',')}`;
    }
    const response = await fetch(`${API_URL}features?${filters}`).then(res => res.json());
    return response;
}
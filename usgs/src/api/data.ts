const API_URL = 'http://127.0.0.1:3000/api/';

export const getFeatures = async (page: number, per_page: number, mag_types: Array<string>) => {
    let filters = `page=${page}&per_page=${per_page}`;
    if(mag_types.length > 0) {
        filters += `&mag_type=${mag_types.join(',')}`;
    }
    const response = await fetch(`${API_URL}features?${filters}`).then(res => res.json());
    return response;
}

export const getComments = async (feature_id: string) => {
    const response = await fetch(`${API_URL}features/${feature_id}/comments`).then(res => res.json());
    return response
}

export const postComment = async (feature_id: string, comment: string) => {
    const response = await fetch(`${API_URL}features/${feature_id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"body": comment})
    }).then(res => res.json());

    return response;
}
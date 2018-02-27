const baseUrl = 'http://localhost:3001';

export const getCategories = () => {
    return fetch(`${baseUrl}/categories`,
    	{
        	headers: { 'Authorization': 'whatever-you-want' }
    	})
        .then(res => res.json())
};

export const getPosts = () => {
	return fetch(`${baseUrl}/posts`,
        {
            headers: { 'Authorization': 'whatever-you-want' }
        })
		.then(res => res.json())
};

export const postVote = (id, option) => {
	return fetch(`${baseUrl}/posts/${id}`,{
        method: 'POST',
        headers: {
            'Authorization': 'whatever-you-want',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
		body: JSON.stringify({option: option})
	})
		.then(res => res.json())
};

export const getPostDetails = (id) => {
	return fetch(`${baseUrl}/posts/${id}`,{
		method: 'GET',
		headers: {
            'Authorization': 'whatever-you-want'
		}
	}).then(res => res.json())
};

export const editPost = (id, body) => {
    return fetch(`${baseUrl}/posts/${id}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'whatever-you-want',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
		.then(res => res.json())
};

export const addANewPost = (body) => {
    return fetch(`${baseUrl}/posts/`,{
        method: 'POST',
        headers: {
            'Authorization': 'whatever-you-want',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
};

export const deleteThisPost = (id) => {
	return fetch(`${baseUrl}/posts/${id}`, {
		method: 'DELETE',
        headers: {
            'Authorization': 'whatever-you-want'
        }
	})
		.then(res => res.json())
};

export const comments = (id) => {
    return fetch(`${baseUrl}/posts/${id}/comments`,{
        method: 'GET',
        headers: {
            'Authorization': 'whatever-you-want'
        }
    })
        .then(res => res.json())
};

export const voteComment = (id, option) => {
    return fetch(`${baseUrl}/comments/${id}`,{
        method: 'POST',
        headers: {
            'Authorization': 'whatever-you-want',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({option: option})
    })
        .then(res => res.json())
};

export const deleteComment = (id) => {
    return fetch(`${baseUrl}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'whatever-you-want'
        }
    })
        .then(res => res.json())
};

export const editComment = (id, body) => {
    return fetch(`${baseUrl}/comments/${id}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'whatever-you-want',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
		.then(res => res.json())
};

export const addComment = (body) => {
    return fetch(`${baseUrl}/comments/`,{
        method: 'POST',
        headers: {
            'Authorization': 'whatever-you-want',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
};

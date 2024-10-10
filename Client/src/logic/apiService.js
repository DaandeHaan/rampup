class apiService {
    constructor() {
        if (process.env.NODE_ENV === "development")
            this.default_url = "http://localhost:3001/api";
        else 
            this.default_url = "production_url";
    }

    async get(url) {
        const response = await fetch(this.default_url + url, {
            method: "GET",
            credentials: "include",
        });
        this.checkAuthStatus(response.status);
        return response.json();
    }

    async post(url, body = {}) {
        const response = await fetch(this.default_url + url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        this.checkAuthStatus(response.status);
        return response.json();
    }

    async put(url, body = {}) {
        const response = await fetch(this.default_url + url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        this.checkAuthStatus(response.status);
        return response.json();
    }

    async delete(url, body = {}) {
        const response = await fetch(this.default_url + url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        this.checkAuthStatus(response.status);
        return response.json();
    }
    
    checkAuthStatus(status) { 
        // This check is for when user isn't authenticated, so will send them back to login
        if (status === 401)
            window.location.href = '/auth/login';
    }
}

export default new apiService();

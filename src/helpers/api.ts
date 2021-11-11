const API_SERVER = process.env.REACT_APP_API_SERVER;

export async function get(url: string) {
    let res: Response;
    let json: any;

    try {
        res = await fetch(`${API_SERVER}` + url);
    } catch (error) {
        console.error(`Fail to GET: `, url, error);
        throw error;
    }

    try {
        json = await res.json();
    } catch (error) {
        console.error("Fail to GET: ", url, error);
        throw error;
    }
    return json;
}

export async function post(url: string, body: any, contentType?: string) {
    let res: Response;
    try {
        let headers: Headers = new Headers();
        if (contentType) {
            headers.append("Content-Type", contentType);
        }

        res = await fetch(`${API_SERVER}` + url, {
            method: "POST",
            headers,
            body:
                contentType === "application/json"
                    ? JSON.stringify(body)
                    : body,
        });
    } catch (error) {
        console.error("Fail to POST: ", url, error);
        return;
    }
    let json;
    try {
        json = await res.json();
    } catch (error) {
        console.error("Fail to POST: ", url, error);
    }
    return json;
}

export async function put(url: string, body?: any, contentType?: string) {
    let res: Response;
    try {
        let headers: Headers = new Headers();
        if (contentType) {
            headers.append("Content-Type", contentType);
        }

        res = await fetch(`${API_SERVER}` + url, {
            method: "PUT",
            headers,
            body:
                contentType === "application/json"
                    ? JSON.stringify(body)
                    : body,
        });
    } catch (error) {
        console.error("Fail to POST: ", url, error);
        return;
    }
    let json;
    try {
        json = await res.json();
    } catch (error) {
        console.error("Fail to POST: ", url, error);
    }
    return json;
}

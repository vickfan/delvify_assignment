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

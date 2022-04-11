export class HttpClient {
    #url;
    #clientFactory;

    constructor(url) {
        this.#url = url;
        this.#clientFactory = () => new XMLHttpRequest();
    }

    // https://stackoverflow.com/questions/9181090/is-onload-equal-to-readystate-4-in-xmlhttprequest
    get() {
        return new Promise((resolve, reject) => {
            let xhr = this.#clientFactory();
            xhr.open("GET", this.#url);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }

    post(data) {
        return new Promise((resolve, reject) => {
            let xhr = this.#clientFactory();
            xhr.open("POST", this.#url);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(JSON.stringify(data));
        });
    }
}

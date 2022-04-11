import {HttpClient} from "./httpClient.js";

export class RankingClient {
    #httpClient;

    constructor() {
        this.#httpClient = new HttpClient(`${window.location}ranking`);
    }

    get() {
        return this.#httpClient.get();
    }

    send(name, total) {
        return this.#httpClient.post({Name: name.toUpperCase(), Total: total});
    }
}
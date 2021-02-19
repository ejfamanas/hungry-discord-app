import {IBaseHttpService} from "./i-base-http-service";
import {default as http, AxiosResponse} from "axios";
import {IAuth} from "./i-auth";

export abstract class BaseHttpService<T> implements IBaseHttpService<T> {
    private readonly _url: string;
    private readonly _config: { auth?: IAuth }

    protected constructor(url: string, config = {}) {
        this._url = url;
        this._config = config;
    }

    public delete(id: number): Promise<T> {
        return http.delete(`${this._url}/${id}`, this._config)
            .then(({data}: AxiosResponse<T>) => data);
    }

    public get(id: number): Promise<T> {
        return http.get(`${this._url}/${id}`, this._config)
            .then(({data}: AxiosResponse<T>) => data);
    }

    public patch(id: number, data: Partial<T>): Promise<T> {
        return http.patch(`${this._url}/${id}`, data, this._config)
            .then(({data}: AxiosResponse<T>) => data);
    }

    public post(data: T): Promise<T> {
        return http.post(`${this._url}/`, data, this._config)
            .then(({data}: AxiosResponse<T>) => data);
    }

    public put(id: number, data: Partial<T>): Promise<T> {
        return http.put(`${this._url}/${id}`, data, this._config)
            .then(({data}: AxiosResponse<T>) => data);
    }

}

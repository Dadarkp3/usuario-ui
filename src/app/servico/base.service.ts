import {Observable} from 'rxjs';
import {ResponseErro} from '../model/responseErro.model';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BloqueioService} from './bloqueio.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

export abstract class BaseService<T> {

    constructor(protected http: HttpClient,
                protected bloqueioService: BloqueioService,
                protected router: Router) {
    }

    protected get<K>(
        endpoint: string,
        redirect: boolean = true,
        criteria: HttpParams = new HttpParams(),
        options?: { endpointExterno?: boolean, bloqueio?: boolean, headers?: HttpHeaders }): Observable<K> {

        options = Object.assign({endpointExterno: false, bloqueio: true}, options);

        if (options.bloqueio) {
            this.bloqueioService.bloquear();
        }

        const headers = options.headers ? options.headers : new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        const httpOptions = {
            headers: headers,
            params: criteria
        };

        endpoint = endpoint.replace(' ', '');

        this.cleanLastErrorMessage();
        return this.http.get(!options.endpointExterno ? environment.api + endpoint : endpoint, httpOptions)
            .catch((error: HttpResponse<T>) => {
                return this.handleError(error, redirect);
            }).finally(() => {
                this.bloqueioService.desbloquear();
            });

    }

    protected post<K>(endpoint: string, criteria?: any, redirect: boolean = true, $options?: any): Observable<K> {
        this.bloqueioService.bloquear();
        const options = Object.assign({
            headers: new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
        }, $options);

        console.log(options);

        this.cleanLastErrorMessage();
        endpoint = endpoint.replace(' ', '');

        return this.http.post(environment.api + endpoint, criteria ? criteria : null, options)
            .catch((error: HttpResponse<T>) => {
                return this.handleError(error, redirect);
            }).finally(() => {
                this.bloqueioService.desbloquear();
            });

    }

    protected put<K>(endpoint: string, criteria?: any, redirect: boolean = true, $options?: any): Observable<K> {

        this.bloqueioService.bloquear();

        const options = Object.assign({
            headers: new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
        }, $options);

        this.cleanLastErrorMessage();
        endpoint = endpoint.replace(' ', '');

        return this.http.put(environment.api + endpoint, criteria ? criteria : null, options)
            .catch((error: HttpResponse<T>) => {
                return this.handleError(error, redirect);
            }).finally(() => {
                this.bloqueioService.desbloquear();
            });
    }

    protected delete<K>(endpoint: string, redirect: boolean = true, criteria: HttpParams = new HttpParams()): Observable<K> {

        this.bloqueioService.bloquear();

        const options = {
            headers: new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/x-www-form-urlencoded'),
            params: criteria
        };

        this.cleanLastErrorMessage();
        endpoint = endpoint.replace(' ', '');

        return this.http.delete(environment.api + endpoint, options)
            .catch((error: HttpResponse<T>) => {
                return this.handleError(error, redirect);
            }).finally(() => {
                this.bloqueioService.desbloquear();
            });
    }

    private saveLastErrorMessage(msg: string) {
        localStorage.setItem('lasterror', msg);
    }

    private cleanLastErrorMessage() {
        localStorage.removeItem('lasterror');
    }

    private handleError(response: any, redirect: boolean) {

        const status = response.status;

        const message = response.error.message;

        if (!environment.production) {
            console.log(response.error.debugMessage);
        }

        this.saveLastErrorMessage(JSON.stringify(response));

        if (response instanceof HttpErrorResponse && [401, 403, 404, 412, 500, 502, 504].indexOf(status) >= 0 && redirect) {
            return this.router.navigate(['error', status]).then(() => {
                return Observable.of(null);
            });
        }

        return Observable.throw(new ResponseErro(status, message));

    }

}

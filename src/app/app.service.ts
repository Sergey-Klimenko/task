import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

const routes = {
  search: () => 'search/repositories'
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public http: HttpClient
  ) {
  }

  public getSearch(params: string) {
    console.log('environment.server_api', environment.server_api);
    console.log('routes.search', routes.search);
    return this.http.get(environment.server_api + routes.search() + params);
  }
}

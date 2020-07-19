import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {AppService} from './app.service';
import {SearchResults} from './app.model';
import {QueryParameters} from './app.constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription;
  searchResults: SearchResults;
  searchStringSubject = new Subject<string>();

  constructor(
    private service: AppService
  ) {
  }

  ngAfterViewInit() {
    this.subscription = this.searchStringSubject
      .pipe(
        map(searchRequest => QueryParameters.SEARCH + searchRequest),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchRequest => this.service.getSearch(searchRequest))
      )
      .subscribe((result: SearchResults) => this.searchResults = result,
        error => console.log(error));
  }

  search(searchString: string) {
    if (searchString.length > 3) {
      this.searchStringSubject.next(searchString);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

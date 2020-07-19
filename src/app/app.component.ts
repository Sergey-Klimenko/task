import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppService} from './app.service';
import {SearchResults} from './app.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription;
  searchResults: SearchResults;
  timeout: number;

  constructor(
    private service: AppService
  ) {
  }

  ngAfterViewInit() {
    const input = document.getElementById('searchInput');
    const stream$ = fromEvent(input, 'keyup');
    this.subscription = stream$.pipe(
      // @ts-ignore
      map((event: KeyboardEvent) => event.target.value)
    ).subscribe(searchString => {
        if (searchString.length > 3) {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.debounce(500, this.startSearch(searchString));
        }
      }
    );
  }

  debounce(delay, callback) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(callback, delay);
  }

  startSearch(searchString) {
    return () => {
      let searchRequest = '?q=';
      searchRequest += searchString;
      this.service.getSearch(searchRequest).subscribe((result: SearchResults) => {
        this.searchResults = result;
      });
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

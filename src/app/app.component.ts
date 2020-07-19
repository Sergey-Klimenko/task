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
  sub: Subscription;
  searchResults: SearchResults;
  timeout: number;

  constructor(
    private service: AppService
  ) {
  }

  func(val) {
    return () => {
      console.log(val);
      let request = '?q=';
      request += val;
      console.log(request);
      this.service.getSearch(request).subscribe(v => {
        console.log(v);
        // @ts-ignore
        this.searchResults = v;
      });
    };
  }


  ngAfterViewInit() {
    const input = document.getElementById('searchInput');
    const stream$ = fromEvent(input, 'keyup');
    this.sub = stream$.pipe(
      // @ts-ignore
      map(item => item.target.value)
    ).subscribe(val => {
        if (val.length > 3) {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.debounce(500, this.func(val));
        }
      }
    );
  }

  stop() {
    this.sub.unsubscribe();
  }

  debounce(ms, cb) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(cb, ms);
  }

  ngOnDestroy(): void {
    this.stop();
  }
}

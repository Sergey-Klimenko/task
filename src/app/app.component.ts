import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, Subject, Subscription} from 'rxjs';
import {Element} from '@angular/compiler';
import {map} from 'rxjs/operators';
import {AppService} from './app.service';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // subject: Subject<number> = new Subject<number>();
  sub: Subscription;
  // @ViewChild('searchInput', {static: false}) searchInput: ElementRef<HTMLInputElement>;
  timeout: any;

  constructor(
    private service: AppService
  ) {
    // this.subject = new Subject();
    // this.sub = this.subject.subscribe(value => {
    //   console.log('subscribe', value);
    // });
  }

  func(val) {
    return () => {

      console.log(val);
      let request = '?q=';
      request += val;
      console.log(request);
      this.service.getSearch(request).subscribe(v => console.log(v));
    };
  }


  ngAfterViewInit() {
    // const stream$ = fromEvent(this.searchInput.nativeElement, 'onkeyup');
    const input = document.getElementById('searchInput');
    const stream$ = fromEvent(input, 'keyup');
    this.sub = stream$.pipe(
      // @ts-ignore
      map(item => item.target.value)
    ).subscribe((val => {
        if (val.length > 3) {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.debounce(3000, this.func(val));
        }
      }
    ));
  }

  stop() {
    this.sub.unsubscribe();
  }

  debounce(ms, cb) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(cb, 2000);
  }

  ngOnDestroy(): void {
    this.stop();
    //  лучше сделать как он говорил через интерфейс, и лучше прикрутить их библиотечку
  }
}

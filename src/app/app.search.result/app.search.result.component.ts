import {Component, Input} from '@angular/core';
import {SearchResults} from '../app.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './app.search.result.component.html',
  styleUrls: ['./app.search.result.component.scss']
})
export class AppSearchResultComponent {
  @Input() searchResults: SearchResults;

  openRepoInNewTab(url: string) {
    const newWindow = window.open(url, '_blank');
    newWindow.focus();
  }
}

export class SearchResults {
  // tslint:disable-next-line:variable-name
  public total_count: number;
  public items: ResultItem[];
}

export class ResultItem {
  // tslint:disable-next-line:variable-name
  public html_url: string;
  public owner: OwnerInfo;
  // tslint:disable-next-line:variable-name
  public full_name: string;
  public description: string;
  // tslint:disable-next-line:variable-name
  public watchers_count: number;
  // tslint:disable-next-line:variable-name
  public stargazers_count: number;
  // tslint:disable-next-line:variable-name
  public forks_count: number;
}

export class OwnerInfo {
  // tslint:disable-next-line:variable-name
  public avatar_url: string;
}

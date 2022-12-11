import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  ngOnInit(): void {}

  onSearch(value: string): void {
    if (value) this.router.navigateByUrl(`/search/${value}`);
  }
}

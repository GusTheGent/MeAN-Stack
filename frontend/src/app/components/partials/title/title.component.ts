import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() title!: string;
  @Input() margin?: string = '1rem 0 1rem 0.2rem';
  @Input() fontSize?: string = '1.7 rem';

  constructor() {}

  ngOnInit(): void {}
}

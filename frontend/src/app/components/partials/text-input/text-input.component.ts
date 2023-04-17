import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() showError: boolean = true;
  @Input() type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}
}

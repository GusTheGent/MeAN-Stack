import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'It should not be empty',
  email: 'It should be a valid email',
};

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showError: boolean = true;
  errorMessages: string[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation(): void {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATOR_MESSAGES[key]);
  }
}

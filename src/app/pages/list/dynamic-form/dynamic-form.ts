import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from './models/field-config.interface';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';

@Component({
    selector: 'page-dynamic-form',
    templateUrl: 'dynamic-form.html',
})
export class DynamicFormPage implements AfterViewInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

    config: FieldConfig[] = [
        {
            type: 'input',
            label: 'Full name',
            name: 'name',
            placeholder: 'Enter your name',
            validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'select',
            label: 'Favourite Food',
            name: 'food',
            options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
            placeholder: 'Select an option',
            validation: [Validators.required]
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'button'
        }
    ];

    ngAfterViewInit() {
        setTimeout(() => {
            let previousValid = this.form.valid;
            this.form.changes.subscribe(() => {
                if (this.form.valid !== previousValid) {
                    previousValid = this.form.valid;
                    this.form.setDisabled('submit', !previousValid);
                }
            });

            this.form.setDisabled('submit', true);
            this.form.setValue('name', 'Todd Motto');
        });
    }

    submit(value: { [name: string]: any }) {
        console.log(value);
    }

}

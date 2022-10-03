/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'ng-app',
    template: `
                <h2>Enter your first and last name</h2>
                <div>
                <form [formGroup]="userForm">
                <label>First Name:</label>
                <input (blur) = 'onBlur()' formControlName="firstName" type="text" name="firstName"/>
                 <label>First Name:</label>
                <input  (blur) = 'onBlur()'formControlName="lastName"  type="text" name="lastName"/>
                <label>User Name: {{userName}}</label>
                </form>
                </div>
                `,
    styles: []
})
export class UserNameComponent implements OnInit {

    userForm: FormGroup;
    userName: string;
    constructor(private fb: FormBuilder) {

    }
    ngOnInit() {
        this.userForm = this.fb.group(
            {
                firstName: ["", [Validators.required]],
                lastName: ["", [Validators.required,]]
            },

        );
    }
    onBlur() {
        if (!this.userForm.valid) return
        let firstName = this.userForm.value['firstName'].trim().toLowerCase();
        let lastName = this.userForm.value['lastName'].trim().toLowerCase();

        this.userName = `${firstName}_${lastName}_${Math.floor(Math.random() * 9 + 1)}`

    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: UserNameComponent
            }
        ])
    ],
    declarations: [UserNameComponent]
})
export class UserNameModule { };
/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-app',
    template: `<form >
                    <h2>Login</h2>
                    <br/>
                    <input #email type="email" value="" name="email"  />
                    <br/>
                    <input #password type="text" value="" name="password" />
                    <button type="submit" (click)= handleLoginSubmit($event) >Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {



    @ViewChild("email") email: ElementRef;
    @ViewChild("password") password: ElementRef;
    logged_in = false;
    errorMessage = "";
    // constructor() { }
    handleLoginSubmit(event: HTMLFormElement) {
        event.preventDefault();
        const email = this.email.nativeElement.value.trim();
        const password = this.password.nativeElement.value.trim();

        if (!this.validateInput(email, "email")
            || !this.validateInput(password, "")
            || password.length < 8) {

            alert(this.errorMessage)
            return
        }

        this.logged_in = true
    }
    validateInput(input: string, type: string) {
        this.errorMessage = ""

        if (type === "email") {
            const email = input;
            const emailInput = email.split("@");
            if (emailInput.length !== 2 || emailInput[1].split(".").length !== 2 || !email.length) {
                this.errorMessage = "Inavalid Email address!"
                return false
            };

            return true

        } else {
            const password = input;
            const specialCharFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            const upperCaseCharFormat = /(?=.*?[A-Z]).*/;
            const lowerCaseCharFormat = /(?=.*?[a-z]).*/;
            const numberFormat = /(?=.*?[0-9]).*/;
            if (!specialCharFormat.test(password) || !upperCaseCharFormat.test(password)
                || !lowerCaseCharFormat.test(password) || !numberFormat.test(password)
                || password.length < 8) {
                this.errorMessage = "Inavalid password!"
                return false;
            }

            return true

        }

    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test03Component
            }
        ])
    ],
    declarations: [Test03Component]
})
export class Test03Module { };
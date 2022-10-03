/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector: 'ng-app',
    template: `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment: </b> <span *ngIf="monthly_payment !== 'N/A'">&#36;</span>{{formatWithCommas(monthly_payment)}} <br/>
                    <b>Late Payment Fee : </b><span *ngIf="late_payment !== 'N/A'">&#36;</span>{{formatWithCommas(late_payment)}} <br/>
                </div>`
})
export class Test01Component implements OnInit {

    loan_amount: number = 1000;
    monthly_payment: number | string = 200;
    late_payment: number | string = 10;
    ngOnInit() {
        this.onChangeLoan_amaount();
    }
    onChangeLoan_amaount() {
        if (!this.loan_amount) {
            this.monthly_payment = "N/A";
            this.late_payment = "N/A"
        } else {
            this.monthly_payment = this.loan_amount * 0.02;
            this.late_payment = this.monthly_payment * 0.05;
        }
    }
    formatWithCommas(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "",
                component: Test01Component
            }
        ])
    ],
    declarations: [Test01Component]
})
export class Test01Module { }
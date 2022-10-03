/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'textfield',
    template: '<input type="text" name="field"   [(ngModel)]="field"  (ngModelChange)="fieldChanged($event)"/> '
})
export class TextField {
    field = "";
    @Output() titleInput: EventEmitter<string> = new EventEmitter<string>();
    fieldChanged(event: string) {
        this.field = event;
        this.titleInput.emit(event)
    }
}

@Component({
    selector: 'child-component',
    template: `<h2>Title: {{title}}<h2><br/><textfield (titleInput)="getReceivedTitle($event)"></textfield>`
})
export class ChildComponent {
    title = "";
    @Output() receivedTitle: EventEmitter<string> = new EventEmitter<string>();
    getReceivedTitle(title: string) {
        this.title = title
        this.receivedTitle.emit(this.title)
    }

}


@Component({
    selector: 'ng-app',
    template: `<div>
                    <child-component (receivedTitle)="getUpdatedTitle($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title: string = "";
    getUpdatedTitle(updatedData: string) {
        this.title = updatedData
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test02Component
            }
        ])
    ],
    declarations: [Test02Component, ChildComponent, TextField]
})
export class Test02Module { };
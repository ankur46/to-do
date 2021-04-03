import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  recurrenceParentArr = [
    { name: 'Never', value: [] },
    { name: 'Daily', value: ['Forever', 'Times', 'Until'] },
    { name: 'Weekly', value: ['Until', 'Forever', 'Times'] },
  ];
  recurrenceChildArr: any = [];
  weekArr: any = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  allUser = ["Frank Miller", "Susy Downer", "Jack Mill", "Beth Hollicks", "Roger Bicks","Alex","Upwork","Mitchel","Bricks","Ben Hamber"];
  filteredUsers: any[] = [];
  reminderOptionArr = ['Via Text'];
  inputValue: any;
  _complete: boolean = false;
  userPush: any[] = [];
  todoForm: FormGroup = new FormGroup({});
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  constructor(public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.todoForm = this.fb.group({
      title: [''],
      start_date: [''],
      due_date: [''],
      high_priority: [false],
      recurrence: this.fb.group({
        parentOption: [{ name: 'Never', value: [] }],
        childOption: ['Forever'],
        count: [''],
        Sunday: [false],
        Monday: [false],
        Tuesday: [false],
        Wednesday: [false],
        Thursday: [false],
        Friday: [false],
        Saturday: [false],
        weekCount: ['']
      }),
      reminder: this.fb.group({
        check: [false],
        option: ['Via Text'],
        count: ['']
      }),
      location: [''],
      relationship_users: [[]],
      note: ['']
    })
    this._complete = true;
  }

  remove(user: string): void {
    const index = this.userPush.indexOf(user);

    if (index >= 0) {
      this.userPush.splice(index, 1);
    }
    this.todoForm.controls['relationship_users'].setValue(this.userPush);
    this.allUser.push(user);
  }
  filterUser(ev: any): void {
    if (ev.target.value.trim() !== "") {
      const filterValue = ev.target.value.trim().toLowerCase();
      let finalData = [];
      finalData = this.allUser.filter((key: any) => {
        if (key.trim().toLowerCase().search(filterValue) != -1) {
          return key;
        }
      });
      this.filteredUsers = [...finalData];
    }
  }
  removeVal(): void {
    this.userPush.push(this.inputValue);
    this.todoForm.controls['relationship_users'].setValue(this.userPush);

    const index = this.allUser.indexOf(this.inputValue);
    if (index >= 0) {
      this.allUser.splice(index, 1);
    }

    this.inputValue = "";
    this.filteredUsers = [];
  }
  parentSelected(type: any): void {
    this.recurrenceChildArr = [...type.value];
    this.todoForm.controls['recurrence'].patchValue({
      childOption: 'Forever',
      count: '',
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      weekCount: ''
    })
  }
  save() {
    console.log(this.todoForm.value);
  }

}

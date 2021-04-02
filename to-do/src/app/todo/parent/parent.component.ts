import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  createTodo(): void {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '500px',
      height:'100vh',
      data: { name: 'hello' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

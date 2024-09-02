import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  searchText = new FormControl('');

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });

    // React to changes in search input
    this.searchText.valueChanges.subscribe(value => {
      // Filter logic can be applied here
    });
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '300px',
      data: employee || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.employeeService.updateEmployee(result.id, result);
        } else {
          this.employeeService.addEmployee(result);
        }
      }
    });
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id);
  }
}

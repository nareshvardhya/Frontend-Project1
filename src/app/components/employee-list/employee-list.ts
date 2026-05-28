import { Component } from '@angular/core';
import { Employee } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees: any[] = []

  constructor(private employeeService: Employee, private router:Router) {
    //  console.log("constructor working")

  }

  ngOnInit() {

    this.getEmployees()

  }

  getEmployees() {

    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        this.employees=data
        console.log(data)
        // this.router.navigate(['/'])
      },

      error: (err) => {
        console.log(err)

      }

    })

  }


  deleteEmployee(id: number) {

    const isDelete = confirm("Are you sure?")

    if (isDelete) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert("Employee Deleted")
          console.log("employee deleted")
          this.getEmployees()
          // this.router.navigate(['/'])
    //       this.employees =
    // this.employees.filter(emp => emp.id !== id)
        },

        error: (err) => {

          console.log(err)

        }

      })

    }

  }
}

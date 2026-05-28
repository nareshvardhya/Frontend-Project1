import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
// export class EmployeeForm {
//   constructor(private employeeService: Employee, private router: Router) { }

//   employeeForm = new FormGroup({

//     name: new FormControl('', [
//       Validators.required
//     ]),

//     email: new FormControl('', [
//       Validators.required,
//       Validators.email
//     ]),

//     phone: new FormControl('', [
//       Validators.required
//     ]),

//     dob: new FormControl('', [
//       Validators.required
//     ])

//   })
//   onSubmit() {

//     const date = new Date(this.employeeForm.value.dob!)

//     const day = String(date.getDate()).padStart(2, '0') 

//     const month = String(date.getMonth() + 1).padStart(2, '0')

//     const year = date.getFullYear()

//     const formattedDOB = `${day}/${month}/${year}`


//     const payload = {

//       Name: this.employeeForm.value.name,
//       DOB: formattedDOB,
//       Phone: this.employeeForm.value.phone,
//       Email: this.employeeForm.value.email

//     }

//     console.log(payload)

//     this.employeeService
//       .createEmployee(payload)
//       .subscribe({

//         next: (res) => {

//           // console.log("Employee Added")

//           // console.log(res)
//           alert("Employee Added Successfully")

//           this.router.navigate(['/'])

//         },

//         error: (err) => {

//           console.log(err)

//         }

//       })



      

//   }
// }

export class EmployeeForm {

  employeeId: any

  constructor(
    private employeeService: Employee,private router: Router,private route: ActivatedRoute) { }

  employeeForm = new FormGroup({

    name: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required,Validators.email]),

    phone: new FormControl('', [Validators.required]),

    dob: new FormControl('', [Validators.required])

  })

  ngOnInit() {

    this.employeeId =this.route.snapshot.paramMap.get('id')

    if (this.employeeId) {

      this.employeeService.getEmployeeById(this.employeeId).subscribe({next: (data: any) => {
        const emp = data
        this.employeeForm.patchValue({
          name: emp.Name,
          email: emp.Email,
          phone: emp.Phone,
          dob: emp.DOB
        })
      },

          error: (err) => {

            console.log(err)

          }

        })

    }

  }

  onSubmit() {

    const date =
      new Date(this.employeeForm.value.dob!)

    const day =
      String(date.getDate()).padStart(2, '0')

    const month =
      String(date.getMonth() + 1)
        .padStart(2, '0')

    const year = date.getFullYear()

    const formattedDOB =
      `${day}/${month}/${year}`

    const payload = {

      Name: this.employeeForm.value.name,

      DOB: formattedDOB,

      Phone: this.employeeForm.value.phone,

      Email: this.employeeForm.value.email

    }

    console.log(payload)

    // UPDATE EMPLOYEE
    if (this.employeeId) {

      this.employeeService
        .updateEmployee(this.employeeId, payload)
        .subscribe({

          next: (res) => {
           
            alert("Employee Updated Successfully")

            this.router.navigate(['/'])

          },

          error: (err) => {

            console.log(err)

          }

        })

    }

    // ADD EMPLOYEE
    else {

      this.employeeService
        .createEmployee(payload)
        .subscribe({

          next: (res) => {

            alert("Employee Added Successfully")

            this.router.navigate(['/'])

          },

          error: (err) => {

            console.log(err)

          }

        })

    }

  }

}
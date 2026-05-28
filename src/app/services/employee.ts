import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  baseUrl="http://localhost:7027/api"
  constructor(private http:HttpClient){}

getEmployees(){
  return this.http.get(`${this.baseUrl}/employees/getAll/`)
}

  // GET EMPLOYEE BY ID
  getEmployeeById(id:number){
    return this.http.get(`${this.baseUrl}/employee/get/${id}`)
  }

  // CREATE EMPLOYEE
  createEmployee(data:any){
    return this.http.post(`${this.baseUrl}/employee/create`, data)
  }

  // UPDATE EMPLOYEE
  updateEmployee(id:number,data:any){
    return this.http.put(`${this.baseUrl}/employee/update/${id}`,data)
  }

  // DELETE EMPLOYEE
  deleteEmployee(id:number){
    return this.http.delete(`${this.baseUrl}/employee/delete/${id}`,
      {
      responseType:'text'
    }
)
  }
}

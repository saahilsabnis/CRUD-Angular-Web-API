import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
    public toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData = {
      EmployeeID : 0,
      FullName : '',
      Position : '',
      EMPCode : '',
      Mobile : ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.EmployeeID == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form : NgForm){

    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success("Inserted Successfully", "EMP. Registered")
      this.resetForm(form)
      this.service.refreshList();
    })
  }

  updateRecord(form : NgForm){
    this.service.putEmployee(form.value).subscribe(res => {
    this.toastr.warning("Updated Successfully", "EMP. Registered")
    this.resetForm(form)
    this.service.refreshList();
    })
  }
}
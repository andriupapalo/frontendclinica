import { Component, OnInit } from '@angular/core';
import { DoctorDataService } from '../../servicios/doctor-data.service';
import {} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../modelos/doctor';


@Component({
  selector: 'app-form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: ['./form-doctor.component.css']
})
export class FormDoctorComponent implements OnInit {
  model1:any={};
  doctores:Doctor[];
  metodoadd:boolean=true;
  metodoact:boolean=false;
  verdetalle:boolean=false;

  arraydet:any=new Array();
  regdit:any=[];
  paciDetalle:any=[];



  constructor(private doctorDataService:DoctorDataService) { 
    this.doctorDataService.getdoctor()
    .subscribe(doctor=>{
      this.doctores=doctor
    });
  }
  ngOnInit(): void {
  }

  adddoctor(event){
    event.preventDefault();
    this.doctorDataService.adddoctor(this.model1)
    .subscribe(doct=>{
      this.doctores.push(doct)
      this.metodoadd=true;
      this.metodoact=false;
      this.model1={};
    });
  }
  
  borradoctor(id)
  {
    const pacientes=this.doctores;
    this.doctorDataService.erasedoctor(id)
    .subscribe(data=>{
      if (data)
      {
        for(let i=0;i<this.doctores.length;i++)
        {
          if(this.doctores[i].id==id)
          {
            this.doctores.splice(i,1);
          }
        }

      }
      this.metodoadd=true;
      this.metodoact=false;
    });
  }

  editdoctor(i){
    this.model1=this.doctores[i];
    this.metodoadd=false;
    this.metodoact=true;

  }

  updatedoctor()
  {
    this.doctorDataService.edidoctor(this.model1)
    .subscribe(data=>{
        for(let i=0;i<this.doctores.length;i++)
        {
          if(this.doctores[i].id==this.model1.id)
          {
            this.doctores[i]=data;
          }
        }
      });
      this.model1={};
      this.metodoadd=true;
      this.metodoact=false;
  }
  listpacientes(id)
  {
    this.arraydet=new Array();
    this.verdetalle=true;
    this.doctorDataService.getdoctordetalle(id)
    .subscribe(pacidet=>{
      this.paciDetalle=pacidet;
      for (let i=0;i<this.paciDetalle.doctorPacientes.length;i++)
        {
          this.regdit={"nombreCompleto":this.paciDetalle.doctorPacientes[i].paciente.nombreCompleto,
                      "numeroSeguroSocial":this.paciDetalle.doctorPacientes[i].paciente.numeroSeguroSocial,
                      "pacienteid":this.paciDetalle.doctorPacientes[i].paciente.id,
                      "doctorid":id};
            this.arraydet.push(this.regdit);
      }
    });
  }
}

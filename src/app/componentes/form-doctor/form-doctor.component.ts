import { Component, OnInit, ɵConsole } from '@angular/core';
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
  constructor(private doctorDataService:DoctorDataService) { 
    this.doctorDataService.getdoctor()
    .subscribe(doctor=>{
      this.doctores=doctor
      console.log(this.doctores)
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

  editpaciente(i){
    this.model1.numeroCredencial=this.doctores[i].numeroCredencial;
    this.model1.nombreCompleto=this.doctores[i].nombreCompleto;
    this.model1.especialidad=this.doctores[i].especialidad;
    this.model1.telefonoContacto=this.doctores[i].telefonoContacto;
    this.model1.email=this.doctores[i].email;
    this.model1.hospitalDeTrabajo=this.doctores[i].hospitalDeTrabajo;
    this.metodoadd=false;
    this.metodoact=true;
  }

  updatepaciente()
  {
    this.doctorDataService.edidoctor(this.model1)
    .subscribe(data=>{
        for(let i=0;i<this.doctores.length;i++)
        {
          if(this.doctores[i].id==this.model1.id)
          {
            this.doctores[i].numeroCredencial=data.numeroCredencial;
            this.doctores[i].nombreCompleto=data.nombreCompleto;
            this.doctores[i].especialidad=data.especialidad;
            this.doctores[i].telefonoContacto=data.telefonoContacto;
            this.doctores[i].email=data.email;
            this.doctores[i].hospitalDeTrabajo=data.hospitalDeTrabajo;
            this.doctores[i].id=data.id
          }
        }
      });
      this.metodoadd=true;
      this.metodoact=false;
  }
  limpiar()
  {
    this.model1.numeroCredencial="";
    this.model1.nombreCompleto="";
    this.model1.especialidad="";
    this.model1.telefonoContacto="";
    this.model1.email="";
    this.model1.hospitalDeTrabajo="";
  }
}

import { Component, OnInit, ɵConsole } from '@angular/core';
import { PacienteDataService } from '../../servicios/paciente-data.service';
import {} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../modelos/Paciente';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {
  model:any={};
  pacientes:Paciente[];
  metodoadd:boolean=true;
  metodoact:boolean=false;
  constructor(private pacienteDataService:PacienteDataService) { 
    this.pacienteDataService.getpaciente()
    .subscribe(paciente=>{
      this.pacientes=paciente
      console.log(this.pacientes)
    });
  }
  ngOnInit(): void {
  }

  addpaciente(event){
    event.preventDefault();
    this.pacienteDataService.addpaciente(this.model)
    .subscribe(pacient=>{
      this.pacientes.push(pacient)
      console.log("entre por adicionar")
      this.metodoadd=true;
      this.metodoact=false;
    });
  }
  
  borrapaciente(id)
  {
    const pacientes=this.pacientes;
    this.pacienteDataService.erasepaci(id)
    .subscribe(data=>{
      if (data)
      {
        for(let i=0;i<this.pacientes.length;i++)
        {
          if(this.pacientes[i].id==id)
          {
            this.pacientes.splice(i,1);
          }
        }

      }
      this.metodoadd=true;
      this.metodoact=false;
    });
  }

  editpaciente(i){
    this.model.numeroidentificacion=this.pacientes[i].numeroIdentificacion;
    this.model.nombrecompleto=this.pacientes[i].nombreCompleto;
    this.model.numerosegurosocial=this.pacientes[i].numeroSeguroSocial;
    this.model.codigopostal=this.pacientes[i].codigoPostal,
    this.model.telefonocontacto=this.pacientes[i].telefonoContacto,
    this.model.email=this.pacientes[i].email,
    this.model.edad=this.pacientes[i].edad,
    this.model.sexo=this.pacientes[i].sexo,
    this.model.id=this.pacientes[i].id,
    this.metodoadd=false;
    this.metodoact=true;
  }

  updatepaciente()
  {
    console.log("entramos a acutualizar");
    this.pacienteDataService.edipaciente(this.model)
    .subscribe(data=>{
        for(let i=0;i<this.pacientes.length;i++)
        {
          if(this.pacientes[i].id==this.model.id)
          {
            this.pacientes[i].numeroIdentificacion=data.numeroIdentificacion;
            this.pacientes[i].nombreCompleto=data.nombreCompleto;
            this.pacientes[i].numeroSeguroSocial=data.numeroSeguroSocial;
            this.pacientes[i].codigoPostal=data.codigoPostal,
            this.pacientes[i].telefonoContacto=data.telefonoContacto,
            this.pacientes[i].email=data.email,
            this.pacientes[i].edad=data.edad,
            this.pacientes[i].sexo=data.sexo,
            this.pacientes[i].id=data.id
          }
        }
      });
      this.metodoadd=true;
      this.metodoact=false;
  }
  limpiar()
  {
    this.model.numeroidentificacion="";
    this.model.nombrecompleto="";
    this.model.numerosegurosocial="";
    this.model.codigopostal="";
    this.model.telefonocontacto="";
    this.model.email="";
    this.model.edad="";
    this.model.sexo="";
    this.model.id=0;
  }
}

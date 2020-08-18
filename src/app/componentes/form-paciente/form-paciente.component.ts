import { Component, OnInit } from '@angular/core';
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
  pacientes:Paciente[];
  regdit:any=[];
  arraydet:any=new Array();
  paciDetalle:any=[];
  model:Paciente=new Paciente;
  metodoadd:boolean=true;
  metodoact:boolean=false;
  verdetalle:boolean=false;

  constructor(private pacienteDataService:PacienteDataService) { 
    this.pacienteDataService.getpaciente()
    .subscribe(paciente=>{
      this.pacientes=paciente;
    });
  }
  ngOnInit(): void {
  }

  addpaciente(event){
    event.preventDefault();
    this.pacienteDataService.addpaciente(this.model)
    .subscribe(pacient=>{
      this.pacientes.push(pacient)
      this.metodoadd=true;
      this.metodoact=false;
      this.model=new Paciente();
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
    this.model=this.pacientes[i];
    this.metodoadd=false;
    this.metodoact=true;
  }
  updatepaciente()
  {
    this.pacienteDataService.edipaciente(this.model)
    .subscribe(data=>{
        for(let i=0;i<this.pacientes.length;i++)
        {
          if(this.pacientes[i].id==this.model.id)
          {
            this.pacientes[i]=data;
          }
        }
      });
      this.metodoadd=true;
      this.metodoact=false;
      this.model=new Paciente();
  }

  listdoctores(id)
  {
    this.arraydet=new Array();
    this.verdetalle=true;
    this.pacienteDataService.getpacientedetalle(id)
    .subscribe(pacidet=>{
      this.paciDetalle=pacidet;
      for (let i=0;i<this.paciDetalle.doctorPacientes.length;i++)
        {
          this.regdit={"nombredoctor":this.paciDetalle.doctorPacientes[i].doctor.nombreCompleto,
                          "especialidad":this.paciDetalle.doctorPacientes[i].doctor.especialidad,
                              "doctorid":this.paciDetalle.doctorPacientes[i].doctor.id,
                            "pacienteid":25};
            this.arraydet.push(this.regdit);
      }
    });
  }
}


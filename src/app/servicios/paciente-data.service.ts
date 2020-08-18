import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Paciente } from '../modelos/Paciente'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PacienteDataService {
  url :string="http://localhost:50420"
  isagregar:boolean=false;

  constructor(private http:HttpClient) { }
   
  getpaciente(){
    return this.http.get<Paciente[]>(`${this.url}/api/Pacientes`)
    .map(res=>res);
  }
  addpaciente(newpaciente :Paciente){
    return this.http.post<Paciente>(`${this.url}/api/Pacientes`,newpaciente)
    .map(res=>res);
  }

  edipaciente(newpaciente:Paciente){
  return this.http.put<Paciente>(`${this.url}/api/Pacientes/${newpaciente.id}`,newpaciente)
  .map(res=>res);
  }

  erasepaci(id){
    return this.http.delete<Paciente>(`${this.url}/api/Pacientes/${id}`)
    .map(res=>res);
   }

   getpacientedetalle(id)
   {
    return this.http.get(`${this.url}/api/Pacientes/Detalle/${id}`)
    .map(res=>res);
   }
}

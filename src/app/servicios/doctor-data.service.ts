import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Doctor } from '../modelos/Doctor'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DoctorDataService {
  url :string="http://localhost:50420"
  isagregar:boolean=false;

  constructor(private http:HttpClient) { }
    getdoctor(){
    return this.http.get<Doctor[]>(`${this.url}/api/Doctores`)
    .map(res=>res);
  }
  adddoctor(newdoctor :Doctor){
    return this.http.post<Doctor>(`${this.url}/api/Doctores`,newdoctor)
    .map(res=>res);
  }

  edidoctor(newdoctor:Doctor){
    console.log(newdoctor);
  return this.http.put<Doctor>(`${this.url}/api/Doctores/${newdoctor.id}`,newdoctor)
  .map(res=>res);
  }
    erasedoctor(id){
    return this.http.delete<Doctor>(`${this.url}/api/Doctores/${id}`)
    .map(res=>res);
   }
}
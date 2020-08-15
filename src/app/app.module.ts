import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { DoctorDataService } from './servicios/doctor-data.service'
import { PacienteDataService } from './servicios/paciente-data.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormDoctorComponent } from './componentes/form-doctor/form-doctor.component';
import { FormPacienteComponent } from './componentes/form-paciente/form-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    FormDoctorComponent,
    FormPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DoctorDataService,PacienteDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

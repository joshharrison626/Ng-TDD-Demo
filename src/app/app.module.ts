import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorkerPickerComponent } from './worker-picker/worker-picker.component';
import { FormsModule } from '@angular/forms';
import { WorkerService } from './worker/worker.service';


@NgModule({
  declarations: [
    AppComponent,
    WorkerPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    WorkerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

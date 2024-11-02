import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
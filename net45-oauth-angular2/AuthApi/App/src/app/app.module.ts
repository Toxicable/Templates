/**
 * Created by Fabian on 24/09/2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { AuthModule }    from '../auth/auth.module';

@NgModule({
    imports: [
        BrowserModule,
        AuthModule
    ],
    declarations: [ AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
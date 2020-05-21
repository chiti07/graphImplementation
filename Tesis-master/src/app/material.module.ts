import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card'
import { HighchartsChartModule } from 'highcharts-angular';
import { from } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatDividerModule, HighchartsChartModule, FlexLayoutModule, MatCardModule],
    exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule, MatDividerModule, HighchartsChartModule, FlexLayoutModule, MatCardModule]
})
export class MaterialModule{

}
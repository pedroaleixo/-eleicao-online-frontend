import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading.component';


@NgModule({
    declarations: [LoadingComponent],
    exports: [LoadingComponent],
    imports: [CommonModule]
})
export class LoadingModule {

}

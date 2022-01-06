import { DeleteDialogComponent } from './delete-dialog.component';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
    declarations: [DeleteDialogComponent],
    exports: [DeleteDialogComponent],
    imports: [CommonModule, MaterialModule]
})
export class DeleteDialogModule {

}

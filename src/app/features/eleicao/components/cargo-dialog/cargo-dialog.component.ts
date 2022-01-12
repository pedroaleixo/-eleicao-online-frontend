import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo } from '../../interfaces/cargo';

@Component({
  selector: 'app-cargo-dialog',
  templateUrl: './cargo-dialog.component.html',
  styleUrls: ['./cargo-dialog.component.css']
})
export class CargoDialogComponent implements OnInit {

  cargoDialogForm!: FormGroup;
  cargos:Cargo[] = [];
  cargoEditado:Cargo;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CargoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.cargos = data.cargos;
      this.cargoEditado = data.cargoEditado;
  }

  ngOnInit(): void {
    this.cargoDialogForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      escolhas: ['', [Validators.required]]
    });

    if(this.cargoEditado){
      this.cargoDialogForm.get('nome').setValue(this.cargoEditado.nome);
      this.cargoDialogForm.get('escolhas').setValue(this.cargoEditado.escolhas);
    }
  }

  adicionar(){
    if (!this.cargoDialogForm.valid) {
      return;
    }

    if(this.cargoEditado){
      this.cargos.forEach(c => {
        if((this.cargoEditado.id && c.id === this.cargoEditado.id)
        || (!this.cargoEditado.id && c.nome === this.cargoEditado.nome)){
          c.nome = this.cargoDialogForm.get('nome').value;
          c.escolhas = this.cargoDialogForm.get('escolhas').value;
        }
      })
    } else {
      const cargo = {id: null, nome: this.cargoDialogForm.get('nome').value,
      escolhas: this.cargoDialogForm.get('escolhas').value, votosBrancos: 0};
      this.cargos.push(cargo);
    }

    this.dialogRef.close({data: this.cargos});
  }
}

export interface Estatistica {
  registros: RegistroEstatistica[];
	totalElementos: number;
}

export interface RegistroEstatistica {
  label:string;
	valor: number;
	percentual: number;
}

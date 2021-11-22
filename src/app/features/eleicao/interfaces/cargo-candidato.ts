import { Candidato } from '../../candidato/interfaces/candidato';
import { Cargo } from './cargo';

export interface CargoCandidato {
  cargo:Cargo;
  candidatos:Candidato[];
}

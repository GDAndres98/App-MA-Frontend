import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'veredictPipe'
})
export class VeredictPipe implements PipeTransform {
  transform(value: string): string {
      switch(value){
        case "IN_QUEUE": return "En cola";
        case "ACCEPTED": return "Aceptado";
        case "WRONG_ANSWER": return "Respuesta Incorrecta";
        case "TIME_LIMIT": return "Límite de Tiempo Excedido";
        case "MEMORY_LIMIT": return "Límite de Memoria Excedida";
        case "COMPILATION_ERROR": return "Error de Compilación";
        case "PRESENTATION_ERROR": return "Error de Presentación";
        case "RUNTIME_ERROR": return "Error de Ejecución";
      }
  }
}
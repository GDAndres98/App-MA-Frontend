import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'veredictPipe'
})
export class VeredictPipe implements PipeTransform {
  transform(value: string): string {
      switch(value){
        case "In_Queue": return "En cola";
        case "Accepted": return "Aceptado";
        case "Wrong_Answer": return "Respuesta Incorrecta";
        case "Time_Limit": return "Limite de Tiempo Excedido";
        case "Memory_Limit": return "Limite de Memoria Excedida";
        case "Compilation_Error": return "Error de Compilación";
        case "Presentation_Error": return "Error de Presentación";
      }
  }
}
export interface Game{
  _id?:string
  num:number,
  titulo:string,
  campanya:string,
  fechaJugada:Date,
  resumen:string,
  creator:string,
  personajes?:string[]

}

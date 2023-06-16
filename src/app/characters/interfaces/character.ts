export interface Character {
  _id?:string,
  nombre:string,
  titulo:string,
  descripcion:string,
  edad:number,
  clases:Class[],
  campanya:string,
  fotoPerfil:string,
  reliquia:string[],
  intergalactico:boolean,
  singularidad:string[],
  facciones:string[],
  partidaAparicion:string,
  muerto:boolean,
  galeria:string[],
  lore:string,
  rasgos:Trait[],
  pv:number,
  ca:number,
  fue:number,
  des:number,
  con:number,
  int:number,
  sab:number,
  car:number,
  jugador:string,
  tipoJuego:string,
  creator?:string,
  movimiento:number,
  private:boolean,
  tier:string,
  canciones:Song[]
}

export interface Trait{
  title:string,
  info:string,
  privacy:boolean
}

export interface Class{
  class:string,
  level:number
}

export interface Song{
  title:string,
  link:string,
  privacy:boolean
}

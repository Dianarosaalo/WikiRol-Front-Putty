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
  canciones:Song[],
  reader?:string,
  campanyasSecundarias?:string[],
  deidad:string,
  privateStats: boolean,
  altura:number,
  peso:number,
  competencia:number,
  salvaciones:number[],
  percepcion:number,
  investigacion:number,
  experiencia:number,
  iniciativa:number,
  version?: string | null,
  hiddenInTierList: boolean,
  bestiario: string,
  marcaNegra?:boolean
}

export interface Trait{
  title:string,
  info:string,
  privacy:boolean,
  type:string
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

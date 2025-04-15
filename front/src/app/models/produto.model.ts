export class Produto {
    constructor(
      public id?: number,
      public nome?: string,
      public valor?: number,
      public estoque?: number,
      public tipo?: any,
      public cidade?: any,
      public fabricante?: any
    ) { }
  }
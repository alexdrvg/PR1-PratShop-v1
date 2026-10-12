export type Categoria = 'Auriculars' | 'Smartwatches' | 'Audio & Altaveus' | 'Accessoris';

export interface Producte {
  id: string;
  nom: string;
  categoria: Categoria;
  descripcioCurta: string;
  descripcioLlonga?: string;
  preu: number;
  preuAntic?: number;
  estoc: number;
  imatge: string;
  insignia?: string;
}

export interface LiniaCarro {
  producte: Producte;
  quantitat: number;
}
// tache.model.ts
export interface Tache {
    title: string;
    sousTaches?: SousTache[];
    priority: 0 | 1 | 2;
    completed: boolean; // Ajoutez cette propriété
  }
  
  export interface SousTache {
    title: string;
    completed: boolean; // Ajoutez cette propriété
  }
  
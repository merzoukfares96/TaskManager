import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SousTache, Tache } from '../../models/tache';
import { TacheService } from '../../services/tache.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnChanges{
  @Input() editedTask: Tache | null = null;
  @Output() addTask = new EventEmitter<Tache>();
  @Output() editTask = new EventEmitter<Tache>();
  @Output() cancel = new EventEmitter<void>();

  newTaskTitle: string = '';
  newTaskPriority: 0 | 1 | 2 = 0;
  newTaskSousTaches: string = '';
  showPopup: any;

  constructor(private tacheService: TacheService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Mettez à jour les champs du formulaire si une tâche est éditée
    if (changes['editedTask'] && this.editedTask) {
      this.newTaskTitle = this.editedTask.title;
      this.newTaskPriority = this.editedTask.priority;
      this.newTaskSousTaches = this.editedTask.sousTaches?.map(st => st.title).join(', ') || '';
    }
  }

  validateForm(): void {
    if (this.editedTask) {
      this.editedTask.title = this.newTaskTitle.charAt(0).toUpperCase() + this.newTaskTitle.slice(1);
      this.editedTask.priority = this.newTaskPriority;
      this.editedTask.sousTaches = this.newTaskSousTaches.split(', ').map(sousTache => ({ title: sousTache.charAt(0).toUpperCase() + sousTache.slice(1), completed: false } as SousTache));
      console.log("Titre editedTask = " + this.editedTask.title + " et newTaskTitle = " + this.newTaskTitle)
      this.editTask.emit(this.editedTask);
      this.resetForm();
    } else {
      const newTask: Tache = {
        title: this.newTaskTitle.charAt(0).toUpperCase() + this.newTaskTitle.slice(1),
        sousTaches: this.newTaskSousTaches.split(', ').map(sousTache => ({ title: sousTache.charAt(0).toUpperCase() + sousTache.slice(1), completed: false } as SousTache)), // Utilisez la structure appropriée pour SousTache
        priority: this.newTaskPriority,
        completed: false
      };

      this.addTask.emit(newTask);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newTaskTitle = '';
    this.newTaskSousTaches = '';
    this.newTaskPriority = 0;
    this.editedTask = null;
  }
}

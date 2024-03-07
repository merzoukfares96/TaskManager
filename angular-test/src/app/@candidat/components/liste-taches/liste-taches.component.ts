// liste-taches.component.ts
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SousTache, Tache } from '../../models/tache';
import { TacheService } from '../../services/tache.service';

@Component({
  selector: 'app-liste-taches',
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.scss']
})
export class ListeTachesComponent implements OnInit {
  @Input() taskList: Tache[] = [];
  editedTask: Tache | null = null;
  constructor(private tacheService: TacheService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  
  editTask(task: Tache): void {
    this.tacheService.saveTask(task);
  }

  editTaskButton(task: Tache): void {
    console.log("task = " + task.title);
    this.editedTask = task;
  }

  removeSousTache(taskTitle: string, sousTache: string): void {
    console.log(`Suppression de la sous-tâche "${sousTache}" pour la tâche "${taskTitle}`);
    this.tacheService.removeSousTache(taskTitle, sousTache);
  }

  removeTask(taskTitle: string): void {
    console.log("Suppression de la tâche = " + taskTitle);
    this.tacheService.removeTask(taskTitle);
  }

  cancelEditing(): void {
    this.editedTask = null
  }

  getPriorityClass(priority: 0 | 1 | 2): string {
    console.log("priority = " + priority)
    if (priority == 0){
      return "priority-low";
    } else if (priority == 1) {
      return "priority-medium";
    } else {
      return "priority-high"
    }
  }

  updateTaskList(): void {
    const taskList = this.taskList;
    
    // Itérer sur chaque tâche
    taskList.forEach(task => {
      // Récupérer la classe CSS en fonction de la priorité
      const priorityClass = this.getPriorityClass(task.priority);

      // Ajouter la classe CSS à la tâche
      this.renderer.addClass(this.el.nativeElement.querySelector(`#task-${task.title}`), priorityClass);
    });
  }

  // Fonction pour basculer l'état de complétion d'une tâche
  toggleTaskCompletion(task: Tache): void {
    this.tacheService.toggleTaskCompletion(task);
    console.log("task state : " + task.completed);
  }

  // Fonction pour basculer l'état de complétion d'une sous-tâche
  toggleSousTacheCompletion(task: Tache, sousTache: SousTache): void {
    this.tacheService.toggleSousTacheCompletion(task, sousTache);
    console.log("sous-tache state : " + sousTache.completed);
  }
  
  addTask(newTask: Tache): void {
    this.tacheService.addTask(newTask);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SousTache, Tache } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private localStorageKey = 'taskList';
  private taskListSubject = new BehaviorSubject<Tache[]>(this.getTasksFromLocalStorage());
  taskList$ = this.taskListSubject.asObservable();
  
  private selectedTaskSubject = new BehaviorSubject<Tache | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();

  constructor() { }

  
  private getTasksFromLocalStorage(): Tache[] {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  private saveTaskToLocalStorage(tasks: Tache[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
  
  addTask(newTask: Tache): void {
    const currentTaskList = this.taskListSubject.value;
    newTask.completed = false;
    if (newTask.sousTaches) {
      newTask.sousTaches.forEach((sousTache) => {
        sousTache.completed = false;
      })
    }
    currentTaskList.push(newTask);
    this.updateTaskList(currentTaskList);
  }

  removeTask(title: string): void {
    const currentTaskList = this.taskListSubject.value;
    console.log("removeTask service title = " + title)
    const updatedTaskList = currentTaskList.filter((task) => task.title !== title);
    this.updateTaskList(updatedTaskList);
  }

  removeSousTache(title: string, sousTache: string): void {
    const currentTaskList = this.taskListSubject.value;
    const updatedTaskList = currentTaskList.map((task) => {
      if (task.title === title) {
        // Si c'est la tâche spécifique, met à jour les sous-tâches
        const updatedSousTaches = task.sousTaches?.filter((st) => st.title !== sousTache);
        return { ...task, sousTaches: updatedSousTaches };
      } else {
        // Sinon, retourne la tâche inchangée
        return task;
      }
    });
    this.updateTaskList(updatedTaskList);
  }  
  
  toggleTaskCompletion(task: Tache): void {
    task.completed = !task.completed;
    this.updateTaskList(this.taskListSubject.value);
  }

  toggleSousTacheCompletion(task: Tache, sousTache: SousTache): void {
    const sousTacheIndex = task.sousTaches?.indexOf(sousTache);
    console.log(sousTacheIndex + " + " + task.sousTaches);
    if (sousTacheIndex !== undefined && sousTacheIndex !== -1 && task.sousTaches) {
      console.log("task.sousTaches[sousTacheIndex].completed = " + task.sousTaches[sousTacheIndex].completed);
      task.sousTaches[sousTacheIndex].completed = !task.sousTaches[sousTacheIndex].completed;
      this.updateTaskList(this.taskListSubject.value);
    }
  }

  saveTask(selectedTask: Tache): void {
    console.log("je suis la");
    if (selectedTask) {
      const taskList = this.taskListSubject.value;
      const updatedTaskList = taskList.map((task) =>
        task.title === selectedTask.title ? selectedTask : task
      );
      this.updateTaskList(updatedTaskList);
      this.selectedTaskSubject.next(null); // Émet un événement pour réinitialiser la tâche sélectionnée
    }
  }
  sortTasksByPriority(tasks: Tache[]): Tache[] {
    return tasks.slice().sort((a, b) => a.priority - b.priority);
  }

  updateTaskList(newTaskList: Tache[]): void {
    const sortedTaskList = this.sortTasksByPriority(newTaskList);
    this.taskListSubject.next(sortedTaskList);
    this.saveTaskToLocalStorage(sortedTaskList);
  }
}

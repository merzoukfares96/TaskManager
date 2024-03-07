// exercice.component.ts
import { Component, OnInit } from '@angular/core';
import { Tache } from '../@candidat/models/tache';
import { TacheService } from '../@candidat/services/tache.service';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.scss']
})
export class ExerciceComponent implements OnInit {
  taskList: Tache[] = [];

  constructor(private tacheService: TacheService) {}

  ngOnInit(): void {
    this.tacheService.taskList$.subscribe((tasks) => {
      this.taskList = tasks;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DropComponent } from './drop/drop.component';
import { ClassService } from './services/class.service';
import { CdkDragMove } from '@angular/cdk/drag-drop'; // Import pour suivre le mouvement des cartes
import { Class } from './models/class.model'; // Import de l'interface Class

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'drag_drop';  // Ajoutez cette ligne

  classes: Class[] = []; // Liste complète des classes

  // Colonnes à afficher pour chaque classe
  displayedColumns: string[] = ['className', 'attribute1', 'attribute2', 'attribute3', 'function1', 'function2', 'typeClass', 'action'];

  constructor(private _dialog: MatDialog, private _classService: ClassService) { }

  ngOnInit(): void {
    this.getClassList(); // Récupère les classes lors du démarrage
  }

  // Récupère la liste des classes
  getClassList() { //Appel de la méthode getClassList() du service ClassService pour obtenir les données des classes.
    this._classService.getClassList().subscribe({
      next: (res: Class[]) => { //res contient la liste des classes
        // Initialisez les positions des cartes
        this.classes = res.map(cls => ({       //pour chaque class
          ...cls, //cls l objet de class et ...cls une copie de cls
          position: { top: 100, left: 100 } // Position initiale pour chaque carte
        }));
      },
      error: console.log,
    });
  }

  // Gère le déplacement de la carte
  onDragMoved(event: CdkDragMove, cls: Class) {
    // Mise à jour de la position de la carte au fur et à mesure de son déplacement
    cls.position = {
      top: event.pointerPosition.y - 50, // Décalage pour le centre du curseur
      left: event.pointerPosition.x - 125, // Décalage pour le centre du curseur
    };
  }

  // Ouvre le formulaire d'ajout/édition des classes
  openAddEditEmpForm(data: Class | null = null) {
    const dialogRef = this._dialog.open(DropComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClassList(); // Recharge la liste des classes après ajout/édition
        }
      },
    });
  }

  // Supprime une classe
  deleteClass(id: number) {
    this._classService.deleteClass(id).subscribe({
      next: () => {
        alert('Class deleted');
        this.getClassList(); // Recharge la liste après suppression
      },
      error: console.log,
    });
  }
}

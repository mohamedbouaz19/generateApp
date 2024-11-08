import { Attribute, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.css'
})
export class DropComponent {
  empForm:FormGroup;



  education:string[]=[
    'Public',
    'Private',
    'Protected',
  ]

  constructor(private _fb: FormBuilder,
    private _clsService:ClassService,
    private _dialogRef:MatDialogRef<DropComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){
      
    this.empForm=this._fb.group({
      className:'',
      attribute1:'',
      attribute2:'',
      attribute3:'',
      function1:'',
      function2:'',
      typeClass:'',

    })
  }
  ngOnInit(): void{
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._clsService.updateClass(this.data.id,this.empForm.value).subscribe({
          //if it succed
          next:(val:any)=>{
            alert('class updated');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.error(err);
          },
        });

      }
      else{
      this._clsService.addClass(this.empForm.value).subscribe({
        //if it succed
        next:(val:any)=>{
          alert('Employee added succefully');
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.error(err);
        },
      });
    }
    }
  }
  
  

}

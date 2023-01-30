import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormControl, FormBuilder } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { FamilyService } from '../../services/orphan.service';

@Component({
  selector: 'Sponsorship-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

 //orphanForm!:  FormGroup;
  submitted = false;
  isUpdateOrphan = false
  userList:any = [];
  filterTerm!: string;
  motherImage:any; 
  attachments: any[] = [];

  orphanForm = new FormGroup({
    familyName: new FormControl('', Validators.required),
    motherFirstName: new FormControl('', Validators.required),
    motherName: new FormControl('', Validators.required),
    maternalHealthStatus: new FormControl('', Validators.required),
    personalId: new FormControl('', Validators.required),
    telephoneNumber: new FormControl('', Validators.required),
    numberOfOrphans: new FormControl('', Validators.required),
    profession: new FormControl('', Validators.required),
    spouseDeathDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })
  
  constructor(
    public fb: FormBuilder,
    private orphanService: FamilyService,
    private timer:TimerService
    ) { }

    // orphanForm = this.fb.group({
    //   familyName: [null],
    //   MotherFirstName:[''],
    //   MotherlastName:[''],
    //   maternalHealthStatus:[''],
    //   personalIdCard:[''],
    //   numberOfOrphans:[''],
    //   spouseDeathDate:[''],
    //   address:['']
    // })

  ngOnInit() {
    debugger

    this.getUsrs();   
    // await this.httpClient.get("assets/usersData.json").subscribe(data =>{
    //   console.log(data);  
    //   debugger;
    //   this.userList = data;
    // })
  }

  get familyName() 
  { 
    return this.orphanForm.get('familyName'); 
  }
  get motherFirstName() { return this.orphanForm.get('motherFirstName'); }
  get motherName() { return this.orphanForm.get('motherName'); }
  get maternalHealthStatus() { return this.orphanForm.get('maternalHealthStatus'); }
  get personalId() { return this.orphanForm.get('personalId'); }
  get telephoneNumber() { return this.orphanForm.get('telephoneNumber'); }
  get numberOfOrphans() { return this.orphanForm.get('numberOfOrphans'); }
  get profession() { return this.orphanForm.get('numberOfOrphans'); }
  get spouseDeathDate() { return this.orphanForm.get('spouseDeathDate'); }
  get address() { return this.orphanForm.get('address'); }

  get f() { return this.orphanForm.controls; }


  public validate(): void {
    if (this.orphanForm.invalid) {
      for (const control of Object.keys(this.orphanForm.controls)) {
        this.orphanForm.controls[control].markAsTouched();
      }
      return;
    }
  }

  async getUsrs(){
    await this.orphanService.getFamilyList().subscribe(data =>{
      console.log(data);  
      debugger;
      this.userList = data;
    })
  }

  onSubmit() {
    // this.submitted = true;
    // if (this.orphanForm.valid) {
    //   alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    //   console.table(this.orphanForm.value);
    // }
  }

  addOrphan(){
    debugger;
    this.orphanForm = new FormGroup({
      familyName: new FormControl('', Validators.required),
      motherFirstName: new FormControl('', Validators.required),
      motherName: new FormControl('', Validators.required),
      maternalHealthStatus: new FormControl('', Validators.required),
      personalId: new FormControl('', Validators.required),
      telephoneNumber: new FormControl('', Validators.required),
      numberOfOrphans: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      spouseDeathDate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
  }

  openUpdateOrphanMoal(orphan:any){
    debugger;
    this.isUpdateOrphan = true
    this.orphanForm.patchValue({ 
      ...orphan
    })
  }

  async closeUpdateOrphanMoal(){
    this.timer.onTimerStart();
    this.isUpdateOrphan = false
   // Object.values(this.orphanForm.controls).forEach(control => {
    //  control.reset()
   // });
    
    this.timer.onTimerStop();
  }

  onSelectImage(event:any){
    let newFile: any = {
      fileBytes: null,
      extension: null
    }
  }

  removeAttachment(){
    this.attachments.splice(this.attachments.findIndex(x => x.fileBytes),1)
  }

   //push selected file to files list
 onSelectFile(event: any) {
    let newFile: any = {
      fileBytes: null,
      extension: null
      }
  }

  getFormProperty(property:any){
    //return this.orphanForm.get(property);
  }
  onSubmitOrphanForm(){
    this.orphanForm = new FormGroup({
      familyName: new FormControl('', Validators.required),
      MotherFirstName: new FormControl('', Validators.required),
      MotherlastName: new FormControl('', Validators.required),
      maternalHealthStatus: new FormControl('', Validators.required),
      personalIdCard: new FormControl('', Validators.required),
      numberOfOrphans: new FormControl('', Validators.required),
      spouseDeathDate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  delOrphan(){
    this.userList.pop()
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Family } from 'src/app/models/family';
import { Sponsor } from 'src/app/models/sponsor';
import { FamilyService } from '../../services/orphan.service';
import { SponsorService } from '../../services/sponsor.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  titleParam = {company:'Phrase'}
  dropdown:boolean = false
  
  filterTerm!: string;
  filterTermOrphan!: string;
  filterTermSponsor!: string;
  p: number = 1;

  users:any=[];
  
  userList:Family[] = [];
  sponsorList:Sponsor[] = [];
  
  attachments: any[] = []

  orphanForm! : FormGroup;
  
  sponsorForm! : FormGroup;
  
  isUpdateOrphan = false;
  isUpdateSponsor = false;

  sponsorToDelete: number;
  orphanToDelete: number;
  
  motherImage:any;

  helpTypes: any=['HelpTyp 1', 'HelpTyp 2'];

  
  constructor(
    private fb: FormBuilder,
    private orphanService: FamilyService,
    private sponsorService: SponsorService) {
   }

  ngOnInit(): void {
    //debugger;
    this.getOrphans();   
    this.getSponsors();
  
    //orphans: Orphan[] = orphansData

    this.orphanForm = this.fb.group({
      familyName: [null,[Validators.required]],
      motherName: [null,[Validators.required]],
      motherFirstName: [null,[Validators.required]],
      profession: [null,[Validators.required]],
      maternalHealthStatus: [null,[Validators.required]],
      personalId: [null,[Validators.required]],
      spouseDeathDate: [null],
      address: [null,[Validators.required]],
      telephoneNumber: [null,[Validators.required]],
      numberOfOrphans: [null],
      numberOfPerson: [null],
      earnings:  [null],
      residentialStatus: [null],
      comment: [null],
      godFatherType:[null],
      TheAmountPaid:[null],
      TheAmountSpent:[null],
      familyimageUrl: [null],
      familyimageUrlName: [null],
      orphansList: this.fb.array([])
    })

    
    this.sponsorForm = this.fb.group({
      firstName: [null,[Validators.required]],
      lastName: [null,[Validators.required]],
      address: [null,[Validators.required]],
      personalIdCard: [null,[Validators.required]],
      telephoneNumber: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      nameOfFamilyAssisted: [null, [Validators.required]],
      nrOfFamilyHelped: [null, [Validators.required]],
      helpType: [null,[Validators.required]],
      contributedAmount: [null,[Validators.required]],
      paid: [null,[Validators.required]],
    })
  }

  async getOrphans(){
    await this.orphanService
              .getFamilyList()
              .subscribe(data =>{
                  console.log(data);  
                  this.userList = data;
    })
  }

  async getSponsors(){
    await this.sponsorService
              .getSponsorData()
              .subscribe(data => {
      console.log(data);  
      this.sponsorList = data;
    })
  }

  get orphansList() {
    return this.orphanForm.controls["orphansList"] as FormArray;
  }

  addOrphan() {
    const orphanDataForm = this.fb.group({
       name: [null, Validators.required],
        firsName: [null, Validators.required],
        healthStatus: [null, Validators.required],
        note: [null, Validators.required],
        dateOfBirth: [null, Validators.required],
        OrphanFirstName: [null, Validators.required],
        academicLevel: [null, Validators.required],
        residentialStatus: [null, Validators.required],
        numberOfPeople: [null, Validators.required],
        socialCare: [null, Validators.required],
        earnings: [null, Validators.required],
        godFatherType: [null, Validators.required],
    });
     //debugger;
    this.orphansList.push(orphanDataForm);
  }

  deleteOrphan(orphanIndex: number) {
    this.orphansList.removeAt(orphanIndex);
  }


  getFormProperty(property:any){
    return this.orphanForm.get(property);
  }
  
  getSponsorFormProperty(property:any){
    return this.orphanForm.get(property);
  }

  getFormArrayProperty(index:any, property:any){
   // debugger;
    return (this.orphanForm.controls['orphansList'] as FormArray).controls[index].get(property)
  }

  onSubmitOrphanForm(){

    if(this.orphanForm.valid){
       
      if(this.isUpdateOrphan){
         this.orphanService
             .updateFamily(this.orphanForm.value);
      } 
      else{
        this.userList.push(this.orphanForm.value);
        this.orphanService
            .addFamilly(this.orphanForm.value)
            .subscribe(resp => {
                  alert('orphan created '+ JSON.stringify(this.orphanForm.value))
        }, 
        err => {
            alert('orphan created '+ JSON.stringify(this.orphanForm.value))
        })
      }  
    } else {
      Object.keys(this.orphanForm.controls).forEach(key => {
        const controlErrors= this.orphanForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });      
      Object.values(this.orphanForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onSubmitSponsorForm(){
    if(this.sponsorForm.valid){

      if(this.isUpdateSponsor){
        //this.sponsorList.pop(this.sponsorForm.value);
        this.sponsorService.updateSponsor(this.sponsorForm.value);
      }
      else{
        this.sponsorList.push(this.sponsorForm.value)
        this.sponsorService.addSponsor(this.sponsorForm.value).subscribe(resp => {
          alert('sponsor created '+ JSON.stringify(this.sponsorForm.value))
    
        }, err => {
          alert('sponsor created '+ JSON.stringify(this.sponsorForm.value))
        })
      }
    }
    else {
      Object.values(this.sponsorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  openUpdateOrphanMoal(orphan:any){
    this.isUpdateOrphan = true
    this.orphanForm.patchValue({
      ...orphan
    })
  }

  openDeleteOrphanModal(orphanId:number){
    this.orphanToDelete = orphanId;
  }

  openDeleteSponsorModal(sponsorId:number){
    this.sponsorToDelete = sponsorId;
  }

  openUpdateSponsorModal(sponsor:Sponsor){
    this.isUpdateSponsor = true
    this.sponsorForm.patchValue({
      ...sponsor
    })
  }
  closeUpdateOrphanMoal(){
    this.isUpdateOrphan = false
    Object.values(this.orphanForm.controls).forEach(control => {
      control.reset()
    });
  }

  closeUpdateSponsorMoal(){
    this.isUpdateSponsor = false
    Object.values(this.sponsorForm.controls).forEach(control => {
      control.reset()
    });
  }

  delOrphan(){
    if(!!this.orphanToDelete){
      this.orphanService.deleteFamily(this.orphanToDelete);
      let sponsorIndex = this.userList.findIndex(x => x.id ==  this.orphanToDelete)
      if(sponsorIndex >= 0) this.userList.splice(sponsorIndex, 1);
    }
  }

  delSponsor(){    
    if(!!this.sponsorToDelete){
      this.sponsorService.deleteSponsor(this.sponsorToDelete);
      let sponsorIndex = this.sponsorList.findIndex(x => x.id ==  this.sponsorToDelete)
      if(sponsorIndex >= 0) this.sponsorList.splice(sponsorIndex, 1);
    }
  }
  
 DropDown() {
   this.dropdown = !this.dropdown
 }
 //push selected file to files list
 onSelectFile(event: any) {
   let newFile: any = {
     fileBytes: null,
     extension: null
   }

   newFile.fileBytes = event.target.files[0];
   newFile.extension = this.fetchExt(event.target.files[0].name)

   var fileReader = new FileReader()

   fileReader.readAsDataURL(newFile.fileBytes)

   fileReader.onload = () => {
     console.log("byte array ", fileReader.result)
     newFile.fileBytes = fileReader.result
     this.attachments.push(newFile)
     console.log("CompanyLogo ", this.attachments)
   }

 }


 onSelectImage(event:any){
  let newFile: any = {
    name: "",
    fileBytes: null,
    extension: null
  }

  newFile.Name = event.target.files[0].name;
  newFile.fileBytes = event.target.files[0];
  newFile.extension = this.fetchExt(event.target.files[0].name)

  var fileReader = new FileReader()

  fileReader.readAsDataURL(newFile.fileBytes)

  fileReader.onload = () => {
    console.log("byte array ", fileReader.result)
    newFile.fileBytes = fileReader.result
    this.motherImage = newFile;
    this.orphanForm.patchValue({familyimageUrlName: this.motherImage.name, familyimageUrl: this.motherImage.fileBytes})

    console.log("CompanyLogo ", this.attachments)
  }

 }

 removeAttachment(){
   this.attachments.splice(this.attachments.findIndex(x => x.fileBytes),1)
 }

 //get formatted file name from a selected file
 //file be selected from file element
 public fetchExt(name: string): string {
   const splitName = name.split('.')
   let extensionName = ''
   if (splitName.length > 0) {
     extensionName = splitName[splitName.length - 1]
   }
   return extensionName
 }

}

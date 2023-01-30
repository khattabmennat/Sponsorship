import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { familywithorphans } from 'src/app/models/familywithorphans';
import { FamilyService } from 'src/app/services/orphan.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEdit = false;

  baseUrl: string= "https://localhost:7170/Waisen/";

  familyDetails: familywithorphans;

  constructor(private route: ActivatedRoute, private familyService: FamilyService) {}

  ngOnInit(): void {
    let familyId =  Number(this.route.snapshot.paramMap.get('sponsorid'));
    this.getFamilyWithOrphanData(familyId);
  }

  /**
     * Get Family with orphans data by id
     * @returns 
     */
  async getFamilyWithOrphanData(familyId: number){
    await this.familyService
               .getFamilyWithOrphanDataById(familyId)
               .subscribe(data =>{
                  console.log(data);  
                  this.familyDetails = data;
        });
  }


}

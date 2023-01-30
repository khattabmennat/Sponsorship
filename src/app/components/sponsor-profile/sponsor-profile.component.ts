import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Sponsor } from 'src/app/models/sponsor';
import { SponsorService } from 'src/app/services/sponsor.service';

@Component({
  selector: 'Sponsorship-sponsor-profile',
  templateUrl: './sponsor-profile.component.html',
  styleUrls: ['./sponsor-profile.component.css']
})
export class SponsorProfileComponent implements OnInit {

  baseUrl: string= "https://localhost:7170/Waisen/";

  sponsorid: number;

  sponsorDetails:Sponsor;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private sponsorService: SponsorService) { }

  ngOnInit() {
    this.sponsorid =  Number(this.route.snapshot.paramMap.get('sponsorid'));
    this.sponsorService
        .getSponsorDataById(this.sponsorid)
        .subscribe(data => {
            console.log(data); 
            this.sponsorDetails = data;
         });
  }
}

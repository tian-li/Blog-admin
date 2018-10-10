import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  constructor(private router: ActivatedRoute) {}

  id: string;

  ngOnInit() {
    this.router.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      console.log('id', this.id)
    });
  }

 }

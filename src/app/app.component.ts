import { Component, OnInit, makeStateKey, TransferState } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { PageService } from './page.service'; // Import the service

const POSTS_KEY = makeStateKey<any[]>('posts');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageService] // Provide the service
})
export class AppComponent implements OnInit {
  title = 'ng';
  posts: any[] = [];

  constructor(private myService: PageService, private transferState: TransferState) { }

  ngOnInit(): void {
    this.posts = this.transferState.get(POSTS_KEY, null as any);
    if (!this.posts) {
      this.myService.getPosts().subscribe({
        next: (data) => {
          this.posts = data;
          this.transferState.set(POSTS_KEY, this.posts);
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
          // Handle error gracefully, e.g., display an error message to the user
        }
      });
    }
  }
}

import { Component, OnInit, makeStateKey, TransferState } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NgFor } from '@angular/common';

const POSTS_KEY = makeStateKey<any[]>('posts');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng';
  posts: any[] = [];

  constructor(private http: HttpClient, private transferState: TransferState) { }

  async ngOnInit(): Promise<void> {
    this.posts = this.transferState.get(POSTS_KEY, null as any);
    if (!this.posts) {
      try {
        this.posts = await this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').toPromise() ?? [];
        this.transferState.set(POSTS_KEY, this.posts);
      } catch (error) {

        console.error('Error fetching posts:', error);
        // Handle error gracefully, e.g., display an error message to the user
      }
    }
  }
}

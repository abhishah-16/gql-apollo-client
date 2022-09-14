import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_USERS = gql`
query Users {
  users {
    id
    name
    email
    age
    nationality
    friends {
      id
      name
      email
    }
    favoritemovies {
      id
      name
      year
      inTheater
    }
    favoritebooks {
      id
      name
      author
    }
  }
}
`
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allusers: any = []
  friends:any = []
  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_USERS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.allusers = data
    })
  }
  title = 'gql-client';
}

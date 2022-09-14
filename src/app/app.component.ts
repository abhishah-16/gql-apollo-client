import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { User } from './user.model';

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
const GET_USERBYID = gql`
query User($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    age
    nationality
    friends {
      id
      name
      email
      age
      nationality
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
  selectedId = null
  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_USERS
    }).valueChanges.pipe(
      map((result: any) => {
        this.allusers = result.data.users
      })
    ).subscribe()
  }
  searchById() {
    console.log(this.selectedId);
    this.apollo.watchQuery({
      query: GET_USERBYID,
      variables: {
        "userId": this.selectedId
      }
    }).valueChanges.pipe(
      map((result: any) => {
        const user = result.data.user
        this.allusers = [user]
      })
    ).subscribe()
  }
}

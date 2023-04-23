import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  createUser(user: User) {
    console.log(user)
    //return this.http.post('http://localhost:8080/api/v1/auth/register', user);
  }
}
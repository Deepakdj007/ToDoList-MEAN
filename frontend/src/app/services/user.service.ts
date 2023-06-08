import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!: {name:string, email:string} | null;
  private readonly USER_KEY = 'user';

  constructor(private http:HttpClient) {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
   }

  createUser(user: User) {
    console.log(user)
    return this.http.post('http://localhost:3000/api/v1/auth/register', user);
  }

  loginUser(user:UserLogin){
    return this.http.post('http://localhost:3000/api/v1/auth/login', user);
  }

  //set user object in frontend
  setUser(user: any) {
    this.user = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  //get user object from frontend
  getUser() {
    if(this.user){
      return this.user;
    }
    else{
      return null;
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }

}

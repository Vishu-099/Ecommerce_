import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, sign_up } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  userSignup(data:sign_up){
    return this.http.post('http://localhost:3000/user',data)
  }

  userLogin(data:login){
    return this.http.get<login[]>(`http://localhost:3000/user?email=${data.email}&&password=${data.password}`)
  }
}

import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CrudService {

  private apiUrl = "http://localhost:4200/api/";
  constructor(private http: HttpClient) {}
  
}
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = "http://localhost:8080/api/";
  
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params: httpParams }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Envia JSON puro para endpoints que esperam application/json
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Envia FormData para endpoints que esperam multipart/form-data
  putFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    // Não defina headers manualmente! O browser faz isso automaticamente para FormData.
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, formData).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  
}
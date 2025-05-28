import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})

export class UserService {

  private userAuthorities: Set<string> = new Set();
  private token: any;

  constructor(
    private toastr: ToastrService
  ) {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken) {
      try {
        this.token = jwtDecode(storedToken);

        if (this.token && this.token.authorities) {
          this.userAuthorities = new Set(this.token.authorities.map(String));
        } else {
          this.toastr.error("Não autorizado!");
        }
      } catch (e) {
        this.toastr.error("Erro de autorização!");
      }
    }
  }

  getUserInfo(): any {
    return this.token || null;
  }
  
  hasPermission(role: { descricao: string; id: number }): boolean {
    if (!this.userAuthorities || !role) {
      return false;
    }
    return this.userAuthorities.has(String(role.id));
  }

}

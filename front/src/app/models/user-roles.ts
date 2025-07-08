export enum UserPerfil {
  ADMIN = 'A',
  USER = 'U'
}

export interface UserTokenClaims {
  nome: string;
  sub: string;
  perfil: string;
  foto: string;
  authorities: string[];
  exp: number;
  iat: number;
}

export class UserAuthority {
  public static readonly VIEW_PRODUCTS = 'VIEW_PRODUCTS';
  public static readonly EDIT_PRODUCTS = 'EDIT_PRODUCTS';
  public static readonly VIEW_CADASTROS = 'VIEW_CADASTROS';
  public static readonly EDIT_CADASTROS = 'EDIT_CADASTROS';
  
  public static readonly DEFAULT_AUTHORITIES: Record<UserPerfil, string[]> = {
    [UserPerfil.ADMIN]: [
      UserAuthority.VIEW_PRODUCTS,
      UserAuthority.EDIT_PRODUCTS,
      UserAuthority.VIEW_CADASTROS,
      UserAuthority.EDIT_CADASTROS
    ],
    [UserPerfil.USER]: [
      UserAuthority.VIEW_PRODUCTS
    ]
  };
}

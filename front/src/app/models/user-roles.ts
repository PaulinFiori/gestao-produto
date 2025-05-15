/**
 * Tipos e interfaces relacionados a perfis de usuário e autoridades
 */

// Perfis disponíveis
export enum UserPerfil {
  ADMIN = 'A',
  USER = 'U'
}

// Interface das claims que esperamos no token JWT
export interface UserTokenClaims {
  sub: string;       // email do usuário (subject)
  perfil: string;    // A ou U
  authorities: string[];
  exp: number;       // Timestamp de expiração
  iat: number;       // Timestamp de criação
}

// Classe para verificação de autoridades e perfis
export class UserAuthority {
  // Constantes de autoridades disponíveis no sistema
  public static readonly VIEW_PRODUCTS = 'VIEW_PRODUCTS';
  public static readonly EDIT_PRODUCTS = 'EDIT_PRODUCTS';
  public static readonly VIEW_CADASTROS = 'VIEW_CADASTROS';
  public static readonly EDIT_CADASTROS = 'EDIT_CADASTROS';
  
  // Mapeamento entre perfis e autoridades padrão
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

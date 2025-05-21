package br.back.back.security;

import br.back.back.enums.Perfil;
import br.back.back.model.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class UsuarioSistema extends User {

    private static final long serialVersionUID = 1L;

    private Usuario usuario;
    private String token;

    public UsuarioSistema() {
        super(SecurityContextHolder.getContext().getAuthentication().getName(), "",
                SecurityContextHolder.getContext().getAuthentication().getAuthorities());
    }

    public UsuarioSistema(Usuario usuario, Collection<? extends GrantedAuthority> authorities) {
        super(String.valueOf(usuario.getEmail()), usuario.getSenha(), true, true, true, true, authorities);
        this.usuario = usuario;
    }

    public UsuarioSistema(Usuario usuario, String username, List<String> authorities) {
        super(username, "", mapToGrantedAuthorities(authorities));
        this.usuario = usuario;
    }

    public UsuarioSistema(Usuario usuario, String username, List<String> authorities, String token) {
        super(username, "", mapToGrantedAuthorities(authorities));
        this.usuario = usuario;
        this.token = token;
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<String> authorities) {
        return Optional.ofNullable(authorities).orElseGet(Collections::emptyList)
                .stream().map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());
    }

    public boolean isAdministrador() {
        return Perfil.ADMIN.getValue().equals(usuario.getPerfil());
    }

    public boolean isUsuario() {
        return Perfil.USUARIO.getValue().equals(usuario.getPerfil());
    }

    public Usuario getUsuario() {
        return this.usuario;
    }


}

package br.back.back.security;

import br.back.back.enums.Perfil;
import br.back.back.model.Usuario;
import br.back.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static br.back.back.security.Roles.ROLE_ADMIN;
import static br.back.back.security.Roles.ROLE_USUARIO;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

     @Autowired
     private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         Usuario usuario = usuarioRepository.findByEmail(username)
             .orElseThrow(() -> new UsernameNotFoundException("Usuario com email: " + username + " não existe"));

         return new UsuarioSistema(usuario, getPermissoes(usuario));
    }

    private Collection<? extends GrantedAuthority> getPermissoes(Usuario usuario) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        if (Perfil.ADMIN.getValue().equals(usuario.getPerfil())) {
            authorities.add(new SimpleGrantedAuthority(Roles.getRoleId(ROLE_ADMIN).toString()));
        } else if (Perfil.USUARIO.getValue().equals(usuario.getPerfil())) {
            authorities.add(new SimpleGrantedAuthority(Roles.getRoleId(ROLE_USUARIO).toString()));
        }

        return authorities;
    }

} 

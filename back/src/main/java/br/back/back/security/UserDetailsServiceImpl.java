package br.back.back.security;

import br.back.back.model.Usuario;
import br.back.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

     @Autowired
     private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         Usuario usuario = usuarioRepository.findByEmail(username)
             .orElseThrow(() -> new UsernameNotFoundException("Usuario com email: " + username + " não existe"));

         return new org.springframework.security.core.userdetails.User(
                 usuario.getEmail(),
                 usuario.getSenha(),
                 usuario.getAuthorities()
         );
    }
} 

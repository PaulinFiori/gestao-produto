package br.back.back.service;

import br.back.back.security.UsuarioSistema;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public abstract class BackService {

    public UsuarioSistema getCurrentUser() {
        try {
            return (UsuarioSistema) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch(Exception e) {
            return null;
        }
    }

}

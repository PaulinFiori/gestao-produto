package br.back.back.controller;

import br.back.back.model.Usuario;
import br.back.back.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarTipo(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);

        return usuario.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuarioAtualizado) {

        Optional<Usuario> usuarioOpt = usuarioService.atualizar(id, usuarioAtualizado);

        return usuarioOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

package br.back.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.back.back.model.Estado;
import br.back.back.service.EstadoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estados")
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @GetMapping
    public ResponseEntity<List<Estado>> listarEstados() {
        return ResponseEntity.ok(estadoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estado> buscarEstado(@PathVariable Long id) {
        Optional<Estado> estado = estadoService.buscarPorId(id);
        
        return estado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Estado> adicionarEstado(@RequestBody Estado estado) {
        Estado estadoSalvo = estadoService.salvar(estado);
        return ResponseEntity.status(HttpStatus.CREATED).body(estadoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estado> atualizarEstado(
            @PathVariable Long id, 
            @RequestBody Estado estadoAtualizado) {
        
        Optional<Estado> estadoOpt = estadoService.atualizar(id, estadoAtualizado);
        
        return estadoOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerEstado(@PathVariable Long id) {
        boolean removed = estadoService.remover(id);
        
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 
package br.back.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.back.back.model.Tipo;
import br.back.back.service.TipoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipos")
public class TipoController {

    @Autowired
    private TipoService tipoService;

    @GetMapping
    public ResponseEntity<List<Tipo>> listarTipos() {
        return ResponseEntity.ok(tipoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tipo> buscarTipo(@PathVariable Long id) {
        Optional<Tipo> tipo = tipoService.buscarPorId(id);
        
        return tipo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tipo> adicionarTipo(@RequestBody Tipo tipo) {
        Tipo tipoSalvo = tipoService.salvar(tipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tipo> atualizarTipo(
            @PathVariable Long id, 
            @RequestBody Tipo tipoAtualizado) {
        
        Optional<Tipo> tipoOpt = tipoService.atualizar(id, tipoAtualizado);
        
        return tipoOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerTipo(@PathVariable Long id) {
        boolean removed = tipoService.remover(id);
        
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 
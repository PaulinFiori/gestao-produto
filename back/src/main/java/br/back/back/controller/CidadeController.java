package br.back.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.back.back.model.Cidade;
import br.back.back.service.CidadeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cidades")
public class CidadeController {

    @Autowired
    private CidadeService cidadeService;

    @GetMapping
    public ResponseEntity<List<Cidade>> listarCidades() {
        return ResponseEntity.ok(cidadeService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cidade> buscarCidade(@PathVariable Long id) {
        Optional<Cidade> cidade = cidadeService.buscarPorId(id);
        
        return cidade.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cidade> adicionarCidade(@RequestBody Cidade cidade) {
        Cidade cidadeSalva = cidadeService.salvar(cidade);
        return ResponseEntity.status(HttpStatus.CREATED).body(cidadeSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cidade> atualizarCidade(
            @PathVariable Long id, 
            @RequestBody Cidade cidadeAtualizada) {
        
        Optional<Cidade> cidadeOpt = cidadeService.atualizar(id, cidadeAtualizada);
        
        return cidadeOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerCidade(@PathVariable Long id) {
        boolean removed = cidadeService.remover(id);
        
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

} 

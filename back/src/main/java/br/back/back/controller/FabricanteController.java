package br.back.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.back.back.model.Fabricante;
import br.back.back.service.FabricanteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fabricantes")
public class FabricanteController {

    @Autowired
    private FabricanteService fabricanteService;

    @GetMapping
    public ResponseEntity<List<Fabricante>> listarFabricantes() {
        return ResponseEntity.ok(fabricanteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fabricante> buscarFabricante(@PathVariable Long id) {
        Optional<Fabricante> fabricante = fabricanteService.buscarPorId(id);
        
        return fabricante.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Fabricante> adicionarFabricante(@RequestBody Fabricante fabricante) {
        Fabricante fabricanteSalvo = fabricanteService.salvar(fabricante);
        return ResponseEntity.status(HttpStatus.CREATED).body(fabricanteSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fabricante> atualizarFabricante(
            @PathVariable Long id, 
            @RequestBody Fabricante fabricanteAtualizado) {
        
        Optional<Fabricante> fabricanteOpt = fabricanteService.atualizar(id, fabricanteAtualizado);
        
        return fabricanteOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerFabricante(@PathVariable Long id) {
        boolean removed = fabricanteService.remover(id);
        
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 
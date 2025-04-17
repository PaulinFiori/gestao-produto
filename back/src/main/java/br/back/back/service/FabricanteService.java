package br.back.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.back.back.model.Fabricante;
import br.back.back.repository.FabricanteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FabricanteService {

    @Autowired
    private FabricanteRepository fabricanteRepository;

    public List<Fabricante> listarTodos() {
        return fabricanteRepository.findAll();
    }

    public Optional<Fabricante> buscarPorId(Long id) {
        return fabricanteRepository.findById(id);
    }

    public Fabricante salvar(Fabricante fabricante) {
        return fabricanteRepository.save(fabricante);
    }

    public Optional<Fabricante> atualizar(Long id, Fabricante fabricanteAtualizado) {
        Optional<Fabricante> fabricanteExistente = fabricanteRepository.findById(id);
        
        if (fabricanteExistente.isPresent()) {
            Fabricante fabricante = fabricanteExistente.get();
            fabricante.setNome(fabricanteAtualizado.getNome());
            return Optional.of(fabricanteRepository.save(fabricante));
        }
        
        return Optional.empty();
    }

    public boolean remover(Long id) {
        if (fabricanteRepository.existsById(id)) {
            fabricanteRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 
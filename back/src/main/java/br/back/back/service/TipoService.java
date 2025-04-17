package br.back.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.back.back.model.Tipo;
import br.back.back.repository.TipoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TipoService {

    @Autowired
    private TipoRepository tipoRepository;

    public List<Tipo> listarTodos() {
        return tipoRepository.findAll();
    }

    public Optional<Tipo> buscarPorId(Long id) {
        return tipoRepository.findById(id);
    }

    public Tipo salvar(Tipo tipo) {
        return tipoRepository.save(tipo);
    }

    public Optional<Tipo> atualizar(Long id, Tipo tipoAtualizado) {
        Optional<Tipo> tipoExistente = tipoRepository.findById(id);
        
        if (tipoExistente.isPresent()) {
            Tipo tipo = tipoExistente.get();
            tipo.setNome(tipoAtualizado.getNome());
            return Optional.of(tipoRepository.save(tipo));
        }
        
        return Optional.empty();
    }

    public boolean remover(Long id) {
        if (tipoRepository.existsById(id)) {
            tipoRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 
package br.back.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.back.back.model.Estado;
import br.back.back.repository.EstadoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

    public List<Estado> listarTodos() {
        return estadoRepository.findAll();
    }

    public Optional<Estado> buscarPorId(Long id) {
        return estadoRepository.findById(id);
    }

    public Estado salvar(Estado estado) {
        return estadoRepository.save(estado);
    }

    public Optional<Estado> atualizar(Long id, Estado estadoAtualizado) {
        Optional<Estado> estadoExistente = estadoRepository.findById(id);
        
        if (estadoExistente.isPresent()) {
            Estado estado = estadoExistente.get();
            estado.setNome(estadoAtualizado.getNome());
            estado.setAbreviacao(estadoAtualizado.getAbreviacao());
            return Optional.of(estadoRepository.save(estado));
        }
        
        return Optional.empty();
    }

    public boolean remover(Long id) {
        if (estadoRepository.existsById(id)) {
            estadoRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 
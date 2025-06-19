package br.back.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.back.back.model.Cidade;
import br.back.back.repository.CidadeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    public List<Cidade> listarTodos() {
        return cidadeRepository.findAll();
    }

    public Optional<Cidade> buscarPorId(Long id) {
        return cidadeRepository.findById(id);
    }

    public Cidade salvar(Cidade cidade) {
        return cidadeRepository.save(cidade);
    }

    public Optional<Cidade> atualizar(Long id, Cidade cidadeAtualizada) {
        Optional<Cidade> cidadeExistente = cidadeRepository.findById(id);
        
        if (cidadeExistente.isPresent()) {
            Cidade cidade = cidadeExistente.get();
            cidade.setNome(cidadeAtualizada.getNome());
            cidade.setEstado(cidadeAtualizada.getEstado());
            return Optional.of(cidadeRepository.save(cidade));
        }
        
        return Optional.empty();
    }

    public boolean remover(Long id) {
        if (cidadeRepository.existsById(id)) {
            cidadeRepository.deleteById(id);
            return true;
        }
        return false;
    }

} 

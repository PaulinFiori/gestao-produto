package br.back.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.back.back.model.Produto;
import br.back.back.repository.ProdutoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService extends BackService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional(readOnly = true)
    public List<Produto> listarTodos() {
        if (getCurrentUser().isUsuario()) {
            return produtoRepository.findAllByUsuarioId(getCurrentUser().getUsuario().getId());
        }

        return produtoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    @Transactional
    public Produto salvar(Produto produto) {
        produto.setUsuario(getCurrentUser().getUsuario());
        return produtoRepository.save(produto);
    }

    @Transactional
    public Optional<Produto> atualizar(Long id, Produto produtoAtualizado) {
        if (produtoRepository.existsById(id)) {
            produtoAtualizado.setId(id);
            return Optional.of(produtoRepository.save(produtoAtualizado));
        }
        return Optional.empty();
    }

    @Transactional
    public boolean remover(Long id) {
        if (produtoRepository.existsById(id)) {
            produtoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
} 

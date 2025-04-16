package br.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.back.back.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

} 
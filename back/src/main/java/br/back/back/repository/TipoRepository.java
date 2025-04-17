package br.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.back.back.model.Tipo;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {
} 
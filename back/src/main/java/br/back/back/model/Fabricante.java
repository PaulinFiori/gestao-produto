package br.back.back.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "fabricante")
public class Fabricante implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    
    @OneToMany(mappedBy = "fabricante", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("fabricante")
    private List<Produto> produtos;
    
    public Fabricante() {
    }
    
    public Fabricante(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public List<Produto> getProdutos() {
        return produtos;
    }
    
    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Fabricante fabricante = (Fabricante) o;
        
        return id != null ? id.equals(fabricante.id) : fabricante.id == null;
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Fabricante{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }
} 
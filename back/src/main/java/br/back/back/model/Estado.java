package br.back.back.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "estado")
public class Estado implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    
    @Column(name = "abreviacao", nullable = false, length = 4)
    private String abreviacao;

    @OneToMany(mappedBy = "estado")
    private List<Cidade> cidades;
    
    public Estado() {
    }
    
    public Estado(Long id, String nome, String abreviacao) {
        this.id = id;
        this.nome = nome;
        this.abreviacao = abreviacao;
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
    
    public String getAbreviacao() {
        return abreviacao;
    }
    
    public void setAbreviacao(String abreviacao) {
        this.abreviacao = abreviacao;
    }
    
    public List<Cidade> getCidades() {
        return cidades;
    }
    
    public void setCidades(List<Cidade> cidades) {
        this.cidades = cidades;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Estado estado = (Estado) o;
        
        return id != null ? id.equals(estado.id) : estado.id == null;
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Estado{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", abreviacao='" + abreviacao + '\'' +
                '}';
    }
} 
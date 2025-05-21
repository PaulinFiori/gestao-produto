package br.back.back.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "produto")
public class Produto implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    
    @Column(name = "valor", nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;
    
    @Column(name = "estoque", nullable = false)
    private Integer estoque;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id", nullable = false)
    @JsonIgnoreProperties({"produtos"})
    private Cidade cidade;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_id", nullable = false)
    @JsonIgnoreProperties({"produtos"})
    private Tipo tipo;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fabricante_id", nullable = false)
    @JsonIgnoreProperties({"produtos"})
    private Fabricante fabricante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"produtos"})
    private Usuario usuario;
    
    public Produto() {
    }
    
    public Produto(Long id, String nome, BigDecimal valor, Integer estoque, Cidade cidade, Tipo tipo, Fabricante fabricante) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.estoque = estoque;
        this.cidade = cidade;
        this.tipo = tipo;
        this.fabricante = fabricante;
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
    
    public BigDecimal getValor() {
        return valor;
    }
    
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    
    public Integer getEstoque() {
        return estoque;
    }
    
    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }
    
    public Cidade getCidade() {
        return cidade;
    }
    
    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }
    
    public Tipo getTipo() {
        return tipo;
    }
    
    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }
    
    public Fabricante getFabricante() {
        return fabricante;
    }
    
    public void setFabricante(Fabricante fabricante) {
        this.fabricante = fabricante;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Produto produto = (Produto) o;
        
        return id != null ? id.equals(produto.id) : produto.id == null;
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", valor=" + valor +
                ", estoque=" + estoque +
                ", tipo=" + tipo +
                ", cidade=" + cidade +
                ", fabricante=" + fabricante +
                '}';
    }
} 

package com.gestao.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "estado")
public class Estado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Size(max = 50, message = "O nome deve ter no máximo 50 caracteres")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "A abreviação é obrigatória")
    @Size(min = 2, max = 2, message = "A abreviação deve ter exatamente 2 caracteres")
    @Column(nullable = false, length = 2)
    private String abreviacao;

    @JsonManagedReference
    @OneToMany(mappedBy = "estado", cascade = CascadeType.ALL)
    private List<Cidade> cidades;
} 
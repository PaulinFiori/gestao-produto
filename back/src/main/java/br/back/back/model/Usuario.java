package br.back.back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "usuario")
@Getter
@Setter
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @JsonProperty("name")
    private String nome;
    
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonProperty("password")
    private String senha;
    
    @Column(length = 1)
    private String perfil = "U"; // U = Usuário comum, A = Admin
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "usuario_authorities", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "authority")
    private List<String> authorities = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public Collection<GrantedAuthority> getAuthorities() {
        if (authorities == null || authorities.isEmpty()) {
            // Se não houver authorities definidas, criar uma baseada no perfil
            SimpleGrantedAuthority authority;
            if ("A".equals(perfil)) {
                authority = new SimpleGrantedAuthority("ROLE_ADMIN");
            } else {
                authority = new SimpleGrantedAuthority("ROLE_USER");
            }
            return Collections.singletonList(authority);
        }
        
        // Converter a lista de strings em GrantedAuthority
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (String auth : authorities) {
            grantedAuthorities.add(new SimpleGrantedAuthority(auth));
        }
        return grantedAuthorities;
    }

    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }
    
    public void setSenha(String senha) {
        this.senha = senha;
    }
    
    public String getPerfil() {
        return perfil;
    }
    
    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }
    
    public List<String> getAuthoritiesList() {
        return authorities;
    }
    
    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }
} 

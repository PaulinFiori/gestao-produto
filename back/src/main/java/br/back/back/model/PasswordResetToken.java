package br.back.back.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
@Data
@NoArgsConstructor
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "expiry_date", nullable = false)
    private LocalDateTime expiryDate;

    @Column(name = "used", nullable = false)
    private boolean used = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public PasswordResetToken(Usuario usuario, String token) {
        this.usuario = usuario;
        this.token = token;
        this.createdAt = LocalDateTime.now();
        this.expiryDate = LocalDateTime.now().plusHours(24); // Token válido por 24 horas
        this.used = false;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryDate);
    }

    public boolean isValid() {
        return !used && !isExpired();
    }
}

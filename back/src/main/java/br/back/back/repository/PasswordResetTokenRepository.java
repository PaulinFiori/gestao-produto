package br.back.back.repository;

import br.back.back.model.PasswordResetToken;
import br.back.back.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    @Query("SELECT t FROM PasswordResetToken t WHERE t.token = :token AND t.used = false AND t.expiryDate > :now")
    Optional<PasswordResetToken> findValidToken(@Param("token") String token, @Param("now") LocalDateTime now);

    Optional<PasswordResetToken> findByToken(String token);

    @Query("SELECT t FROM PasswordResetToken t WHERE t.usuario = :usuario ORDER BY t.createdAt DESC")
    Optional<PasswordResetToken> findByUsuario(@Param("usuario") Usuario usuario);

    @Modifying
    @Transactional
    @Query("UPDATE PasswordResetToken t SET t.used = true WHERE t.usuario = :usuario AND t.used = false")
    void invalidateAllUserTokens(@Param("usuario") Usuario usuario);

    @Modifying
    @Transactional
    @Query("DELETE FROM PasswordResetToken t WHERE t.expiryDate < :now")
    void deleteExpiredTokens(@Param("now") LocalDateTime now);

    @Query("SELECT COUNT(t) > 0 FROM PasswordResetToken t WHERE t.usuario = :usuario AND t.used = false AND t.expiryDate > :now")
    boolean hasValidTokenForUser(@Param("usuario") Usuario usuario, @Param("now") LocalDateTime now);

}

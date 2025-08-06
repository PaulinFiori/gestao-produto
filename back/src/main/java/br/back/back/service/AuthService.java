package br.back.back.service;

import br.back.back.repository.UsuarioRepository;
import br.back.back.repository.PasswordResetTokenRepository;
import br.back.back.model.Usuario;
import br.back.back.model.PasswordResetToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private EmailService emailService;
    
    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileStorageService fileStorageService;

    public Usuario register(String nome, String email, String password, MultipartFile photo) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(password));

        if (photo != null && !photo.isEmpty()) {
            String fileName = fileStorageService.storeFile(photo);
            usuario.setFoto(fileName);
        }

        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void recoverPassword(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        if (usuario != null) {
            passwordResetTokenRepository.invalidateAllUserTokens(usuario);
            String resetToken = UUID.randomUUID().toString();
            
            PasswordResetToken passwordResetToken = new PasswordResetToken(usuario, resetToken);
            passwordResetTokenRepository.save(passwordResetToken);
            
            String resetLink = frontendUrl + "/auth/reset-password?token=" + resetToken;
            
            Map<String, Object> templateModel = new HashMap<>();
            templateModel.put("userName", usuario.getNome());
            templateModel.put("resetLink", resetLink);
            
            String subject = "Recuperação de Senha - Gestão de Produto";
            emailService.sendTemplateEmail(email, subject, "emails/recover-password.ftl", templateModel);
        }
    }

    public boolean isValidResetToken(String token) {
        Optional<PasswordResetToken> resetToken = passwordResetTokenRepository.findValidToken(token, LocalDateTime.now());
        return resetToken.isPresent() && resetToken.get().isValid();
    }

    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> resetTokenOpt = passwordResetTokenRepository.findValidToken(token, LocalDateTime.now());
        
        if (resetTokenOpt.isPresent()) {
            PasswordResetToken resetToken = resetTokenOpt.get();
            
            if (resetToken.isValid()) {
                Usuario usuario = resetToken.getUsuario();
                usuario.setSenha(passwordEncoder.encode(newPassword));
                usuarioRepository.save(usuario);
                
                resetToken.setUsed(true);
                passwordResetTokenRepository.save(resetToken);
                
                passwordResetTokenRepository.invalidateAllUserTokens(usuario);
                
                return true;
            }
        }
        
        return false;
    }

    public Optional<Usuario> getUserByResetToken(String token) {
        Optional<PasswordResetToken> resetToken = passwordResetTokenRepository.findValidToken(token, LocalDateTime.now());
        return resetToken.map(PasswordResetToken::getUsuario);
    }


    public void cleanupExpiredTokens() {
        passwordResetTokenRepository.deleteExpiredTokens(LocalDateTime.now());
    }

} 

package br.back.back.service;

import br.back.back.repository.UsuarioRepository;
import br.back.back.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
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

    public void recoverPassword(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        if (usuario != null) {
            // Gerar token único para recuperação
            String resetToken = UUID.randomUUID().toString();
            
            // TODO: Salvar token no banco com expiração (24h)
            // passwordResetTokenRepository.save(new PasswordResetToken(usuario, resetToken));
            
            // Criar link de recuperação
            String resetLink = frontendUrl + "/auth/reset-password?token=" + resetToken;
            
            // Preparar dados para o template
            Map<String, Object> templateModel = new HashMap<>();
            templateModel.put("userName", usuario.getNome());
            templateModel.put("resetLink", resetLink);
            
            // Enviar email com template
            String subject = "Recuperação de Senha - Gestão de Produto";
            emailService.sendTemplateEmail(email, subject, "emails/recover-password.ftl", templateModel);
        }
    }

} 

package br.back.back.service;

import br.back.back.repository.UsuarioRepository;
import br.back.back.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AuthService {

    @Autowired
    private EmailService emailService;

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
            String subject = "Recuperação de Senha";
            String text = "Olá,\n\nRecebemos uma solicitação para redefinir sua senha. Se foi você, clique no link abaixo ou copie e cole no navegador:\n\n<LINK_AQUI>\n\nSe não foi você, ignore este e-mail.";
            emailService.sendEmail(email, subject, text);
        }
    }

} 

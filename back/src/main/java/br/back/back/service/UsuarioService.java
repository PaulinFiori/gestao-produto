package br.back.back.service;

import br.back.back.model.Usuario;
import br.back.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileStorageService fileStorageService;

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> atualizar(Long id, Usuario usuarioAtualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);

        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());
            if(usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
                usuario.setSenha(passwordEncoder.encode(usuarioAtualizado.getSenha()));
            }

            if(usuarioAtualizado.getPerfil() != null && !usuarioAtualizado.getPerfil().isEmpty()) {
                usuario.setPerfil(usuarioAtualizado.getPerfil());
            }

            return Optional.of(usuarioRepository.save(usuario));
        }

        return Optional.empty();
    }

    public Optional<Usuario> atualizarComFoto(Long id, String name, String email, String password, MultipartFile foto) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);

        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNome(name);
            usuario.setEmail(email);

            if (password != null && !password.isEmpty()) {
                usuario.setSenha(passwordEncoder.encode(password));
            }

            if (foto != null && !foto.isEmpty()) {
                try {
                    String fileName = fileStorageService.storeFile(foto);

                    usuario.setFoto(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            return Optional.of(usuarioRepository.save(usuario));
        }

        return Optional.empty();
    }

    public Usuario salvar(Usuario usuario) {
        if(usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        }

        return usuarioRepository.save(usuario);
    }

    public boolean remover(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

}

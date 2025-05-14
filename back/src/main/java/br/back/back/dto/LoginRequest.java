package br.back.back.dto;

public record LoginRequest(String email, String senha) {
    public String email() {
        return email;
    }

    public String senha() {
        return senha;
    }
}

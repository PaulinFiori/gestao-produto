package br.back.back.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Perfil {

    ADMIN(Values.ADMIN),
    USUARIO(Values.USUARIO);

    private final String value;

    public static class Values {
        public static final String ADMIN = "A";
        public static final String USUARIO = "U";

        private Values() {
            //TODO
        }
    }

}

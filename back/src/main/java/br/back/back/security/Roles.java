package br.back.back.security;

import java.util.HashMap;
import java.util.Map;

public class Roles {

    static final String ROLE_ADMIN = "ROLE_ADMIN";
    static final String ROLE_USUARIO = "ROLE_USUARIO";

    private static final Map<String, Integer> roleIds = new HashMap<>();

    static {
        roleIds.put(ROLE_ADMIN, 990);
        roleIds.put(ROLE_USUARIO, 991);
    }

    public static Integer getRoleId(String roleName) {
        return roleIds.get(roleName);
    }

    public static String getRoleName(int id) {
        for (Map.Entry<String, Integer> entry : roleIds.entrySet()) {
            if (entry.getValue() == id) {
                return entry.getKey();
            }
        }
        throw new IllegalArgumentException("Role ID not found: " + id);
    }

    private Roles() {
        //TODO
    }

}

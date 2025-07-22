<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .title {
            color: #34495e;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 30px;
        }
        .btn {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .btn:hover {
            background-color: #2980b9;
        }
        .link-container {
            text-align: center;
            margin: 30px 0;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #7f8c8d;
            text-align: center;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Gestão de Produto</div>
            <h1 class="title">Recuperação de Senha</h1>
        </div>
        
        <div class="content">
            <p>Olá, <strong>${userName!"Usuário"}</strong>!</p>
            
            <p>Recebemos uma solicitação para redefinir a senha da sua conta. Se foi você quem fez essa solicitação, clique no botão abaixo para criar uma nova senha:</p>
            
            <div class="link-container">
                <a href="${resetLink}" class="btn">Redefinir Senha</a>
            </div>
            
            <p>Ou copie e cole o link abaixo no seu navegador:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">
                ${resetLink}
            </p>
            
            <div class="warning">
                <strong>⚠️ Importante:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Este link é válido por apenas <strong>24 horas</strong></li>
                    <li>Por segurança, o link só pode ser usado uma vez</li>
                    <li>Se você não solicitou esta recuperação, ignore este e-mail</li>
                </ul>
            </div>
            
            <p>Se você não conseguir clicar no botão, copie e cole o link completo no seu navegador.</p>
            
            <p>Se você não solicitou a redefinição de senha, pode ignorar este e-mail com segurança. Sua senha atual permanecerá inalterada.</p>
        </div>
        
        <div class="footer">
            <p>Este é um e-mail automático, não responda a esta mensagem.</p>
            <p>© ${.now?string("yyyy")} Gestão de Produto. Todos os direitos reservados.</p>
            <p>Se você tiver dúvidas, entre em contato conosco através do nosso suporte.</p>
        </div>
    </div>
</body>
</html>

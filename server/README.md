# Reduperação de senha

**RF**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**
- O link enviado por e-mail para recuperar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha (resetada);

# Atualização do perfil

**RF**
- O usuário deve poder atualizar seu perfil;

**RN**
- O usuário não pode alterar seu e-mail para um já existente;
- Para atualizar sua senha, o usuário deve informar a antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos;
- O prestador deve receber um notificação sempre que houver um novo agendamento;
- O prestador deve visualizar as notificações não lidas;

**RNF**
- A listagem de agendamento deve ser armazenada em cache;
- As notificações devem ser armazenada em MongoDB;
- As notificações devem ser enviadas em tempo real com SockerIO;

**RN**
- A notificação deve ter um status de lida e não lida;

# Agendamento de serviços

**RF**
- O usuário deve poder listar todos os prestadores de serviço;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador de serviço;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar uma hora;
- Os agendamentos devem estar disponíveis entre 8h da manhã as 17h;
- O usuário não pode agendar em um horário ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

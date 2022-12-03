# Full-Cycle-Rocks

## Resumo
Essa é uma solução simples que armazena nome num banco de dados MySql.
A solução é baseada em Nginx, NodeJS e MySQL.
Essa solução é um exercício do curso FullCycle que tem por objetivo avalidar o uso prático do Docker-compose na solução.

## Organização ténica
### Docker-compose.yaml
A solução possui um arquivo docker-compose.yaml como base para testar utilizar a solução.
É necessário, apenas, executar o comando docker-compose up para que tudo funcione.
Caso seja necessário fazer alterações, é possível que seja necessário fazer rebuild das imagens associadas à solução.
O arquivo docker-compose faz build de 3 diferentes imagens para que a solução seja possível: proxy (nginx), webapp (nodeJS) e database (mysql)
Os containers não expõe seus volumes, mas caso seja necessário, basta descomentar as linhas associadas ao tema no docker-compose.yaml.
Os container estão com isolamento de acesso, garantindo que a maquina de proxy reverso seja uma DMZ, não tendo qualquer acesso ao banco de dados, impedido pela infraestrutura de redes.

### Pasta ./database
Essa pasta possui um dockerfile que cria uma imagem mysql:8.0.31.
Ela é responsável por executar um script de startup que cria o database fullcycle e a tabela People

### Pasta ./proxy
Essa pasta possui um dockerfile que configura o Nginx para receber requisições e repassar para a maquina NodeJS.
Note que o Nginx nesse caso se atém a trabalhar como proxy-reverso.

### Pasta ./webapp
Essa pasta possui a parte mais inteligente da solução, com uma aplicação simples desenvolvida em NodeJS.
Note que a solução possui apenas um arquivo app.js como código para a solução.
Ela também possui um arquivo dockerfile que faz o trabalho de rodar o 'npm install' e o 'node app.js'

## Possíveis melhorias
A solução teve como objetivo ser simplificada.
Porém algumas melhorias podem ser identificadas, como:
- Exteriorização de configurações (como usuário de banco, senha)
- Configuração mais segura do MySQL, com senha mais forte, e com estrutura de cofres para armazenamento de itens de segurança
- Configuração mais dinâmica do default.conf para que não tenha amarras dele com o nome da aplicação principal, mas mantendo segurança
- Estruturação da solução node para ter uma camada service, utilização de um front desacoplado (com handlebars ou semelhantes) e uso de ORM (como o sequelize)
- Estruturação da solução node para não ter nenhum elemento de frontend, criando uma solução SPA com Angular, Vue ou React.

 
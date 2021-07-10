<h1 id="inicio" align="center">teste-node-prisma</h1 >
# Como funciona?

        O projeto é uma API para prover dados para um blog a documentacao das rotas se encontra em localhost:3333/api-docs

</a> <a href="#ferramentas">Ferramentas|</a> <a href="#prereq">Pré requisitos|</a>

<div id="ferramentas"> 
   <ul> 
        <li> Express</li>
        <li> Typescript </li>
        <li> prisma</li>
        <li> jest </jest>
        <li> postgres </li>
        <li> docker </li>
        <li> docker-compose </li>
        <li> Eslint </li>
        <li> Prettier </li>
   </ul>
</div>

# pre-requisitos

<div id="prereq"/>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
a instalacao do [Yarn](https://yarnpkg.com/) é recomendada mas não obrigatoria
Além disto é bom ter um editor para trabalhar com o código como o [VSCode](https://code.visualstudio.com/)

além disso existem dois arquivos que você deve criar para usar o projeto, os arquivos .env para rodar a aplicacao e .env.test para as configurações de test

na raiz do projeto existem os arquivos .env.test.example e .env.example onde é mostrado como deve as variaveis dentro do arquivo, caso deseje usar o docker-compose up para rodar o projeto nenhuma alteração precisa ser feita.

importante lembrar que para testar a aplicação e para rodar sem o docker é importante ter o posgresql rodando no docker ou na maquina e configurar os arquivos .env de acordo

### Rodando o projeto

Quando usamos o comando yarn seed ou npm run seed
temos um usuario padrão com os dados username: userseede e password_hash: senha
e alguns posts relacionados a esse usuario, use ele para fazer login na aplicação e testar as rotas que precisam de autenticação

```bash
# Clone este repositório
$ git clone https://github.com/carlos0406/teste-node-prisma

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-node-prisma
# rodando docker-compose para rodar o projeto
$ docker-compose up
# O servidor inciará na porta:3333 -como endereco base: <http://localhost:3333>
```

```bash
# Clone este repositório
$ git clone https://github.com/carlos0406/teste-node-prisma

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-node-prisma

# Instale as dependências
$ npm install ou yarn

# Copulando banco de dados
$ npm run seed ou yarn seed

# Execute a aplicação em modo de desenvolvimento
$ npm run dev ou yarn dev

# O servidor inciará na porta:3333 -como endereco base: <http://localhost:3333>
```

### Testando o projeto

```bash
    # Clone este repositório
$ git clone https://github.com/carlos0406/teste-node-prisma

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-node-prisma

# Instale as dependências
$ npm install ou yarn
# Execute os testes da aplicação
$ npm run test ou yarn test
```

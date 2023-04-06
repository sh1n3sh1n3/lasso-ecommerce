## Lasso E-commerce

### :computer: [Link do Projeto](https://lasso.herokuapp.com/)

#### Lasso é uma loja virtual full stack completa onde os usuários podem criar conta e fazer login, adicionar produtos ao carrinho, fazer compras, filtrar produtos por categoria, nome, marca, ver a lista de pedidos e etc. O projeto conta com uma dashboard Admin, onde a conta de adiminstrador selecionada pode adicionar novos produtos ao banco de dados, editar e remover produtos.

---

### :sparkles: Características
* Usuários podem criar conta, fazer login e recuperar a senha perdida
* Usuários podem adicinar produtos ao carrinho e alterar a quantidade de produtos desejada
* O Usuário pode ver a lista de pedidos, status do pedido, dar nota ao pedido e fazer uma avaliação
* Sistema de paginação automático
* Filtro de produtos por marca, relevância, nome, ordem, preço e etc.
* O administrador pode adicionar novos produtos pela dashboard, com upload de imagens para o armazenamento do Firebase
* O administrador pode ver a lista completa dos produtos, e atualizar o status do pedido.
* O administrador pode modificar os produtos como desejar, incluindo alterar a imagem, que remove a imagem antiga do banco de dados e substitui por outra nova, e remover produtos da lista.

### Principais Tecnologias
Nome | Descrição
:---: | :--- |
React | Maior framework JavaScript, criada pelo grupo Facebook
Firebase | Serviço de back end na nuvem da Google
Firestore | Serviço de banco de dados e armazenamento na nuvem da Google
Redux | Biblioteca para armazenamento global de estados de componentes JavaScript.
Stripe | Serviço de pagamentos online com uma API de pagamentos back end
Nodejs | Ambiente de execução para back end em JavaScript
Express | Uma das mais populares frameworks para Nodejs

### Outras tecnologias
Nome | Descrição
:---: | :--- |
EmailJS | Ferramenta para envio e recebimento de emails pelo front-end
Módulos Sass | Uma forma de escrever Sass que simplifica o código e ajuda da refatoração
Notiflix | Biblioteca de notificações em formato de 'popups'
React toastify | Biblioteca de caixa de notificações e informações

---

### Cartão de crédito para teste
O Stripe provê um cartão de crédito teste para comprar os produtos, que você pode usar para testar a função de checkout.

#### :heavy_check_mark: Para simular um pagamento válido, use o seguinte número de cartão:
#### Número do cartão: 4242 4242 4242 4242
Use uma data futura válida, como 12/34.

Use __qualquer__ CVC de três dígitos.

Use __qualquer valor__ nos outros campos do formulário.

![Captura de tela de 2023-04-06 02-29-57](https://user-images.githubusercontent.com/82607849/230403317-c15ad263-732c-4dd9-b773-6ba037e368cb.png)

:warning: Somente teste, o produto não será comprado de verdade.

#### :x: Para simular uma compra inválida (recusada) use o seguinte número de cartão:
#### Número do cartão: 4000 0000 0000 0002

---

### Como usar a Lasso no seu computador

Para ter uma cópia do site funcionando locamente no seu computador, siga esses passos simples:

__Passo 1:__

1. Faça um fork desse repositório e clone no seu computador, ou baixe o código em formato de zip e extraia.
2. Tenha instalado em seu sistema os requisitos globais de uso: Node e npm.
3. Abra a pasta do projeto com o terminal ou pelo vscode e execute o comando __npm i__ para instalar todas as dependências.

__Passo 2:__

1. Crie uma conta no serviço [Firebase](https://firebase.google.com/) da google e inicie um novo projeto para ter acesso ás chaves de acesso necessárias.
2. Inicie um serviço de Firestore pela sua conta da Firebase.

__Passo 3:__

1. Crie um arquivo chamado __.env__ na pasta principal do site, 'pasta root'.
2. Adicione o trecho de código substituindo '<sua-chave-aqui>' pelas respectivas chaves que foram passadas para você após a criação da conta do Firebase

```
REACT_APP_API_KEY=<sua-chave-aqui>
REACT_APP_APP_ID=<sua-chave-aqui>
REACT_APP_AUTH_DOMAIN=<sua-chave-aqui>
REACT_APP_MESSAGING_SENDER_ID=<sua-chave-aqui>
REACT_APP_PROJECT_ID=<sua-chave-aqui>
REACT_APP_STORAGE_BUCKET=<sua-chave-aqui>
```
Isso será o que vai te dar acesso á sua conta da Firebase e o serviço da Firestore.

__Passo 4:__

1. Crie uma conta de testes grátis no [Stripe](https://stripe.com/) para ter acesso ás chaves para o serviço de pagamento.
2. Na dashboard do Stripe, revele e copie as chaves 'publicável' e 'secreta'.
3. No seu arquivo .env criado no passo anterior, adicione o trecho de código abaixo substituindo '<sua-chave-aqui>' pelas respectivas chaves do Stripe.

```
REACT_APP_STRIPE_PUBLIC_KEY=<sua-chave-aqui>
REACT_APP_STRIPE_SECRET_KEY=<sua-chave-aqui>
```

__Passo 5:__

1. Para iniciar o servidor, digite __npm run start:server__ no seu terminal dentro da pasta do projeto.
2. Para iniciar o front end, digite __npm run start:front__, recomendo que inicie o servidor primeiro e espere o primeiro iniciar antes de iniciar o segundo.

---

### Conta de administrador / Dashboard

Para acessar a Dashboard de administrador crie uma conta no site normalmente com o email de sua escolha para ser o email do Admin, depois adicione mais uma linha de código no seu arquivo __.env__ substituindo <sua-conta-admin> pelo email que você criou.

```
REACT_APP_ADMIN_EMAIL=<sua-conta-admin>
```
  
Recomendo que use um email real para ter a funcionalidade de recuperação de senha
  
---
  
### Formulário de contato
  
O formulário de contato foi construído usando o EmailJS, um conjunto de ferramentas de envio e recebimento de emails que usa o front-end, sem a necessidade de um servidor.
Para começar, acesse o site do [EmailJS](https://www.emailjs.com/) e crie uma conta gratúita. Após isso siga os seguintes passos:

1. Na dashboard do EmailJS, clique em 'Add New Service', escolha o provedor de email de sua preferência e conecte, nesse caso, eu ultilizei o Gmail.
2. Anote a __Service ID__.

![Captura de tela de 2023-04-06 02-17-05](https://user-images.githubusercontent.com/82607849/230406064-200d431a-cee7-423f-98dd-ceeda64fe3ad.png)

3. Ainda na dashboard, vá até 'Email Templates', clique em 'Create New Template' e faça um modelo de email de sua preferencia, esse será o modelo que você irá receber com as informações que o cliente passar no formulário, as referências precisam ser iguais ao atributo __name='valor'__ dos inputs, vou deixar um exemplo de como eu fiz o meu abaixo:

![emailjs-template](https://user-images.githubusercontent.com/82607849/230408194-41fc15f8-3a68-411d-bf71-bd048f8f5f4c.png)

4. Após feito isso, anote o __Template ID__

![Captura de tela de 2023-04-06 02-17-45](https://user-images.githubusercontent.com/82607849/230409365-753708cf-111d-4727-89c1-58ab8dd0f6d5.png)
  
5. Agora a última chave que você vai precisar, vá no menu de navegação, clique no seu nome de usuário para entrar nas configurações, na aba 'General', anote sua __Public Key__.
  
![Captura de tela de 2023-04-06 02-18-30](https://user-images.githubusercontent.com/82607849/230410801-ac32a3bd-8540-45c7-b70b-a097712b74e0.png)
  
6. No seu arquivo .env, adicione o trecho de código abaixo substituindo '<sua-chave-aqui>' pelas respectivas chaves do EmailJS, na seguinte ordem: __Pública, Service e Template__.

```
REACT_APP_EMAILJS_PUBLIC_KEY=<sua-chave-aqui>
REACT_APP_EMAILJS_SERVICE_ID=<sua-chave-aqui>
REACT_APP_EMAILJS_TEMPLATE_ID=<sua-chave-aqui>
```

---
  
### :notebook: Licença

Criado e distribuído sob a licença __MIT__, veja LICENSE.txt para mais informações.
  
---

### :handshake: Contribuições

__Este é um projeto em construção!__

As contribuições são o que torna a comunidade de código aberto um lugar incrível para aprender, se inspirar e criar. Qualquer contribuições que você fizer são muito apreciadas.

Se você tiver uma sugestão para melhorar o projeto, faça um fork do repositório e crie uma solicitação pull. Você também pode simplesmente abrir uma issue com a tag "melhoria". Se puder, por favor, dê para dar uma estrela ao projeto! Obrigado.

---  
  
### Imagens

#### Slider de imagens
![lasso-0](https://user-images.githubusercontent.com/82607849/227737399-19b5edc4-b1c5-47c0-81e1-ba4cb83ad111.png)

#### Produtos
![lasso-1](https://user-images.githubusercontent.com/82607849/227737495-db26635e-9f81-45d9-9103-4f322118cbff.png)

#### Veja mais no link do projeto abaixo

### :computer: [Link do Projeto](https://lasso.herokuapp.com/)

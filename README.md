# 🛒 SiteDeVendas | E-commerce de Tecnologia (Front-end)

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento%20%2F%20WIP-yellow?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Java Spring Boot](https://img.shields.io/badge/Next_Step-Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

> **⚠️ AVISO DE STATUS: PROJETO EM CONSTRUÇÃO (WORK IN PROGRESS)**  
> Este repositório está em desenvolvimento ativo. A atual **Versão 2.0.0** foca na estruturação completa da interface (Front-end), design responsivo e simulação de regras de negócio. O projeto está sendo preparado para a integração futura com uma API real no back-end.

---

## 📌 Sobre o Projeto

O **SiteDeVendas** é uma loja virtual moderna e responsiva focada na venda de produtos de alta tecnologia, notebooks de alto rendimento, smartphones e periféricos. 

O projeto começou como uma estrutura simples de estudos de Git e evoluiu para uma aplicação de e-commerce completa, construída 100% com **HTML5, CSS3 e JavaScript Vanilla** (sem frameworks), seguindo boas práticas de modularização, semântica e código limpo.

---

## ✅ O que já está pronto? (v2.0.0)

- **Interface Gráfica Completa:** Layout moderno com tema escuro (*Dark Mode*), gradientes e efeitos visuais suaves.
- **Totalmente Responsivo:** Adaptado para Desktops, Tablets e Smartphones (com menu mobile interativo).
- **Catálogo Interativo:** Renderização dinâmica dos produtos via JavaScript (*Mock Service*).
- **Filtros e Busca:** Sistema de filtragem por categorias e barra de pesquisa em tempo real.
- **Carrinho de Compras Funcional:** Adição, remoção e cálculo de total persistidos localmente através do `LocalStorage`.
- **Animações de UI:** Efeitos de revelação ao rolar a página (*Scroll Reveal*) e botão para voltar ao topo.

---

## 🚧 Próximos Passos (Roadmap & Back-end)

O código front-end já foi arquitetado para facilitar a comunicação assíncrona. As próximas etapas do desenvolvimento focarão no back-end:

- [ ] **Desenvolvimento da API RESTful:** Construção do back-end utilizando **Java Spring Boot**.
- [ ] **Integração Front / Back:** Substituição do array estático de produtos (`script.js`) pelas requisições reais (`fetch / axios`) ao servidor.
- [ ] **Banco de Dados:** Modelagem e persistência de dados de produtos, estoque e usuários (JPA / Hibernate).
- [ ] **Autenticação:** Implementação de login e segurança de rotas com Spring Security e JWT.
- [ ] **Integração de Pagamentos:** Simulação de checkout e finalização de pedidos.

---

## 🛠️ Como testar o que já foi feito?

Como a fase atual é 100% front-end nativo, não é necessário instalar dependências complexas:

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

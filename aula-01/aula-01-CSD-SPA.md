
1 - Client Side Rendering (CSR)
    - Client side rendering e Single Page Applications.
    - Client side rendering o conteúdo é inserido por meio de JavaScript.
    - Single Page Applications é quanto possui uma unica html gerenciado por JavaScript.

    > usuario > html > solicitação infra > html > gerenciador JS > usuario

    - Vantagens de SPAs
        - Velocidade na navegação, não exige chamadas para um servidor.
        - Altamente perfomatica e interativas.
    - Desvantagens de SPAs
        - Alta carga de JS, depende do tamanho do arquivo do JS
        - SEO, search engine optimization, é o motor de busca do google, que busca nossa aplicação

    1.1 Data Fetching
        - é quando fazemos as requisições, logo apos o carregamento da página, temos que tomar cuidado em inserir como serve side as requisições iniciais para evitar carregamento excessivo do servidor com muitas requisições

2 - Server Side Rendering (SSR)
    - O html ja é gerado no servidor como conteúdo da página, e envia para o client.
    - Resolve o problema com SEO (motor de busca do google).
    - Menor carga de JavaScript carregado no cliente.
    - Utilização do hydration.

    2.1 Data Fetching
        - É quando fazemos as requisições no servidor e envia o html ja com a requisição em tela.

3 - Static Site Generation (SSG)
    - É usado para diminuir a carga de JS.
    - Menor carga de JavaScript carregado no cliente.
    - O HTML é gerado apenas uma vez, no momento da BUILD.
    - Ele resolve o problema com o motor do google, motores de busca, SEO.
    - Desvantagem é que o conteúdo fica desatualizado.
    - Não é adequada para aplicações dinâmicas.

4 - Incremental Static Regeneration (ISR)
    - É muito parecida com SSG, é gerado no momento da BUILD.
    - O HTML pode ser regenerado durante o ciclo de vida da aplicação.
    - Ele resolve o problema com o motor do google, motores de busca, SEO.
    - Menor carga de JavaScript carregado no cliente.
    - Desvantagem é que mesmo ele sendo regenerado ainda pode haver conteúdo desatualizado.
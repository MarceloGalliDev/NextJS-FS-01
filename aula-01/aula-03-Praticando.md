1 - Sistema de rotas do NextJS
    - Dentro da pasta app, qualquer pasta subjacente que dentro dela possuir um arquivo page.tsx, essa terá uma rota no next para acesso a esse componente.
    - Necessário exportar como default.

2 - Root Layout
    - Componente que será renderizado em todas as páginas.
    - Podemos criar um layout para cada pasta de rotas se mnecessário.
    - Para criar uma rota dinâmica criamos uma pasta dentre [] e o nome do parametro vai dentro, por exemplo [id], o params recebido é params.
    - Quando usamos o nome da pasta (), ele não se torna rota.
    - O uso de _ no inicio no nome da pasta, torna ela privada.

3 - Chamando APIS
    - Por convensão criamos uma pasta api e dentro dela uma pasta products, que são as apis destinadas ao products

4 - Caching
    - Todo FETCH com método GET ele tem caching por padrão.
    - Para mudar esse formato, precisamos inserir um segundo parametro no fetch cache = "no-cache".
    - Para incrementar o static generation, usamos um next: {revalidate: 5} = de 5 em 5 segundos vamos revalidar o cache.
    - Esse método de manusear o caching ele é a nível de componente.
    - Só é possível usar multiplos caching com server component, e usando fetch, com axios não funciona.
    - O caching

5 - Request Memorization
    - So podemos usar quando é um server component.
    - Só funciona se tivermos caching ativo.

6 - Forçando o refresh
    - Se nossa página receber algum parametro, ou usar cookies/ headers, ou fetch com no-store, ela vai gerar de forma On-Demand.
    - Para força o dinamismo da página quando é um static page, padrão do next, usamos o:
      - export const dynamic = "force-dynamic";

    - Podemos usar também o unstable-caching, vide documentação next.

7 - React Hook Form e Zod
    - Necessário criar o schema para fazer a validação com zod.
    - O react hook form já possui integração com zod e vice versa.

8 - Server Actions
    - Usamos server actions para criar assincronismo em nível de servidor.
    - Recomendações quando criamos um endpoint para somente solicitar dados como o GETm criamos em um data-access, quando usamos endpoint para gerenciar algum dado, como criar, deletar ou update, usamos o server actions 
    - Uma server action é tida como função, mas transformada como um rota http pelo next.js
    - 
    
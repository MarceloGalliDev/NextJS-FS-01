1 - Server Component
    - Usamos para resolver problemas com SSR.
    - Todos os componentes passaram pelo processo de hydration.
    - Podemos fazer o fetching de dados apenas para componentes que estão no início da árvore de componentes.

    - Não possuem estado nem interatividade, por exemplo useState ou onClick.
    - Permitem o uso de recursos acessíveis apenas pelo servidor.
    - Só podem ser usados juntamente com um framework.
    - Podemos usar em streaming.

2 - Client Component
    - Componentes que possuem interatividade e estados dinâmicos.
    - Ele passa pelo processo de hydration.
    - Necessário usar "use client" no topo da página.

3 - Definições em conjunto
    - Não tem como importar um server component dentro de um client component, porém o inverso é possível.
    - Para renderizar um server component dentro de um client component, é necessário passar como children.
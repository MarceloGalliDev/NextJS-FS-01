1 - Sistema de rotas do NextJS
    - Dentro da pasta app, qualquer pasta subjacente que dentro dela possuir um arquivo page.tsx, essa terá uma rota no next para acesso a esse componente.
    - Necessário exportar como default.

2 - Root Layout
    - Componente que será renderizado em todas as páginas.
    - Podemos criar um layout para cada pasta de rotas se mnecessário.
    - Para criar uma rota dinâmica criamos uma pasta dentre [] e o nome do parametro vai dentro, por exemplo [id], o params recebido é params.
    - Quando usamos o nome da pasta (), ele não se torna rota.
    - O uso de _ no inicio no nome da pasta, torna ela privada.
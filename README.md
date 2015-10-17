# Credifiesc Exporter Bookmarklet

## Intro
Um simples bookmarklet para ajudar você a exportar as suas transações da
Credifiesc (site CECRED cartões) para CSV, no formato requerido do software
You Need a Budget (YNAB).

[Acesse a página com o bookmarklet](http://credifiesc.sumone.com.br.s3-website-us-east-1.amazonaws.com/)

## Notas importantes

O YNAB trabalha com o conceito de que você deve controlar pagamentos parcelados
por competência e não por caixa, dessa forma o bookmarklet vai importar para
esse tipo de pagamento apenas a primeira entrada com o valor total. Pagamentos
subsequentes não serão registrados pelo bookmarklet.

Importamos os pagamentos do cartão de crédito como uma transação de Inflow no
cartão, conforme o próprio YNAB sugere. Você deve transformar essa transação
após a importação em uma transferência da conta corrente para o cartão de
crédito.

Optamos por não importar as transações com autorização pendente, então seu YNAB
pode ficar alguns dias para trás (geralmente 3 dias no máximo) para pagamentos
que "ainda não cairam". Isso ajuda a não importar lixo como transações do
paypal, uber e outros apps que fazem pequenos débitos e créditos de R$ 1,00 para
verificar se seu cartão de crédito é válido.

## Contribuindo

Fique a vontade pra fazer um pull request. Funcionalidades sugeridas são:

* Exportar para formato OFX (que já abre direto no YNAB)
* Exportar transações de débito
* Exportar transações do site da credifiesc (não do cartão de crédito)

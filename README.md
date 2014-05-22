mida-scraper
============

Banalissimo ma elegante scraper in javascript per le pagine del motore di ricerca interno dell'archivio dell'ANSA.

Il file js non va eseguito normalmente, includendolo in una pagina web, ma va copiato e incollato nella console del browser questo script che include lo scraper nella pagina del mida:

    var d=document,h=d.getElementsByTagName('head')[0],s=d.createElement('script');s.type='text/javascript';s.src='https://github.com/jenkin/mida-scraper/raw/master/mida-scraper.js';h.appendChild(s);

Per semplicità puoi usare questo bookmarklet: http://htmlpreview.github.io/?https://github.com/jenkin/mida-scraper/blob/master/bookmarklet.html.

Tutti i dettagli nel commento iniziale del file.

DISCLAIMER
==========

Non mi prendo alcuna responsabilità, né per eventuali problemi al client che esegue il codice,
né per l'eventuale uso scorretto e/o illegale dei dati ottenuti con l'uso di questo script.

Per usarlo bisogna avere un account per accedere all'archivio dell'ANSA, quindi si è già autorizzati a fare ricerche
e a usare i risultati di tali ricerche. Lo script automatizza solo il processo, non permette di fare nulla di più.

Ulteriori informazioni sull'uso e sull'accesso a MIDA sul sito ufficiale: https://mida.ansa.it.

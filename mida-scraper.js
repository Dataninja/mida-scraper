/*
  Questo codice va eseguito nella console di Chromium (o di un browser qualsiasi provvisto di console),
  relativa alla pagina https://mida.ansa.it/.
  
  Prima di tutto autenticarsi ed effettuare la ricerca voluta, controllando che nelle impostazioni di layout
  sia specificato "50 risultati per pagina" (è più rapido).
  
  Poi aprire la console, incollare il codice e modificare i parametri della prima riga:
  - n1 = numero della pagina da cui cominciare (di solito 1)
  - n1Max = numero di pagine totali + 1 (questo numero dipende dalla ricerca fatta)
  - n2Max = numero di risultati per pagina + 1 (come specificato nelle opzioni di layout)
  
  Quindi premere INVIO e attendere. Eventualmente dare il permesso alla pagina di aprire il pop-up.
  La finestra pop-up figlia può essere ridotta a icona, così come quella madre, ma entrambe devono rimanere aperte!
  
  Al termine dell'esecuzione il sorgente di tutte le pagine sarà memorizzato nella variabile s,
  che sarà stampata nella console (attenzione, potrebbe essere un sacco di roba!).
  
  Copiare e incollare in un editor di testo il contenuto della console
  (se è un sacco di roba, potrebbe essere necessario aspettare un po'!).
  
  That's all, folks!
*/

var n1 = 1, n1Max = 23, n2 = 1, n2Max = 51, t = 5000, s = "", url = "https://mida.ansa.it/";

var p = window.open(url);

var f1 = function() {
  if (n1 < n1Max) {
    p.viewPage(n1);
    setTimeout(function() {
      s = s + p.document.body.innerHTML;
      f2();
    }, t);
  } else {
    console.log(s);
  }
  n1++;
}

var f2 = function() {
  if (n2 < n2Max) {
    p.viewNews(n2);
    setTimeout(function() {
      s = s + p.document.body.innerHTML;
      p.gotogrid();
      setTimeout(f2, t);
    }, t);
  } else {
    n2 = 0;
    f1();
  }
  n2++;
}

setTimeout(f1, t);

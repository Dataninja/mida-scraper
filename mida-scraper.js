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
  (se è un sacco di roba, potrebbe essere necessario aspettare un po').
  
  That's all, folks!
*/

var url = "https://mida.ansa.it/";
var n1 = 1, n1Max = 21, n2 = 1, n2Max = 51, t = 1000;
var news = {
  title: {
    html: "", 
    csv: ""
  }, 
  body: {
    html: "", 
    csv: ""
  }
};

//console.log("Apro la prima pagina...");
var p = window.open(url);

var f11 = function() {
  //console.log("###f11");
  if (p.document.readyState === "complete") {
    //console.log("Memorizzo il titolo...");
    news.title.html += p.document.body.innerHTML;
    f2();
  } else {
    //console.log("Aspetto...");
    setTimeout(f11,t);
  }
}

var f1 = function() {
  //console.log("###f1");
  if (p.hasOwnProperty("viewPage") && p.document.readyState === "complete") {
    if (n1 < n1Max) {
      //console.log("Leggo l'elenco...");
      p.viewPage(n1);
      f11();
    } else {
      //console.log("Metto tutto insieme...");
      news.title.html = "<html><body>" + news.title.html + "</body></html>";
      news.body.html = "<html><body>" + news.body.html + "</body></html>";
      console.log("Finito! Digitare console.log(news.title.html) per la pagina html con l'elenco completo delle news scaricate e console.log(news.body.html) per la pagina con la lista vera e propria delle news. Su Chromium sotto Linux è possibile usare la funzione copy(news.title.html) e copy(news.body.html).");
    }
    n1++;
  } else {
    //console.log("Aspetto");
    setTimeout(f1,t);
  }
}

var f21 = function() {
  //console.log("###f21");
  if (p.hasOwnProperty("gotogrid") && p.document.readyState === "complete") {
    //console.log("Memorizzo il testo...");
    news.body.html += p.document.body.innerHTML;
    //console.log("Torno all'elenco...");
    p.gotogrid();
    f2();
  } else {
    //console.log("Aspetto");
    setTimeout(f21,t);
  }
}

var f2 = function() {
  //console.log("###f2");
  if (p.hasOwnProperty("viewNews") && p.document.readyState === "complete") {
    if (n2 < n2Max) {
      //console.log("Leggo il testo...");
      p.viewNews(n2);
      f21();
    } else {
      n2 = 0;
      f1();
    }
    n2++;
  } else {
    //console.log("Aspetto");
    setTimeout(f2,t);
  }
}

f1();


/*
  Questo codice va eseguito nella console di Chromium (o di un browser qualsiasi provvisto di console),
  relativa alla pagina https://mida.ansa.it/.
  
  Prima di tutto autenticarsi ed effettuare la ricerca voluta, controllando che nelle impostazioni di layout
  sia specificato "50 risultati per pagina" (è più rapido).
  
  Poi aprire la console e incollare il codice qui sotto.
  
  Quindi premere INVIO e attendere. Eventualmente dare il permesso alla pagina di aprire il pop-up.
  La finestra pop-up figlia può essere ridotta a icona, così come quella madre, ma entrambe devono rimanere aperte!
  
  Al termine dell'esecuzione il sorgente di tutte le pagine sarà memorizzato nella variabile s,
  che sarà stampata nella console (attenzione, potrebbe essere un sacco di roba!).
  
  Copiare e incollare in un editor di testo il contenuto della console
  (se è un sacco di roba, potrebbe essere necessario aspettare un po').
  
  That's all, folks!
*/

var url = "https://mida.ansa.it/";
var r = /su \d+\./m;
var n2 = 1, 
    n2Max = parseInt(r.exec(document.getElementById("td_page_risu").textContent)[0].replace("su ","").replace(".","")),
    t = 1000;
var news = {
  html: [], 
  csv: [],
  json: []
};

console.log("Scarico tutte le news tra "+n2+" e "+n2Max+" da "+url+"...");
var p = window.open(url);

var f21 = function() {
  //console.log("###f21");
  if (p.hasOwnProperty("gotogrid") && p.document.readyState === "complete") {
    console.log("Leggo la news "+n2+"...");
    news.html.push(p.document.body.innerHTML);
    news.json.push({
      id: n2,
      date: p.document.evaluate("//tr[@bgcolor='#F7F7F7']/td[1]/font/b",p.document, null, XPathResult.STRING_TYPE, null).stringValue,
      author: p.document.evaluate("//tr[@bgcolor='#F7F7F7']/td[2]/font/strong",p.document, null, XPathResult.STRING_TYPE, null).stringValue,
      category: p.document.evaluate("//tr[@bgcolor='#F7F7F7']/td[3]/font/b",p.document, null, XPathResult.STRING_TYPE, null).stringValue,
      title: p.document.evaluate("//strong/font",p.document, null, XPathResult.STRING_TYPE, null).stringValue,
      body: p.document.evaluate("//pre",p.document, null, XPathResult.STRING_TYPE, null).stringValue
    });
    //console.log("Torno all'elenco...");
    p.gotogrid();
    n2++;
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
      //console.log("Carico la news "+n2+"...");
      p.viewNews(n2);
      f21();
    } else {
      console.log("Finito! Digitare console.log(news.json) per la lista completa delle news in JSON. Su Chromium sotto Linux è possibile usare la funzione copy(JSON.stringify(news.json)).");
    }
  } else {
    //console.log("Aspetto");
    setTimeout(f2,t);
  }
}

f2();

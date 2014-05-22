/*
  Questo codice è stato testato solo nella console di Chromium Versione 34.0.1847.116 Ubuntu 14.04 aura (260972),
  relativa alla pagina https://mida.ansa.it/.
  
  Prima di tutto autenticarsi ed effettuare la ricerca voluta.
  
  Poi aprire la console e incollare il codice qui sotto:
    var d=document,h=d.getElementsByTagName('head')[0],s=d.createElement('script');s.type='text/javascript';s.src='https://github.com/jenkin/mida-scraper/raw/master/mida-scraper.js';h.appendChild(s);
  
  Quindi premere INVIO e attendere. Eventualmente dare il permesso alla pagina di aprire un pop-up.
  La finestra pop-up figlia può essere ridotta a icona, così come quella madre, ma entrambe devono rimanere aperte!
  
  Al termine dell'esecuzione il sorgente di tutte le pagine sarà memorizzato nella variabile news sotto forma di
  - un array di pagine html (news.html);
  - un array di oggetti (news.json con id,data,autore,categorie,titolo,testo);
  - un csv (news.csv con [TAB] come delimitatore).
  
  Per esportare i risultati (anche mentre lo script è in esecuzione) è possibile usare la funzione copy():
  - copy(news.csv) per il csv completo di intestazione;
  - copy(JSON.stringify(news.json)) per il json sotto forma di stringa.
  
  Se è un sacco di roba, potrebbe essere necessario aspettare un po'. Al termine si avrà tutto nella clipboard, 
  pronto per essere incollato in un file di testo o direttamente in un foglio di calcolo.
  
  That's all, folks!
*/

var url = "https://mida.ansa.it/";
var r = /su \d+\./m;
var n2 = n2 || 1, 
    n2Max = parseInt(r.exec(document.getElementById("td_page_risu").textContent)[0].replace("su ","").replace(".","")),
    t = 1000;
var news = {
  html: [], 
  csv: "id\tdate\tauthor\tcategory\ttitle\tbody\tempty\n",
  json: []
};

console.log("Scarico tutte le news tra "+n2+" e "+n2Max+" da "+url+"...");
var p = window.open(url);

var getNews = function(doc) {
  return {
    id: n2.toString(),
    date: doc.evaluate("//tr[@bgcolor='#F7F7F7']/td[1]/font/b",doc, null, XPathResult.STRING_TYPE, null).stringValue,
    author: doc.evaluate("//tr[@bgcolor='#F7F7F7']/td[2]/font/strong",doc, null, XPathResult.STRING_TYPE, null).stringValue,
    category: doc.evaluate("//tr[@bgcolor='#F7F7F7']/td[3]/font/b",doc, null, XPathResult.STRING_TYPE, null).stringValue,
    title: doc.evaluate("//strong/font",doc, null, XPathResult.STRING_TYPE, null).stringValue,
    body: doc.evaluate("//pre",doc, null, XPathResult.STRING_TYPE, null).stringValue
  };
};

var f21 = function() {
  //console.log("###f21");
  if (p.hasOwnProperty("gotogrid") && p.document.readyState === "complete") {
    console.log("Leggo la news "+n2+"...");
    var single = getNews(p.document);
    news.html.push(p.document.body.innerHTML);
    news.json.push(single);
    for (var k in single) {
      if (single.hasOwnProperty(k)) {
        //console.log(single[k]);
        news.csv += single[k].replace(/(\r\n|\n|\r|\t)/gm," ")+"\t";
      }
    }
    news.csv += "\n";
    //console.log("Torno all'elenco...");
    p.gotogrid();
    n2++;
    f2();
  } else {
    //console.log("Aspetto");
    setTimeout(f21,t);
  }
};

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
};

f2();

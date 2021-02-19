function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  
  window.onload = function () {
  
                  //---Función de realizar la búsqueda
                  function searchInText(word, html) {
  
                      //---Eliminar los spans
                      html = html.replace(/<span class="finded">(.*?)<\/span>/g, "$1");
  
                      //---Crear la expresión regular que buscará la palabra
                      var reg = new RegExp(word.replace(/[\[\]\(\)\{\}\.\-\?\*\+]/, "\\$&"), "gi");
                      var htmlreg = /<\/?(?:a|b|br|em|font|img|p|span|strong)[^>]*?\/?>/g;
  
                      //---Añadir los spans
                      var array;
                      var htmlarray;
                      var len = 0;
                      var sum = 0;
                      var pad = 28 + word.length;
  
                      while ((array = reg.exec(html)) != null) {
  
                          htmlarray = htmlreg.exec(html);
  
                          //---Verificar si la búsqueda coincide con una etiqueta html
                          if (htmlarray != null && htmlarray.index < array.index && htmlarray.index + htmlarray[0].length > array.index + word.length) {
  
                              reg.lastIndex = htmlarray.index + htmlarray[0].length;
  
                              continue;
  
                          }
  
                          len = array.index + word.length;
  
                          html = html.slice(0, array.index) + "<span class='finded'>" + html.slice(array.index, len) + "</span>" + html.slice(len, html.length);
  
                          reg.lastIndex += pad;
  
                          if (htmlarray != null)
                              htmlreg.lastIndex = reg.lastIndex;
  
                          sum++;
  
                      }
  
                      return {total: sum, html: html};
  
                  }
  
                  //---Al presionar el botón de buscar
                  document.getElementById("button").addEventListener("click", function () {
  
                      var search = document.getElementById("search").value;
  
                      if (search.length == 0)
                          return;
  
                      var props = searchInText(search, document.getElementById("content").innerHTML);
  
                      document.getElementById("results").innerHTML = (props.total > 0) ? "Veces encontradas: " + props.total : "No se ha encontrado";
  
                      if (props.total > 0)
                          document.getElementById("content").innerHTML = props.html;
  
                  });
  
              }
              
              

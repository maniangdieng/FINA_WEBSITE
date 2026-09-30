// Retire la directive « scroll to text fragment » (#:~:text=...) de l'URL
// avant que le navigateur ne cherche ce texte : sur une SPA, il n'existe pas
// encore au premier instant, et Chrome finit par sauter vers le pied de page.
// Fichier séparé (et non script inline) pour respecter la CSP.
(function () {
  var i = location.hash.indexOf(":~:");
  if (i !== -1) {
    history.replaceState(null, "", location.pathname + location.search + location.hash.slice(0, i));
  }
})();

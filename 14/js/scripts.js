// klasa
// dodawanie adresu
// zapis adresu do storage
// odczytywanie adresu
// sprawdzanie adresu

class URLShortener {
  constructor(url) {
    this.APILink = "https://rel.ink/api/links/";
    this.url = this.validateURL(url);

    if (this.url) {
      this.handleURL();
    } else {
      console.log("Zły adres");
    }
  }

  validateURL(url) {
    // URL Validation Pattern
    // Group 1 = Protocol
    // Group 2 - Hostname
    // Group 3 - Path
    const URLRegex = /^(?:(https?):\/\/)?(?:www\.)?([a-z0-9\-]+\.\w+\.?\w+)\/?([\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)?$/gi;

    const URLExec = URLRegex.exec(url);
    const { 1: protocol = "http", 2: hostname, 3: path } = { ...URLExec };

    return (
      URLExec &&
      `${protocol}://${hostname}${path === undefined ? "" : "/" + path}`
    );
  }

  useAPI(method) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, this.APILink, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    const p = new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        }
      };

      xhr.ontimeout = () => reject(new Error("Czas został przekroczony"));

      xhr.onerror = () => reject(new Error("Wystąpił błąd"));
    });

    xhr.send(
      JSON.stringify({
        url: this.url
      })
    );

    return p;
  }

  handleURL() {
    const existInLocalStorage = localStorage.getItem(this.url) ? true : false;

    if (!existInLocalStorage) {
      this.useAPI("POST")
        .then(({ hashid, created_at }) => {
          localStorage.setItem(
            this.url,
            JSON.stringify({ hashid, created_at })
          );
          URLShortener.displayLinks();
        })
        .catch(message => console.log(message));
    } else {
      console.log("Link juz jest w storage");
    }
  }

  static displayLinks() {
    const shortenLinkPrefix = "https://rel.ink/";

    Object.keys(localStorage)
      .sort((first, second) => {
        const firstDate = Date.parse(
          JSON.parse(localStorage.getItem(first)).created_at
        );

        const secondDate = Date.parse(
          JSON.parse(localStorage.getItem(second)).created_at
        );

        return secondDate - firstDate;
      })
      .forEach(url => {
        const data = JSON.parse(localStorage.getItem(url));

        console.table(url, shortenLinkPrefix + data.hashid, data.created_at);
      });
  }
}

/*
1. Po kliknięciu sprawdzamy adres
2. Jeżeli jest ok to skracamy
3. Zapisujemy do pamięci i wyświetlamy
*/

const form = document.querySelector(".form");
const urlInput = form.querySelector('[name="url"]');

//Display links on load
URLShortener.displayLinks();

form.addEventListener("submit", e => {
  e.preventDefault();

  new URLShortener(urlInput.value);
});

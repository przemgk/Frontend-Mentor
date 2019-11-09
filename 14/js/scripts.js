// klasa
// dodawanie adresu
// zapis adresu do storage
// odczytywanie adresu
// sprawdzanie adresu

class URLShortener {
  constructor(urlInput) {
    this.APILink = "https://rel.ink/api/links/";
    this.urlInput = urlInput;
    this.url = this.validateURL(this.urlInput.value);

    if (this.url) {
      this.handleURL();
    } else {
      this.handleForm().message("Please add a link");
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

    return URLExec && `${protocol}://${hostname}${path === undefined ? "" : "/" + path}`;
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
        .then(({ hashid }) => {
          localStorage.setItem(this.url, JSON.stringify({ hashid, created: new Date().toJSON() }));
          URLShortener.displayLinks();
          this.handleForm().clear();
        })
        .catch(message => console.log(message));
    } else {
      this.handleForm().message("You already shorten this link.", "info");
    }
  }

  static displayLinks() {
    const shortenLinkPrefix = "https://rel.ink/";
    const linksWrapper = document.querySelector(".links");
    linksWrapper.innerHTML = "";

    Object.keys(localStorage)
      .sort((first, second) => {
        const firstDate = new Date(JSON.parse(localStorage.getItem(first)).created);
        const secondDate = new Date(JSON.parse(localStorage.getItem(second)).created);

        return secondDate - firstDate;
      })
      .forEach(url => {
        const data = JSON.parse(localStorage.getItem(url));
        const linkItem = document.createElement("div");
        linkItem.classList.add("links__item");

        const linkFullURL = document.createElement("h3");
        linkFullURL.classList.add("links__full-url");
        linkFullURL.textContent = url;
        linkItem.appendChild(linkFullURL);

        const linkShortenedURL = document.createElement("a");
        linkShortenedURL.classList.add("links__shortened-url");
        linkShortenedURL.textContent = `${shortenLinkPrefix}${data.hashid}`;
        linkShortenedURL.setAttribute("href", `${shortenLinkPrefix}${data.hashid}`);
        linkShortenedURL.setAttribute("target", "_blank");
        linkShortenedURL.setAttribute("rel", "noopener noreferrer");
        linkItem.appendChild(linkShortenedURL);

        const linkButton = document.createElement("button");
        linkButton.classList.add("button", "button--primary", "button--small");
        linkButton.textContent = "Copy";
        linkItem.appendChild(linkButton);

        linksWrapper.appendChild(linkItem);
      });
  }

  handleForm() {
    const messageWrapper = document.querySelector(".message");
    const self = this;

    return {
      clear() {
        this.clearMessage();
        self.urlInput.value = "";
      },
      message(messageText, messageType = "error") {
        this.clearMessage();
        if (messageType === "error") {
          messageWrapper.classList.add("message--error");
          messageWrapper.textContent = messageText;
          self.urlInput.classList.add("form__input--error");
        } else if (messageType === "info") {
          messageWrapper.classList.add("message--info");
          messageWrapper.textContent = messageText;
        }
      },
      clearMessage() {
        messageWrapper.setAttribute("class", "message");
        self.urlInput.classList.remove("form__input--error");
      }
    };
  }

  static copyLink(element) {
    console.log(element);
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

  new URLShortener(urlInput);
});

const hamburgerButton = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");

hamburgerButton.addEventListener("click", () => {
  hamburgerButton.classList.toggle("hamburger--active");
  navigation.classList.toggle("navigation--active");
});

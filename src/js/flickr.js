customElements.define("my-flickr", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() { 
    return ["images"];
  }

  get images() {
    return JSON.parse(this.getAttribute("images"));
  }

  set images(v) {
    this.setAttribute("images", JSON.stringify(v));
  }

  async fetchImages(url) {
    const response = await fetch(url);
    const json = await response.json();
    this.images = json.photoset;
  }

  async connectedCallback() {
    var photoSet = this.attributes.photoset.value;
    await this.fetchImages(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=bf898196079b6aac87ed4d1845d68297&user_id=27083134@N08&photoset_id=${photoSet}&format=json&nojsoncallback=1`);
  }
  
  attributeChangedCallback() {
    this.render();
  }
    
  render() {
      this.shadowRoot.innerHTML = `
        <style>
          .flickr-gallery {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-width: 100rem;
          }
          
          .flickr-gallery figure {
            margin: 0;
          }
          .flickr-gallery figure img {
            max-width: 100%;
            height: auto;
          }
        </style>
        <div class="flickr-gallery">
          ${this.images.photo.map((img) => {
            return `<figure><img src="https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg"/ alt="${img.title}"></figure>`;
          }).join("")}
        </div>
    `;
  }
});
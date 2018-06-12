(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

		const unsplashRequest = new XMLHttpRequest();

		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.onload = addImage;
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID b9c6e5b5fbb73ce8950fed27fdfa04340ad221d16c600ea878c19aca3f257ed9');
		unsplashRequest.send();

		function addImage() {
		    let htmlContent = '';
		    const data = JSON.parse(this.responseText);

		    if(data && data.results && data.results[0]) {
		    const firstImage = data.results[0];
		    htmlContent = `<figure>
		    	<img src="${firstImage.urls.regular}" alt="${searchedForText}">
		    	<figcaption<${searchedForText} by ${firstImage.user.name}</figcaption>
		    </figure>`;
		} else {
			htmlContent = '<div class="error-no-image">No Images available</div>';
		}

		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    const articleRequest = new XMLHttpRequest();
	articleRequest.onload = addArticles;
	articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=54c2310b67e749888b5b87e5a32834f4`);
	articleRequest.send();

    function addArticles () {
    	let htmlContent = '';
    	const data = JSON.parse(this.responseText)

    	if (data.response && data.response.docs && data.response.docs.length > 1) {
    		htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
    			<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
    			<p>${article.snippet}</p>
    		</li>`
    	).join('') + '</ul>';
    } else {
    	htmlContent = '<div class="error-no-articles">No articles available</div>';
    }
    
    responseContainer.insertAdjacentHTML('beforeend', htmlContent); 	
	}
});

})();





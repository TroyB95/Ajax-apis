/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        function addImage(images) {
    		const firstImage = images.results[0];

		    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
		            <img src="${firstImage.urls.small}" alt="${searchedForText}">
		            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		        </figure>`
		    );
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
}
    });
})();

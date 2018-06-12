(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    		headers: {
        			Authorization: 'Client-ID b9c6e5b5fbb73ce8950fed27fdfa04340ad221d16c600ea878c19aca3f257ed9'
   			}
		}).then(response => response.json()) 
   		.then(addImage)
   		.catch(e => requestError(e, 'image'));

		fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=54c2310b67e749888b5b87e5a32834f4`)
			.then(response => response.json())
			.then(addArticle)
			.catch(e => requestError(e, 'articles'));


		function addImage(data) {
			let htmlContent = '';
			const firstImage = data.results[0];

			if(firstImage) {
				htmlContent = `<figure>
					<img src="${firstImage.urls.small}" alt="${searchedForText}">
					<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
				<figure>`;
			} else {
				htmlContent = "No image was returned for your search."
			}

			responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		}

		function requestError(e, part) {
			console.log(e);
			responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">
				Oh no! There was an error making a request for the ${part}.</>`);
		}

		function addArticle(story) {
			htmlContent = '';

				if (story.response && story.response.docs && story.response.docs.length > 1) {
	    			htmlContent = '<ul>' + story.response.docs.map(article => `<li class="article">
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

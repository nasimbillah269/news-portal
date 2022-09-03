const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json();
    displayCategory(data.data.news_category)

}

const displayCategory = (categorys) => {
    const categoriesContainer = document.getElementById('category-container ');
    categorys.forEach(category => {
        const categoryList = document.createElement('div');
        categoryList.innerHTML = `
       <div onclick="loadCategoryDetail('${category.category_id}')">
            <p>${category.category_name}</p>
       </div>
        `;
        categoriesContainer.appendChild(categoryList);

    })
}

const loadCategoryDetail = async (id) => {
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryDetail(data.data)
}

const displayCategoryDetail = (categorys) => {
    const categoryDetail = document.getElementById('category-detail');
    categoryDetail.textContent = '';

    const noDataFound = document.getElementById('no-data-found ');
    if (categorys.length === 0) {
        noDataFound.classList.remove('d-none')
        toggleSpinner(false)
    }
    else {
        noDataFound.classList.add('d-none')
        toggleSpinner(true)
    }

    categorys.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');
        categoryDiv.innerHTML = `
        <div onclick="loadNewsDetail('${category._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="row g-0 ">
            <div class="col-md-4 p-3">
                <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${category.title}</h5>
                    <p class="card-text">${category.details.slice(0, 300)}...</p>
                    <div class="d-flex">
                        <img src="${category.author.img}" class="img-fluid rounded-circle w-25 h-25 "  alt="...">
                         <h5 class="mt-5 ms-3">${category.author.name ? category.author.name : 'not found'}</h5>
                         <div class="mt-4 ms-5">
                            <p > <li class='fa'>&#xf06e;</li> ${category.total_view ? category.total_view : 'no data found'}</p>  
                         </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        categoryDetail.appendChild(categoryDiv)
        toggleSpinner(false)

    })
}

const toggleSpinner = isLoding => {
    const loaderSetion = document.getElementById('loader');
    if (isLoding) {
        loaderSetion.classList.remove('d-none');
    }
    else {
        loaderSetion.classList.add('d-none')
    }
}

const loadNewsDetail = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json()
    dispalyNewsDetail(data.data[0])


}

const dispalyNewsDetail = (news) => {
    console.log(news)
    const newsModalTeitle = document.getElementById('newsModalLabel');
    newsModalTeitle.innerText = news.title;
    const modalNewsDetail = document.getElementById('modalNewsDetail');
    modalNewsDetail.innerHTML = `
    <p><img src="${news.image_url}" class="img-fluid rounded-start" alt="..."></p>
    <p>Author Name: ${news.author ? news.author.name : 'no data found'}</p>
    <p>Published_date: ${news.author ? news.author.published_date : 'no data found'}</p>
    <p>News Details: ${news.details ? news.details : 'no data found'}</p>
    <p>User total view: ${news.total_view ? news.total_view : 'no data found'}</p>
    <p>Rating: ${news.rating ? news.rating.badge : 'no data found'}${news.rating ? news.rating.number : 'no data found'}</p>
    <p>Is Todays Pick: ${news.others_info ? news.others_info.is_todays_pick : 'no data found'}</p>
    <p>Is Trending: ${news.others_info ? news.others_info.is_trending : 'no data found'}</p>
    
    `;
}

loadNews()
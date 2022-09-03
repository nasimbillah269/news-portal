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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryDetail(data.data)
}

const displayCategoryDetail = (categorys) => {
    const categoryDetail = document.getElementById('category-detail');
    categoryDetail.textContent = '';
    categorys.forEach(category => {
        console.log(category)
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');
        categoryDiv.innerHTML = `
        <div onclick="loadNewsDetail('${category._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="row g-0 ">
            <div class="col-md-4 p-1">
                <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${category.title}</h5>
                    <p class="card-text">${category.details.slice(0, 300)}</p>
                    <div class="d-flex">
                        <img src="${category.author.img}" class="img-fluid rounded-circle w-25 h-25 "  alt="...">
                         <h5 class="mt-5 ms-4">${category.author.name ? category.author.name : 'not found'}</h5>
                        <p class="mt-5 ms-5"><i class="fa-duotone fa-eye"></i>${category.total_view ? category.total_view : 'no data found'}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        
        `;
        categoryDetail.appendChild(categoryDiv);

    })
}

const loadNewsDetail = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`

    console.log(url)

}

loadNews()
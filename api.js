const button = document.getElementById("button-addon2");
button.addEventListener('click', async () => {
    const inputField = document.getElementById("input-field");
    const inputValue = inputField.value;
    inputField.value = "";
    if (inputValue == "") {
        alert("Please write something in the search box")
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
        const res = await fetch(url);
        const data = await res.json();
        getMeal(data.meals);
    }
})


const getMeal = meals => {
    console.log(meals)
   
    const card = document.getElementById("card-id");
     card.textContent = "";
    meals.forEach(meal => {
        console.log(meal)
         const div = document.createElement("div");
         div.classList.add("col");
         div.innerHTML = `
            <div onclick="getMealId('${meal.idMeal}')" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            </div>
        </div>
    `;
        card.appendChild(div);
    });
}

const getMealId = async meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
    const res =await fetch(url);
    const data = await res.json();
    getMealsId(data.meals[0]);
}

const getMealsId = mealsID => {
    console.log(mealsID)

    const showDetail = document.getElementById("deails-show");
    showDetail.textContent = "";
    const div = document.createElement("div");
    div.innerHTML = `
     <img src="${mealsID.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body bg-white mb-5">
        <p class="card-text">${mealsID.strInstructions.slice(0, 100)}</p>
        <a class="btn btn-warning" href="${
          mealsID.strYoutube
        }">Go to youtube </a>
    </div>
    `;
    showDetail.appendChild(div);
}
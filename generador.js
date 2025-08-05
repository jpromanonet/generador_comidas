// Inicializar jsPDF
const { jsPDF } = window.jspdf;

document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-btn');
    const pdfBtn = document.getElementById('pdf-btn');
    const mealPlanContainer = document.getElementById('meal-plan');
    const shoppingListContainer = document.getElementById('shopping-list');

    // Base de datos de ingredientes por comida
    const ingredientsDatabase = {
        // Carnes
        "Costillitas de cerdo / Ribs": ["Costillitas de cerdo", "Salsa BBQ", "Sal", "Pimienta"],
        "Cerdo churrasco con miel con puré de papas": ["Lomo de cerdo", "Miel", "Mostaza", "Papas", "Leche", "Manteca"],
        "Matambre a la pizza con papas fritas": ["Matambre", "Salsa de tomate", "Queso mozzarella", "Orégano", "Papas", "Aceite"],
        "Lomo al stroganoff": ["Lomo", "Champignones", "Crema", "Cebolla", "Mostaza", "Brandy"],
        "Arrollado": ["Pechuga de pollo", "Jamón", "Queso", "Pan rallado", "Huevos"],
        "Chorizo con salsa a la cebolla": ["Chorizos", "Cebollas", "Vino blanco", "Caldo"],
        "Chorizo a la pomarola": ["Chorizos", "Salsa de tomate", "Cebolla", "Ajo"],
        "Salmón grillado con puré": ["Salmón", "Limón", "Eneldo", "Papas", "Leche", "Manteca"],

        // Comidas fáciles
        "Hamburguesa": ["Pan de hamburguesa", "Carne picada", "Queso cheddar", "Lechuga", "Tomate"],
        "Pizza": ["Masa de pizza", "Salsa de tomate", "Queso mozzarella", "Ingredientes varios"],
        "Panchos con papas pay": ["Panchos", "Pan", "Papas pay", "Salsas"],
        "Salchichas con puré de papas": ["Salchichas", "Papas", "Leche", "Manteca"],
        "Sándwich de milanesa": ["Pan", "Milanesa", "Lechuga", "Tomate", "Mayonesa"],
        "Choripán con salsas": ["Pan", "Chorizo", "Salsa criolla", "Chimichurri"],
        "Sándwich de bondiola": ["Pan", "Bondiola", "Queso", "Mostaza"],
        "Sándwich en baguette": ["Baguette", "Jamón", "Queso", "Lechuga", "Tomate"],
        "Omelette": ["Huevos", "Jamón", "Queso", "Cebolla", "Pimientos"],
        "Ensalada César": ["Lechuga", "Croutons", "Queso parmesano", "Salsa César", "Pollo"],
        "Rúcula con tomates cherry, jamón crudo y queso": ["Rúcula", "Tomates cherry", "Jamón crudo", "Queso"],
        "Ensalada con lentejas": ["Lentejas cocidas", "Tomate", "Cebolla", "Pimiento", "Aceite de oliva"],
        "Tortilla de papas de chorizo de cerdo": ["Huevos", "Papas", "Chorizo", "Cebolla"],
        "Yogurt": ["Yogurt"],
        "Gelatina": ["Gelatina", "Crema"],

        // Comidas medias
        "Pollo al champiñón con puré": ["Pollo", "Champignones", "Crema", "Papas", "Leche", "Manteca"],
        "Milanesas con puré de papa": ["Milanesas", "Pan rallado", "Huevos", "Papas", "Leche", "Manteca"],
        "Milanesas a la napolitana con puré de papas": ["Milanesas", "Jamón", "Queso", "Salsa de tomate", "Papas"],
        "Filet de merluza con puré": ["Merluza", "Limón", "Papas", "Leche", "Manteca"],
        "Tarta de atún y caballa": ["Masa", "Atún", "Caballa", "Cebolla", "Huevos", "Queso"],
        "Tarta de jamón y queso": ["Masa", "Jamón", "Queso", "Huevos", "Crema"],
        "Buñuelos de acelga / espinaca con mezcla de carne": ["Acelga/espinaca", "Carne picada", "Huevos", "Pan rallado"],
        "Coliflor y brócoli revuelto con pollo": ["Coliflor", "Brócoli", "Pollo", "Crema"],
        "Paty con puré": ["Patys", "Pan", "Papas", "Leche", "Manteca"],
        "Milanesa de berenjena napolitana con puré": ["Berenjena", "Pan rallado", "Huevos", "Salsa de tomate", "Queso", "Papas"],
        "Tallarines con manteca y queso": ["Tallarines", "Manteca", "Queso"],
        "Penne rigatte con manteca y queso": ["Penne", "Manteca", "Queso"],
        "Macaroni con queso y manteca": ["Macarrones", "Queso", "Manteca"],
        "Tallarines con crema y brócoli": ["Tallarines", "Crema", "Brócoli", "Queso"],
        "Tallarines con brócoli, pollo y jamón": ["Tallarines", "Brócoli", "Pollo", "Jamón", "Crema"],
        "Tacos (con guacamole)": ["Tortillas", "Carne", "Lechuga", "Tomate", "Queso", "Palta", "Limón"],
        "Tacos de pollo": ["Tortillas", "Pollo", "Lechuga", "Tomate", "Queso", "Crema"],
        "Shawarma": ["Pan árabe", "Carne", "Ensalada", "Salsa"],

        // Comidas difíciles
        "Empanadas (J&Q | Carne | Espinaca | Cebolla)": ["Masa", "Carne", "Cebolla", "Huevos", "Aceitunas", "Pasas"],
        "Pastel de papa": ["Carne picada", "Papas", "Huevos", "Aceitunas", "Pasas"],
        "Guiso de lentejas": ["Lentejas", "Panceta", "Cebolla", "Morrón", "Caldo"],
        "Estofado": ["Carne", "Cebolla", "Zanahoria", "Caldo", "Vino"],
        "Puchero": ["Carne", "Choclo", "Zapallo", "Zanahoria", "Papa"],
        "Ravioles en salsa de estofado": ["Ravioles", "Carne", "Cebolla", "Zanahoria", "Caldo"],
        "Ñoquis con salsa de estofado": ["Ñoquis", "Carne", "Cebolla", "Zanahoria", "Caldo"],
        "Tallarines en pesto": ["Tallarines", "Albahaca", "Ajo", "Piñones", "Queso parmesano"],
        "Sopa (arroz / verduras con carne)": ["Carne", "Arroz", "Zanahoria", "Zapallo", "Apio"],
        "Canelones (jamón y queso / carne / verdura y queso)": ["Pasta para canelones", "Ricotta", "Espinaca", "Carne picada", "Salsa"],
        "Risotto": ["Arroz arbóreo", "Caldo", "Queso parmesano", "Vino blanco", "Hongos"],
        "Calabaza y zapallo rellenos en rodajas con queso, jamón y cebolla": ["Calabaza", "Zapallo", "Queso", "Jamón", "Cebolla"],
        "Albóndigas en salsa con puré / arroz / papas": ["Carne picada", "Pan rallado", "Huevos", "Salsa", "Papas/arroz"],
        "Ravioles con bolognesa": ["Ravioles", "Carne picada", "Salsa de tomate", "Cebolla", "Zanahoria"],
        "Ravioles con pesto": ["Ravioles", "Albahaca", "Ajo", "Piñones", "Queso"],
        "Ñoquis con bolognesa": ["Ñoquis", "Carne picada", "Salsa de tomate", "Cebolla", "Zanahoria"],
        "Ñoquis con salsa 4 quesos": ["Ñoquis", "Queso mozzarella", "Queso parmesano", "Queso fontina", "Queso gorgonzola"],
        "Tallarines con bolognesa": ["Tallarines", "Carne picada", "Salsa de tomate", "Cebolla", "Zanahoria"],
        "Tallarines con 4 quesos": ["Tallarines", "Queso mozzarella", "Queso parmesano", "Queso fontina", "Queso gorgonzola"],
        "Tallarines con salsa pesto": ["Tallarines", "Albahaca", "Ajo", "Piñones", "Queso"],
        "Tallarines con albóndigas": ["Tallarines", "Carne picada", "Pan rallado", "Huevos", "Salsa"],
        "Tallarines con mollejas": ["Tallarines", "Mollejas", "Crema", "Hongos"],
        "Lasagna (J&Q | Carne)": ["Láminas de lasagna", "Carne picada", "Ricotta", "Salsa", "Queso"],

        // Postres
        "Mousse": ["Crema", "Chocolate", "Huevos", "Azúcar"],
        "Budín de pan (peras, nueces, almendras, caramelo, dulce, crema)": ["Pan", "Leche", "Huevos", "Azúcar", "Frutos secos"],
        "Flan": ["Huevos", "Leche", "Azúcar", "Caramelo"],
        "Lemon pie": ["Masa", "Limones", "Huevos", "Azúcar", "Crema"],
        "Budín": ["Harina", "Huevos", "Azúcar", "Levadura"],
        "Brownie": ["Chocolate", "Harina", "Huevos", "Azúcar", "Nueces"],
        "Bizcochuelo": ["Harina", "Huevos", "Azúcar", "Levadura"],
        "Arrollado dulce": ["Bizcochuelo", "Dulce de leche", "Crema"]
    };

    // Todas las comidas disponibles
    const allMeals = {
        grilled: [
            "Costillitas de cerdo / Ribs",
            "Cerdo churrasco con miel con puré de papas",
            "Matambre a la pizza con papas fritas",
            "Lomo al stroganoff",
            "Arrollado",
            "Chorizo con salsa a la cebolla",
            "Chorizo a la pomarola",
            "Salmón grillado con puré"
        ],

        easy: [
            "Hamburguesa",
            "Pizza",
            "Panchos con papas pay",
            "Salchichas con puré de papas",
            "Sándwich de milanesa",
            "Choripán con salsas",
            "Sándwich de bondiola",
            "Sándwich en baguette",
            "Omelette",
            "Ensalada César",
            "Rúcula con tomates cherry, jamón crudo y queso",
            "Ensalada con lentejas",
            "Tortilla de papas de chorizo de cerdo",
            "Yogurt",
            "Gelatina"
        ],

        medium: [
            "Pollo al champiñón con puré",
            "Milanesas con puré de papa",
            "Milanesas a la napolitana con puré de papas",
            "Filet de merluza con puré",
            "Tarta de atún y caballa",
            "Tarta de jamón y queso",
            "Buñuelos de acelga / espinaca con mezcla de carne",
            "Coliflor y brócoli revuelto con pollo",
            "Paty con puré",
            "Milanesa de berenjena napolitana con puré",
            "Tallarines con manteca y queso",
            "Penne rigatte con manteca y queso",
            "Macaroni con queso y manteca",
            "Tallarines con crema y brócoli",
            "Tallarines con brócoli, pollo y jamón",
            "Tacos (con guacamole)",
            "Tacos de pollo",
            "Shawarma"
        ],

        hard: [
            "Empanadas (J&Q | Carne | Espinaca | Cebolla)",
            "Pastel de papa",
            "Guiso de lentejas",
            "Estofado",
            "Puchero",
            "Ravioles en salsa de estofado",
            "Ñoquis con salsa de estofado",
            "Tallarines en pesto",
            "Sopa (arroz / verduras con carne)",
            "Canelones (jamón y queso / carne / verdura y queso)",
            "Risotto",
            "Calabaza y zapallo rellenos en rodajas con queso, jamón y cebolla",
            "Albóndigas en salsa con puré / arroz / papas",
            "Ravioles con bolognesa",
            "Ravioles con pesto",
            "Ñoquis con bolognesa",
            "Ñoquis con salsa 4 quesos",
            "Tallarines con bolognesa",
            "Tallarines con 4 quesos",
            "Tallarines con salsa pesto",
            "Tallarines con albóndigas",
            "Tallarines con mollejas",
            "Lasagna (J&Q | Carne)"
        ],

        mondayNight: [
            "Ñoquis con salsa de estofado",
            "Ravioles en salsa de estofado"
        ],

        desserts: [
            "Mousse",
            "Budín de pan (peras, nueces, almendras, caramelo, dulce, crema)",
            "Flan",
            "Lemon pie",
            "Budín",
            "Brownie",
            "Bizcochuelo",
            "Arrollado dulce"
        ]
    };

    let currentMealPlan = [];

    // Función para obtener un elemento aleatorio de un array y eliminarlo para evitar repeticiones
    function getRandomItem(array, usedMeals) {
        // Filtrar comidas ya usadas
        const availableMeals = array.filter(meal => !usedMeals.includes(meal));

        if (availableMeals.length === 0) {
            // Si no hay más comidas disponibles en esta categoría, permitir repetición
            console.warn('No hay más comidas disponibles en esta categoría, permitiendo repetición');
            return array[Math.floor(Math.random() * array.length)];
        }

        const randomIndex = Math.floor(Math.random() * availableMeals.length);
        const selectedMeal = availableMeals[randomIndex];

        return selectedMeal;
    }

    // Función para generar la lista de compras
    function generateShoppingList(meals) {
        const allIngredients = {};

        meals.forEach(meal => {
            if (ingredientsDatabase[meal.name]) {
                ingredientsDatabase[meal.name].forEach(ingredient => {
                    if (!allIngredients[ingredient]) {
                        allIngredients[ingredient] = 0;
                    }
                    allIngredients[ingredient]++;
                });
            }
        });

        // Organizar ingredientes por categorías
        const categories = {
            "Carnes y Pescados": [],
            "Lácteos y Huevos": [],
            "Frutas y Verduras": [],
            "Almacén": [],
            "Panadería": [],
            "Congelados": [],
            "Otros": []
        };

        // Clasificar ingredientes
        Object.keys(allIngredients).forEach(ingredient => {
            const lowerIng = ingredient.toLowerCase();

            if (lowerIng.includes("pollo") || lowerIng.includes("carne") || lowerIng.includes("cerdo") ||
                lowerIng.includes("pescado") || lowerIng.includes("salmon") || lowerIng.includes("merluza") ||
                lowerIng.includes("chorizo") || lowerIng.includes("matambre") || lowerIng.includes("bondiola") ||
                lowerIng.includes("mollejas") || lowerIng.includes("milanesa") || lowerIng.includes("atún") ||
                lowerIng.includes("caballa") || lowerIng.includes("panceta") || lowerIng.includes("lomo")) {
                categories["Carnes y Pescados"].push(ingredient);
            }
            else if (lowerIng.includes("queso") || lowerIng.includes("leche") || lowerIng.includes("crema") ||
                lowerIng.includes("yogurt") || lowerIng.includes("huevo") || lowerIng.includes("ricotta") ||
                lowerIng.includes("mozzarella") || lowerIng.includes("parmesano") || lowerIng.includes("manteca")) {
                categories["Lácteos y Huevos"].push(ingredient);
            }
            else if (lowerIng.includes("lechuga") || lowerIng.includes("tomate") || lowerIng.includes("cebolla") ||
                lowerIng.includes("zanahoria") || lowerIng.includes("papa") || lowerIng.includes("zapallo") ||
                lowerIng.includes("brócoli") || lowerIng.includes("coliflor") || lowerIng.includes("berenjena") ||
                lowerIng.includes("palta") || lowerIng.includes("limón") || lowerIng.includes("albahaca") ||
                lowerIng.includes("pera") || lowerIng.includes("rúcula") || lowerIng.includes("pimiento") ||
                lowerIng.includes("morrón") || lowerIng.includes("choclo") || lowerIng.includes("apio") ||
                lowerIng.includes("espinaca") || lowerIng.includes("acelga") || lowerIng.includes("calabaza") ||
                lowerIng.includes("hongos") || lowerIng.includes("champignon") || lowerIng.includes("albahaca")) {
                categories["Frutas y Verduras"].push(ingredient);
            }
            else if (lowerIng.includes("pan") || lowerIng.includes("baguette") || lowerIng.includes("tortilla") ||
                lowerIng.includes("taco") || lowerIng.includes("shawarma") || lowerIng.includes("croutons")) {
                categories["Panadería"].push(ingredient);
            }
            else if (lowerIng.includes("arroz") || lowerIng.includes("fideo") || lowerIng.includes("tallarines") ||
                lowerIng.includes("ravioles") || lowerIng.includes("ñoquis") || lowerIng.includes("lentejas") ||
                lowerIng.includes("harina") || lowerIng.includes("azúcar") || lowerIng.includes("sal") ||
                lowerIng.includes("aceite") || lowerIng.includes("vinagre") || lowerIng.includes("pimienta") ||
                lowerIng.includes("miel") || lowerIng.includes("mostaza") || lowerIng.includes("salsa") ||
                lowerIng.includes("caldo") || lowerIng.includes("vino") || lowerIng.includes("chocolate") ||
                lowerIng.includes("gelatina") || lowerIng.includes("dulce") || lowerIng.includes("masa") ||
                lowerIng.includes("pasas") || lowerIng.includes("aceitunas") || lowerIng.includes("piñones") ||
                lowerIng.includes("nueces") || lowerIng.includes("almendras") || lowerIng.includes("caramelo") ||
                lowerIng.includes("orégano") || lowerIng.includes("ajo") || lowerIng.includes("brandy") ||
                lowerIng.includes("levadura") || lowerIng.includes("pan rallado")) {
                categories["Almacén"].push(ingredient);
            }
            else if (lowerIng.includes("helado") || lowerIng.includes("congelado")) {
                categories["Congelados"].push(ingredient);
            }
            else {
                categories["Otros"].push(ingredient);
            }
        });

        // Ordenar alfabéticamente cada categoría
        Object.keys(categories).forEach(category => {
            categories[category].sort();
        });

        return categories;
    }

    // Función para mostrar la lista de compras
    function displayShoppingList(categories) {
    shoppingListContainer.innerHTML = '';
    
    Object.keys(categories).forEach(category => {
        if (categories[category].length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'shopping-category';
            
            const title = document.createElement('div');
            title.className = 'category-title';
            title.innerHTML = `<span class="icon">${getCategoryIcon(category)}</span><span>${category}</span>`;
            
            const list = document.createElement('ul');
            list.className = 'ingredients-list';
            
            categories[category].forEach(ingredient => {
                const item = document.createElement('li');
                item.className = 'ingredient-item';
                item.textContent = ingredient;
                list.appendChild(item);
            });
            
            categoryDiv.appendChild(title);
            categoryDiv.appendChild(list);
            shoppingListContainer.appendChild(categoryDiv);
        }
    });
}

    // Función para obtener iconos por categoría
    function getCategoryIcon(category) {
        switch (category) {
            case "Carnes y Pescados": return "🍖";
            case "Lácteos y Huevos": return "🥛";
            case "Frutas y Verduras": return "🥦";
            case "Almacén": return "🍚";
            case "Panadería": return "🍞";
            case "Congelados": return "❄️";
            default: return "🛒";
        }
    }

    // Función para generar el plan de comidas sin repeticiones
    function generateMealPlan() {
        mealPlanContainer.innerHTML = '';
        currentMealPlan = [];

        const days = [
            { name: "Lunes", weekend: false },
            { name: "Martes", weekend: false },
            { name: "Miércoles", weekend: false },
            { name: "Jueves", weekend: false },
            { name: "Viernes", weekend: false },
            { name: "Sábado", weekend: true },
            { name: "Domingo", weekend: true }
        ];

        const usedMeals = []; // Para rastrear las comidas ya usadas

        days.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.className = `day-card ${day.weekend ? 'weekend' : ''}`;

            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day.name;
            dayCard.appendChild(dayHeader);

            // Almuerzo
            const lunchMeal = document.createElement('div');
            lunchMeal.className = 'meal';

            const lunchTime = document.createElement('div');
            lunchTime.className = 'meal-time';
            lunchTime.innerHTML = `<span class="icon">🍽️</span><span>Almuerzo:</span>`;

            const lunchName = document.createElement('div');
            lunchName.className = 'meal-name';

            let lunchDish, lunchDifficulty;

            if (day.weekend) {
                // Fin de semana - carne asada
                lunchDish = getRandomItem(allMeals.grilled, usedMeals);
                lunchDifficulty = document.createElement('span');
                lunchDifficulty.className = 'difficulty grilled';
                lunchDifficulty.textContent = 'Asado';
            } else {
                // Día de semana - comida media o difícil
                const useHardMeal = Math.random() > 0.5; // 50% de probabilidad de comida difícil
                if (useHardMeal && allMeals.hard.length > 0) {
                    lunchDish = getRandomItem(allMeals.hard, usedMeals);
                    lunchDifficulty = document.createElement('span');
                    lunchDifficulty.className = 'difficulty hard';
                    lunchDifficulty.textContent = 'Difícil';
                } else {
                    lunchDish = getRandomItem(allMeals.medium, usedMeals);
                    lunchDifficulty = document.createElement('span');
                    lunchDifficulty.className = 'difficulty medium';
                    lunchDifficulty.textContent = 'Media';
                }
            }

            usedMeals.push(lunchDish);
            currentMealPlan.push({ name: lunchDish, day: day.name, time: 'Almuerzo' });
            lunchName.textContent = lunchDish;
            lunchTime.appendChild(lunchDifficulty);
            lunchMeal.appendChild(lunchTime);
            lunchMeal.appendChild(lunchName);

            // Cena
            const dinnerMeal = document.createElement('div');
            dinnerMeal.className = 'meal';

            const dinnerTime = document.createElement('div');
            dinnerTime.className = 'meal-time';
            dinnerTime.innerHTML = `<span class="icon">🌙</span><span>Cena:</span>`;

            const dinnerName = document.createElement('div');
            dinnerName.className = 'meal-name';

            let dinnerDish, dinnerDifficulty;

            if (day.name === "Lunes") {
                // Lunes por la noche siempre es ñoquis o ravioles con estofado
                dinnerDish = getRandomItem(allMeals.mondayNight, usedMeals);
                dinnerDifficulty = document.createElement('span');
                dinnerDifficulty.className = 'difficulty fixed-meal';
                dinnerDifficulty.textContent = 'Fijo';
            } else {
                // Otros días - comida fácil
                dinnerDish = getRandomItem(allMeals.easy, usedMeals);
                dinnerDifficulty = document.createElement('span');
                dinnerDifficulty.className = 'difficulty easy';
                dinnerDifficulty.textContent = 'Fácil';
            }

            usedMeals.push(dinnerDish);
            currentMealPlan.push({ name: dinnerDish, day: day.name, time: 'Cena' });
            dinnerName.textContent = dinnerDish;
            dinnerTime.appendChild(dinnerDifficulty);
            dinnerMeal.appendChild(dinnerTime);
            dinnerMeal.appendChild(dinnerName);

            // Postre (opcional, 50% de probabilidad)
            if (true) {
                const dessertMeal = document.createElement('div');
                dessertMeal.className = 'meal';

                const dessertTime = document.createElement('div');
                dessertTime.className = 'meal-time';
                dessertTime.innerHTML = `<span class="icon">🍰</span><span>Postre:</span>`;

                const dessertName = document.createElement('div');
                dessertName.className = 'meal-name';

                let dessertDish = getRandomItem(allMeals.desserts, usedMeals);
                usedMeals.push(dessertDish);
                currentMealPlan.push({ name: dessertDish, day: day.name, time: 'Postre' });
                dessertName.textContent = dessertDish;

                dessertMeal.appendChild(dessertTime);
                dessertMeal.appendChild(dessertName);
                dayCard.appendChild(dessertMeal);
            }

            dayCard.appendChild(lunchMeal);
            dayCard.appendChild(dinnerMeal);
            mealPlanContainer.appendChild(dayCard);
        });

        // Generar lista de compras
        const shoppingCategories = generateShoppingList(currentMealPlan);
        displayShoppingList(shoppingCategories);
    }

    // Función para generar PDF
    function generatePDF() {
        const doc = new jsPDF();

        // Título
        doc.setFontSize(20);
        doc.text("Plan de Comidas Semanal", 105, 15, { align: 'center' });

        // Fecha
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('es-ES', options);
        doc.setFontSize(12);
        doc.text(`Generado el: ${today}`, 105, 22, { align: 'center' });

        // Plan de comidas
        doc.setFontSize(14);
        doc.text("Menú Semanal", 14, 32);

        let y = 40;
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

        days.forEach(day => {
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(day, 14, y);
            doc.setFont(undefined, 'normal');

            const dayMeals = currentMealPlan.filter(meal => meal.day === day);

            dayMeals.forEach(meal => {
                y += 7;
                doc.text(`• ${meal.time}: ${meal.name}`, 20, y);
            });

            y += 10;

            // Nueva página si se llega al final
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        // Lista de compras
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Lista de Compras", 14, 20);

        const shoppingCategories = generateShoppingList(currentMealPlan);
        y = 30;

        Object.keys(shoppingCategories).forEach(category => {
            if (shoppingCategories[category].length > 0) {
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text(category, 14, y);
                doc.setFont(undefined, 'normal');
                
                shoppingCategories[category].forEach(ingredient => {
                    y += 7;
                    doc.text(`• ${ingredient}`, 20, y);
                    
                    if (y > 270) {
                        doc.addPage();
                        y = 20;
                    }
                });
                
                y += 10;
            }
        });

        // Guardar PDF
        doc.save('plan_comidas_semanal.pdf');
    }

    // Event listeners
    generateBtn.addEventListener('click', generateMealPlan);
    pdfBtn.addEventListener('click', generatePDF);

    // Generar un plan inicial al cargar la página
    generateMealPlan();
});
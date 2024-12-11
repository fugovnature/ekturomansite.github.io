// Vue.js приложение
new Vue({
    el: '#app',
    data: {
        // Данные для привязки
        isInfoVisible: false, // Видимость дополнительной информации
        userInput: '', // Поле для ввода данных
        pageTitle: 'Римская империя в начале первого века', // Заголовок страницы
        backgroundColors: ['#FFDDC1', '#D4E157', '#FFEB3B', '#03A9F4', '#AB47BC'], // Цвета фона
        quotes: [
            "«Великие дела никогда не совершались в спешке» — Октавиан Август",
            "«Кто владеет Римом — владеет миром» — древняя римская пословица",
            "«Ничто так не подрывает веру народа, как ложь власти» — Сенека",
            "«Хочешь мира — готовься к войне» — Вегетий"
        ],
        currentQuote: '' // Текущая цитата
    },
    methods: {
        // Смена фона
        changeBackground() {
            const randomIndex = Math.floor(Math.random() * this.backgroundColors.length);
            document.body.style.backgroundColor = this.backgroundColors[randomIndex];
        },
        // Показ случайной цитаты
        showRandomQuote() {
            const randomIndex = Math.floor(Math.random() * this.quotes.length);
            this.currentQuote = this.quotes[randomIndex];
        },
        // Скрытие/отображение информации
        toggleInfo() {
            this.isInfoVisible = !this.isInfoVisible;
        }
    },
    watch: {
        // Обновление заголовка страницы при изменении
        pageTitle(newTitle) {
            document.title = newTitle;
        }
    }
});



// Использование jQuery для других функций
$(document).ready(function () {
    // --- 1. Секция о дорогах ---
    // Изменение текста и стиля
    $('#change-road-fact-btn').click(function () {
        $('#road-fact').text('Общая длина римских дорог превышала 400 000 км, из которых 80 000 км были мощёными.');
        $('#road-fact').css({
            'color': 'darkgreen',
            'font-weight': 'bold',
            'background-color': '#f0f0f0',
            'padding': '10px',
            'border-radius': '5px'
        });
    });

    // --- 2. Секция об акведуках ---
    // Добавление нового факта в список
    $('#add-aqueduct-btn').click(function () {
        $('#aqueduct-list').append('<li>Акведук Aqua Claudia, построенный в 52 г. н.э.</li>');
    });

    // --- 3. Секция с армией ---
    // Скрытие и показ изображения армии
    $('#toggle-army-img-btn').click(function () {
        $('#army-image').fadeToggle(1000); // Плавный эффект
    });

    // --- 4. Поиск по таблице ---
    $('#building-search').on('keyup', function () {
        const value = $(this).val().toLowerCase(); // Получаем текст из поля
        $('#buildings-table tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1); // Фильтрация строк
        });
    });

    // --- 5. Сортировка таблицы ---
    $('#buildings-table th').click(function () {
        const table = $(this).parents('table');
        const rows = table.find('tbody > tr').toArray();
        const columnIndex = $(this).index();
        const isAscending = $(this).hasClass('asc'); // Проверяем текущий порядок сортировки

        rows.sort((a, b) => {
            const aText = $(a).children('td').eq(columnIndex).text().toLowerCase();
            const bText = $(b).children('td').eq(columnIndex).text().toLowerCase();

            return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });

        // Обновляем порядок строк
        $(this).toggleClass('asc', !isAscending).toggleClass('desc', isAscending);
        table.find('tbody').append(rows);
    });

    // --- 6. Слайдер культурных достижений ---
    $('#roman-culture-slider .owl-carousel').owlCarousel({
        loop: true, // Бесконечный цикл
        margin: 10, // Отступ между слайдами
        nav: true, // Показывать кнопки навигации
        dots: true, // Показывать индикаторы
        autoplay: true, // Автоматическое пролистывание
        autoplayTimeout: 3000, // Время между сменой слайдов
        responsive: {
            0: { items: 1 },  // 1 элемент на маленьких экранах
            600: { items: 2 }, // 2 элемента на средних экранах
            1000: { items: 3 } // 3 элемента на больших экранах
        }
    });
});

// Чистый JS для функций, которые не относятся к Vue или jQuery
document.addEventListener("DOMContentLoaded", function () {
    // --- Добавление нового раздела об архитектуре ---
    document.getElementById("add-section-btn").addEventListener("click", function () {
        var newSection = document.createElement('section');
        newSection.innerHTML = `
            <hr>
            <section id="architecture">
                <h2>Римская архитектура</h2>
                <p>Римская архитектура — одна из самых значительных в мире. Римляне построили множество величественных сооружений, таких как Колизей, Пантеон и Форум.</p>
                <p>Они использовали арки, купола и бетон, чтобы создавать долговечные конструкции.</p>
            </section>
        `;
        document.body.appendChild(newSection);
    });

    // --- Сортировка списка императоров ---
    document.getElementById("sortButton").addEventListener("click", function () {
        var list = document.getElementById("emperorsList");
        var items = Array.from(list.getElementsByTagName("li"));

        items.sort(function (a, b) {
            return a.innerHTML.localeCompare(b.innerHTML);
        });

        list.innerHTML = ""; // Очистка текущего списка

        items.forEach(function (item) {
            list.appendChild(item);
        });
    });

    // --- Сортировка таблицы (чистый JS) ---
    function sortTable(columnIndex, tableId) {
        var table = document.getElementById(tableId);
        var rows = Array.from(table.rows).slice(1);
        var ascending = true;

        rows.sort(function (a, b) {
            var cellA = a.cells[columnIndex].innerText.toLowerCase();
            var cellB = b.cells[columnIndex].innerText.toLowerCase();

            if (cellA > cellB) return ascending ? 1 : -1;
            if (cellA < cellB) return ascending ? -1 : 1;
            return 0;
        });

        rows.forEach(function (row) {
            table.appendChild(row);
        });
    }
});

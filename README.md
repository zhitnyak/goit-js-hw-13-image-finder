**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Критерии приема

- Созданы репозитории `goit-js-hw-13-image-finder`.
- При сдаче домашней работы есть две ссылки для каждого проекта: на исходные файлы и рабочую
  страницу на GitHub pages.
- При посещении рабочей страницы (GitHub pages) задания, в консоли нету ошибок и предупреждений
- Имена переменных и функций понятные, описательные
- Проект собран с помощью
  [parcel-project-template](https://github.com/goitacademy/parcel-project-template)
- Код отформатирован с помощью `Prettier`
- Добавь минимальную стилизацию
- Есть файл `apiService.js` с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API

## Задание - поиск изображений

Напиши небольшое приложение поиска и просмотра изображений по ключевому слову

## Инструкции Pixabay API

Для HTTP-запросов используй публичный [Pixabay API](https://pixabay.com/api/docs/). Зарегистрируйся
и получи ключ.

Pixabay API поддерживает пагинацию, пусть в ответе приходит по 12 объектов, установлено в параметре
`per_page`. По умолчанию параметр `page` равен `1`.

## Форма поиска

Создает DOM-элемент следующей структуры. Можно использовать шаблонизацию.

```html
<form class="search-form" id="search-form">
  <input type="text" name="query" autocomplete="off" placeholder="Search images..." />
</form>
```

## Галерея изображений

Создает DOM-элемент следующей структуры.

```html
<ul class="gallery">
  <!-- Список <li> с карточками изображений -->
</ul>
```

## Карточка изображения

Создает DOM-элемент следующей структуры.

```html
<div class="photo-card">
  <img src="" alt="" />

  <div class="stats">
    <p class="stats-item">
      <i class="material-icons">thumb_up</i>
      1108
    </p>
    <p class="stats-item">
      <i class="material-icons">visibility</i>
      320321
    </p>
    <p class="stats-item">
      <i class="material-icons">comment</i>
      129
    </p>
    <p class="stats-item">
      <i class="material-icons">cloud_download</i>
      176019
    </p>
  </div>
</div>
```

Для иконок используются [Material icons](https://google.github.io/material-design-icons/).

## Кнопка 'Load more'

При нажатии на кнопку `Load more` должна догружаться следующая порция изображений и рендериться
вместе с предыдущими.

## Дополнительно

- Можно добавить плагин нотификаций и показывать нотификации на результат HTTP-запросов
- Можно добавить функционал отображения большой версии изображения через плагин модального окна,
  например [basicLightbox](https://basiclightbox.electerious.com/), при клике на изображение галереи
- Вместо кнопки `Load more` можно сделать бесконечную загрузку при скроле используя
  `Intersection Observer`.

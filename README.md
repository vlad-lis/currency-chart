# Currency chart

Проект выложен по адресу: https://vlad-lis.github.io/currency-chart/

## Запросы к API

- Использован API https://github.com/fawazahmed0/exchange-api
- Для сокращения количества запросов к API данные сохраняются в session storage (там же сохраняется счетчик запросов)
- API возвращает данные не ранее 2 марта 2024 г., иначе возвращает 404 (ошибка выводится в консоль)
- Так как API не возвращает данные до 2 марта 2024 г., запросы при изменении фильтров на более ранние даты намеренно проходят повторно (для демонстрации) и увеличивают счетчик
- Запросы со 2 марта 2024 г. до текущей даты осуществляются один раз. При изменении фильтров дат/валют в этом периоде данные берутся из session storage, новые запросы не уходят

## Запуск проекта локально

1. Клонировать репозиторий:

```
git clone git@github.com:vlad-lis/posts.git
```

2. Установить зависимости из корневой папки:

```
npm i
```

3. Запустить проект:

```
npm run start
```

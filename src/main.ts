import './scss/styles.scss';

import {API_URL} from './utils/constants.ts';
import {apiProducts} from './utils/data.ts';

import {Api} from './components/base/Api.ts';

import {Catalog} from './components/models/Catalog.ts';
import {Cart} from './components/models/Cart.ts';
import {Buyer} from './components/models/Buyer.ts';

import {Communication} from './components/service/Communication.ts';

// Тестирование Catalog, получение массива товаров
const catalog = new Catalog();
catalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', catalog.getItems());

// Получение элемента по его id
const element = catalog.getItem(apiProducts.items[2].id);
console.log('Полученный элемент: ', element);

// Сохранение товара
catalog.setPreview(apiProducts.items[0]);

// Получение сохраненного товара для подробного отображения
console.log('Сохраненный товар: ', catalog.getPreview());

// Тестирование Cart
const cart = new Cart();

//Добавление всех товаров в корзину
apiProducts.items.forEach(item => {
  cart.addItem(item)
});

// Удаление товара
cart.deleteItem(apiProducts.items[1]);

// Получение массива товаров
console.log('Массив товаров в корзине: ', cart.getItems());

// Получение общей стоимости
console.log('Стоимость всех товаров: ', cart.getTotalPrice());

// Получение общего количества товаров
console.log('Количество товаров в корзине: ', cart.getTotalAmount());

// Проверка наличия товара в корзине по его id
console.log('Товар доступен? ', cart.isAvailable(apiProducts.items[1].id)) // false (товар был ранее удален)

// Очистка корзины
cart.clear();
console.log(cart.getItems()); // {} (возвращает пустой массив)

// Тестирование Buyer
const buyer = new Buyer();

// Проверка начального состояния
console.log('Данные до заполнения:', buyer.getData()); // { payment: '', email: '', phone: '', address: '' } (данные не введены)

// Сохранение данных покупателя
buyer.setPayment('card');
buyer.setEmail('test@test.ru');
buyer.setPhone('+71234567890');
buyer.setAddress('Санкт-Петербург, пр. Энгельса, 73');

// Данные покупателя после заполнения
console.log('После заполнения:', buyer.getData());

// Валидация данных покупателя
const validationErrors = buyer.validation();
console.log('Ошибки валидации:', validationErrors); // {} (возвращает пустой объект)

// Очистка
buyer.clear();
console.log('После очистки:', buyer.getData()); // {}

// Проверка ошибок валидации
const anotherBuyer = new Buyer();

// Если данные не введены
console.log('Ошибка: данные не введены):', anotherBuyer.validation()); // { payment: 'Не выбран способ оплаты', address: 'Введите адрес доставки',  email: 'Введите email', phone: 'Введите телефон' }

// Если данные введены не полностью
anotherBuyer.setPayment('cash');
anotherBuyer.setAddress('Хабаровск, ул. Ленина, 27');
console.log('Ошибка: email и phone не введены):', anotherBuyer.validation()); // { email: 'Введите email', phone: 'Введите телефон' }

// Тестирование запроса к серверу
const api = new Api(API_URL); 
const communication = new Communication(api);
const loadCatalog = new Catalog();

communication.getCatalog()
  .then(products => {
    loadCatalog.setItems(products);
    console.log('Товары загружены:', loadCatalog.getItems());
  })
  .catch(error => {
    console.error('Ошибка загрузки:', error);
  });
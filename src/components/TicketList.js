import React, { useState } from 'react';
import Ticket from './Ticket';
import ticketsData from '../tickets.json';
import '../styles/style_ticket.css';

const logoPath = require('../assets/logo.png');

const TicketList = () => {
    const [stopsFilter, setStopsFilter] = useState([]);
    const [currency, setCurrency] = useState('RUB'); // Переменная для хранения выбранной валюты
    const [exchangeRate] = useState({ USD: 92, EUR: 98 }); // Статичные курсы валют

    // const [selectAll, setSelectAll] = useState(false);

    // Функция обработки изменений фильтра
    const handleFilterChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (stopsFilter.includes(value)) {
            setStopsFilter(stopsFilter.filter((stop) => stop !== value));
        } else {
            setStopsFilter([...stopsFilter, value]);
        }
    };

    // Функция пересчёта стоимости билетов. Тут может быть подставлено API с биржи
    const convertPrice = (price, currency, exchangeRate) => {
        if (currency === 'USD') {
            return (price / exchangeRate.USD).toFixed(2); // Округляем
        } else if (currency === 'EUR') {
            return (price / exchangeRate.EUR).toFixed(2);
        } else {
            return price; // Если рубли, цена не меняется
        }
    };

    // Функция обработки изменения валюты
    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency); // Обновляем валюту
    };

    // Функция обработки изменения состояния "Все"
    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        // setSelectAll(checked);
        if (checked) {
            setStopsFilter([0, 1, 2, 3]);
        } else {
            setStopsFilter([]);
        }
    };

    // Фильтрация и сортировка билетов
    const filteredTickets = ticketsData.tickets.filter(
        (ticket) => stopsFilter.length === 0 || stopsFilter.includes(ticket.stops)
    );

    const sortedTickets = filteredTickets.sort((a, b) => a.price - b.price);

    return (
        <div className="main-page">
      <img src={logoPath} alt="Logo" className="main_logo" />

      <div className="ticket-list">
        <div className="filters">
          <div className="currency-switch">
            <h3>ВАЛЮТА</h3>
            <div className="currency-block">
              <input
                type="radio"
                id="currency-rub"
                name="currency"
                value="RUB"
                checked={currency === 'RUB'}
                onChange={handleCurrencyChange}
              />
              <label htmlFor="currency-rub">RUB</label>

              <input
                type="radio"
                id="currency-usd"
                name="currency"
                value="USD"
                checked={currency === 'USD'}
                onChange={handleCurrencyChange}
              />
              <label htmlFor="currency-usd">USD</label>

              <input
                type="radio"
                id="currency-eur"
                name="currency"
                value="EUR"
                checked={currency === 'EUR'}
                onChange={handleCurrencyChange}
              />
              <label htmlFor="currency-eur">EUR</label>
            </div>
          </div>

          <div className="currency-stop">
            <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
            <div className="checkbox">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="stops-all"
                onChange={handleSelectAllChange}
                checked={stopsFilter.length === 4}
              />
              <label htmlFor="stops-all">Все</label>
            </div>
            <div className="checkbox">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="stops-0"
                value={0}
                onChange={(e) => {
                  handleFilterChange(e);
                  if (stopsFilter.includes(0) && stopsFilter.length === 4) {
                    setStopsFilter([1, 2, 3]); // Если убираем 0, снимаем "Все"
                  }
                }}
                checked={stopsFilter.includes(0)}
              />
              <label htmlFor="stops-0">Без пересадок</label>
            </div>
            <div className="checkbox">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="stops-1"
                value={1}
                onChange={(e) => {
                  handleFilterChange(e);
                  if (stopsFilter.includes(1) && stopsFilter.length === 4) {
                    setStopsFilter([0, 2, 3]); // Если убираем 1, снимаем "Все"
                  }
                }}
                checked={stopsFilter.includes(1)}
              />
              <label htmlFor="stops-1">1 пересадка</label>
            </div>
            <div className="checkbox">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="stops-2"
                value={2}
                onChange={(e) => {
                  handleFilterChange(e);
                  if (stopsFilter.includes(2) && stopsFilter.length === 4) {
                    setStopsFilter([0, 1, 3]); // Если убираем 2, снимаем "Все"
                  }
                }}
                checked={stopsFilter.includes(2)}
              />
              <label htmlFor="stops-2">2 пересадки</label>
            </div>
            <div className="checkbox">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="stops-3"
                value={3}
                onChange={(e) => {
                  handleFilterChange(e);
                  if (stopsFilter.includes(3) && stopsFilter.length === 4) {
                    setStopsFilter([0, 1, 2]); // Если убираем 3, снимаем "Все"
                  }
                }}
                checked={stopsFilter.includes(3)}
              />
              <label htmlFor="stops-3">3 пересадки</label>
            </div>
          </div>
        </div>

        <div className="tickets">
          {sortedTickets.map((ticket, index) => (
            <Ticket key={index} ticket={ticket} currency={currency} convertPrice={convertPrice} exchangeRate={exchangeRate} />
          ))}
        </div>
      </div>
    </div>
    );
};

export default TicketList;

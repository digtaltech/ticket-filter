import React from 'react';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';


const planePath = require('../assets/plane.png');


// Функция для получения правильного текста в зависимости от количества пересадок
const getStopsText = (stops) => {
    if (stops === 0) {
        return 'БЕЗ ПЕРЕСАДОК';
    } else if (stops === 1) {
        return '1 ПЕРЕСАДКА';
    } else if (stops >= 2 && stops <= 4) {
        return `${stops} ПЕРЕСАДКИ`; // 2, 3, 4 пересадки
    } else {
        return `${stops} ПЕРЕСАДОК`; // 5 и более пересадок
    }
};


const Ticket = ({ ticket, currency, convertPrice, exchangeRate }) => {
    // Пересчёт цены в зависимости от выбранной валюты
    const price = convertPrice(ticket.price, currency, exchangeRate);

    const carrierCode = ticket.carrier;

    // Использование шаблонной строки для формирования URL
    const carrierLogoUrl = `https://img.avs.io/pics/night_square/${carrierCode}@avif?rs=fit:512:512`;


    // Форматирование дат для отображения
    const departureDate = parse(ticket.departure_date, 'dd.MM.yy', new Date());
    const formattedDepartureDate = format(departureDate, 'd MMMM yyyy, EE', { locale: ru });
    const arrivalDate = parse(ticket.arrival_date, 'dd.MM.yy', new Date());
    const formattedArrivalDate = format(arrivalDate, 'd MMMM yyyy, EE', { locale: ru });


    const stopsText = getStopsText(ticket.stops);

    return (
        <div className="ticket-container">
            <div className="ticket-header">
                <img src={carrierLogoUrl} alt="Carrier Logo" className="carrier-logo" />
                {/* <button className="buy-button"><p>Купить за </p>{`${ticket.price}₽`}</button> */}
                <button className="buy-button"><p>Купить за </p>{`${price} ${currency}`}</button>
            </div>
            <div className="ticket-info">
                <div className="time-info-departure">
                    <div className="departure-time">{ticket.departure_time}</div>
                    <div className="origin-info">{`${ticket.origin_name} (${ticket.origin})`}</div>
                    <div className="departure-date">{formattedDepartureDate}</div>
                </div>
                <div className="stops-info">
                    <span>{stopsText}</span>
                    <img src={planePath} alt="Carrier Logo" className="plain_ico" />
                </div>
                <div className="time-info-arrival">
                    <div className="arrival-time">{ticket.arrival_time}</div>
                    <div className="destination-info">{`${ticket.destination_name} (${ticket.destination})`}</div>
                    <div className="arrival-date">{formattedArrivalDate}</div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;

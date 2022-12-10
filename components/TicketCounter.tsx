import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type TEventbrite = {
    quantity_total: number,
    quantity_sold: number
};


const TicketCounter = () => {
    const [inPersonTicketAvailability, setInPersonTicketAvailability] = useState<number>();
    const [onlineTicketAvailability, setOnlineTicketAvailability] = useState<number>();

    const ticketClasses = async () => {
        const res = await fetch('https://www.eventbriteapi.com/v3/events/441134303577/ticket_classes/', {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_EVENTBRITE_AUTH_TOKEN
            }
        });
        if (res.status === 200) {
            const data = await res.json();
            const tickets: TEventbrite[] = data.ticket_classes;

            setInPersonTicketAvailability(() => {
                return getTicketAvailability(tickets, 0);
            });
            setOnlineTicketAvailability(() => {
                return getTicketAvailability(tickets, 1)
            });
        }
    }

    function getTicketAvailability(tickets: TEventbrite[], index: number) : number {
        return tickets[index].quantity_total - tickets[index].quantity_sold;
    }

    useEffect(() => {
        ticketClasses();
    }, []);

    const t = useTranslations('TicketCounter');

    return (
        <>
            <h3>{t('title')}</h3>
			<a 
                target='_blank'
                href={'https://www.eventbrite.it/e/open-source-day-2023-tickets-441134303577'}
                rel="noreferrer"
                className="button"
            >{t('in_person')} {inPersonTicketAvailability}</a>
            <a 
                target='_blank'
                href={'https://www.eventbrite.it/e/open-source-day-2023-tickets-441134303577'}
                rel="noreferrer"
                className="button"
            >{t('online')} {onlineTicketAvailability}</a>
        </>
    );
};

export default TicketCounter;
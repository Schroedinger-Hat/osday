import Image from "next/image";

type TAgendaCard = {
    hour: string;
    talkTitle?: string;
    speakerName?: string;
    secondSpeakerName?: string;
    isBreak: boolean;
    breakTitle?: string;
    icon: string;
    position: string;
}

// // 8:50 - 9:00	Introduzione mattina (lore+matteo)
// 9:00 - 9:30	Liran Tal
// 9:35 - 10:05	Gonzaga & Riva
// 10:10 - 10:40	Alina
// 10:40 - 11:00	pausa & giveway
// 11:05 - 11:35	Filip
// 11:40 - 12:10	Federico Terzi
// 12:10 - 14:00	Pausa pranzo
// 14:00 - 14:10	Introduzione pomeriggio (lore+matteo)
// 14:15 - 14:45	Jason & Michele
// 14:50 - 15:20	Matteo Collina
// 15:25 - 15:55	Serena
// 15:55 - 16:25	pausa & open-debate & giveway (lore+matteo)
// 16:30 - 17:00	Artem
// 17:05 - 17:35	Francesco Corti
// 17:40 - 18:00	Conclusione(5 admin)
// 18:00 - 21:00	Aperitivo

const AgendaCard = ({hour, talkTitle, speakerName, secondSpeakerName, isBreak, breakTitle, icon, position}: TAgendaCard) => {
    return (
        <>
        {
            isBreak ? 
            <div className={`container-timeline ${position}-timeline`}>
                <div className="content-timeline">
                    <h3><Image width={30} height={30} src={icon} alt=""/> {hour}</h3>
                    <h1>{breakTitle}</h1>
                </div>
            </div> 
            : 
            <div className={`container-timeline ${position}-timeline`}>
                <div className="content-timeline">
                    <h3><Image width={30} height={30} src={icon} alt=""/> {hour}</h3>
                    {
                        secondSpeakerName ?
                        <h1>{speakerName} - {secondSpeakerName}</h1>
                        :
                        <h1>{speakerName}</h1>
                    }
                    <h2><i>{talkTitle}</i></h2>
                </div>
            </div> 
        }
            
        </>
    );
};

export default AgendaCard;
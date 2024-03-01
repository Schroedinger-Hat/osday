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
    link?: string;
    subtitle?: string;
}

const AgendaCard = ({hour, talkTitle, speakerName, secondSpeakerName, isBreak, breakTitle, icon, position, link, subtitle}: TAgendaCard) => {
    return (
        <>
        {
            isBreak ? 
            <div className={`container-timeline ${position}-timeline`}>
                <div className="content-timeline">
                    <Image width={30} height={30} src={icon} alt=""/><h3>{hour}</h3>
                    <h1>{breakTitle}</h1>
                    {subtitle && <h3>{subtitle}</h3>}
                </div>
            </div> 
            : 
            <div className={`container-timeline ${position}-timeline clickable`}>
                <a href={`../speakers#${link}`}>
                    <div className="content-timeline">
                        <Image width={30} height={30} src={icon} alt=""/><h3>{hour}</h3>
                        {
                            secondSpeakerName ?
                            <h1>{speakerName} - {secondSpeakerName}</h1>
                            :
                            <h1>{speakerName}</h1>
                        }
                        <h2><i>{talkTitle}</i></h2>
                    </div>
                </a>
            </div> 
        }
            
        </>
    );
};

export default AgendaCard;
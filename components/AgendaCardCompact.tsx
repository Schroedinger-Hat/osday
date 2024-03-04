import Image from "next/image";

type TAgendaCard = {
    hour: string;
    talkTitle?: string;
    speakerName?: string;
    secondSpeakerName?: string;
    isBreak: boolean;
    breakTitle?: string;
    icon: string;
    link?: string;
    subtitle?: string;
}

const AgendaCardCompact = ({hour, talkTitle, speakerName, secondSpeakerName, isBreak, breakTitle, icon, link, subtitle}: TAgendaCard) => {
    return (
        <>
        <div className={`compact`}>
            <hr></hr>
        </div>
        {
            isBreak ?
            <div className={`container compact`}>
                <h3>{hour}</h3> 
                <p> &nbsp; </p>
                <Image width={30} height={20} src={icon} alt=""/>
                <h4>{breakTitle} </h4> 
                {subtitle ? <span className={'description'}> {subtitle} </span> : null}
            </div> 
            : 
            <div className={`container compact clickable`}>
                <a href={`../speakers#${link}`}>
                        <h3>{hour}</h3>
                        <p> &nbsp; </p>
                        <Image width={30} height={20} src={icon} alt=""/>
                        {
                            secondSpeakerName ?
                            <h4> {speakerName} - {secondSpeakerName}</h4>
                            :
                            <h4> {speakerName} </h4>
                        }
                        <span className={'description'}>{talkTitle}</span>
                </a>
            </div> 
        }
        </>
    );
};

export default AgendaCardCompact;
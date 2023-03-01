import React from 'react';
import Image from "next/image";

type TSponsorTable = {
    isVisible: boolean
};

const SponsorTable = ({isVisible} : TSponsorTable) => {
    if (isVisible) {
        return (
            <>
                <section className="current_sponsors">
                <h2 className="sponsors_thanks" style={{ textAlign: "center" }}>Thanks to our sponsors</h2>
                <h3 className="sponsors_tier">Supporter</h3>
                <div className="sponsors_logo">
                    <a href="https://www.nanabianca.it/" target="_blank" rel="noreferrer">
                    <Image width={300} height={150} src="/nanabianca_logo.svg" alt="Nana Bianca" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Diamond</h3>
                <div className="sponsors_logo">
                    <a href="https://devmy.it/" target="_blank" rel="noreferrer">
                    <Image width={300} height={100} src="/devmy_logo.svg" alt="devmy" />
                    </a>
                    <a href="https://sighup.io/" target="_blank" rel="noreferrer">
                    <Image width={300} height={100} src="/sighup_logo.svg" alt="SIGHUP" />
                    </a>
                    <a href="https://www.20tab.com/" target="_blank" rel="noreferrer">
                    <Image width={300} height={100} src="/20tab_logo.svg" alt="20tab" />
                    </a>
                    <a href="https://www.ovhcloud.com/" target="_blank" rel="noreferrer">
                    <Image width={200} height={100} src="/ovhcloud_logo.svg" alt="OVHcloud" />
                    </a>
                    <a href="https://www.develer.com/" target="_blank" rel="noreferrer">
                    <Image width={300} height={70} src="/develer_logo.png" alt="Develer" />
                    </a>
                    <a href="https://www.shopware.com/" target="_blank" rel="noreferrer">
                    <Image width={300} height={200} src="/shopware_logo.svg" alt="Shopware" />
                    </a>
                    <a href="https://lavorodigitaleitalia.it/" target="_blank" rel="noreferrer">
                    <Image width={200} height={150} src="/lavorio-digitale-italia_logo.png" alt="Lavorio Digitale Italia" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Gold</h3>
                <div className="sponsors_logo">
                    <a href="https://www.nearform.com/" target="_blank" rel="noreferrer">
                        <Image width={300} height={100} src="/nearform_logo.svg" alt="NearForm" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Silver</h3>
                <div className="sponsors_logo">
                    <a href="https://www.nephila.digital/" target="_blank" rel="noreferrer">
                    <Image width={250} height={100} src="/nephila_logo.svg" alt="Nephila" />
                    </a>
                    <a href="https://www.sparkfabrik.com/" target="_blank" rel="noreferrer">
                    <Image width={250} height={100} src="/sparkfabrik_logo.svg" alt="Sparkfabrik" />
                    </a>
                    <a href="https://platformatic.dev/" target="_blank" rel="noreferrer">
                    <Image width={200} height={100} src="/platformatic-logo.svg" alt="Platformatic" />
                    </a>
                    <a href="https://snyk.io/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/snyk-logo.png" alt="Snyk" />
                    </a>
                    <a href="https://www.permit.io/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/permitio-logo.svg" alt="Permit.io" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Media</h3>
                <div className="sponsors_logo">
                    <a href="https://www.wearedevelopers.com/" target="_blank" rel="noreferrer">
                    <Image width={200} height={150} src="/WeAreDevelopers_logo.svg" alt="WeAreDevelopers" />
                    </a>
                    <a href="https://kube.events/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/kube-events_logo.svg" alt="Kube Events" />
                    </a>
                    <a href="https://kube.careers/" target="_blank" rel="noreferrer">
                    <Image width={80} height={80} src="/kube-careers_logo.svg" alt="Kube Careers" />
                    </a>
                    <a href="https://codemotion.com/" target="_blank" rel="noreferrer">
                    <Image width={300} height={150} src="/codemotion_logo.svg" alt="Codemotion" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Swag</h3>
                <div className="sponsors_logo">
                    <a href="https://www.gitkraken.com/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/gitkraken-logo-light-sq.svg" alt="Gitkraken" />
                    </a>
                    <a href="https://www.jetbrains.com/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/jb_beam.svg" alt="JetBrains" />
                    </a>
                    <a href="https://www.github.com/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/github_logo.svg" alt="GitHub" />
                    </a>
                    <a href="https://mule.to/p3n8" target="_blank" rel="noreferrer">
                    <Image width={200} height={200} src="/stickermule_logo.svg" alt="Stickermule" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Community</h3>
                <div className="sponsors_logo">
                    <a href="https://www.grusp.org/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/grusp_logo.svg" alt="Grusp" />
                    </a>
                    <a href="https://www.theredcode.it/" target="_blank" rel="noreferrer">
                    <Image width={80} height={80} src="/the-red-code_logo.png" alt="TheRedCode" />
                    </a>
                    <a href="https://pisa.dev/" target="_blank" rel="noreferrer">
                    <Image width={150} height={150} src="/pisa-dev_logo.svg" alt="PisaDev" />
                    </a>
                    <a href="https://firenze.dev/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/firenze-dev_logo.svg" alt="Firenzedev" />
                    </a>
                    <a href="https://www.pignolalug.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/plug_logo.png" alt="Plug" />
                    </a>
                    <a href="https://pointerpodcast.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/pointerpodcast_logo.png" alt="Pointer Podcast" />
                    </a>
                    <a href="https://www.productmanagementday.com/" target="_blank" rel="noreferrer">
                    <Image width={150} height={150} src="/productmanagementday_logo.png" alt="PMD" />
                    </a>
                    <a href="https://www.associazionefrida.it/" target="_blank" rel="noreferrer">
                    <Image width={150} height={100} src="/frida_logo.png" alt="Frida" />
                    </a>
                    <a href="https://pensieriincodice.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/pensieri_in_codice-logo.svg" alt="Pensieri in codice" />
                    </a>
                    <a href="https://www.eddiehub.org/" target="_blank" rel="noreferrer">
                    <Image width={80} height={100} src="/eddiehub_logo.png" alt="EddieHub" />
                    </a>
                    <a href="https://www.devdreams.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/devdreams-logo.png" alt="DevDreams" />
                    </a>
                </div>
                <h3 className="sponsors_tier">Patronage</h3>
                <div className="sponsors_logo">
                    <a href="https://www.comune.fi.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/patrocinio_firenze.png" alt="Comune di Firenze" />
                    </a>
                </div>
                </section>
            </>
        );
    }
    return null;
};

export default SponsorTable;

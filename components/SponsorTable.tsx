import React from 'react';
import Image from "next/image";

type TSponsorTable = {
  isVisible: boolean
};

const SponsorTable = ({isVisible}: TSponsorTable) => {
  if (isVisible) {
    return (
      <>
        <section className="current_sponsors">
          <h2 className="sponsors_thanks" style={{textAlign: "center"}}>Thanks to our sponsors</h2>
          <h3 className="sponsors_tier">Supporter</h3>
          <div className="sponsors_logo">
            <a href="https://www.nanabianca.it/" target="_blank" rel="noreferrer">
              <Image width={400} height={200} src="/nanabianca_logo.svg" alt="Nana Bianca"/>
            </a>
          </div>
          {/* <h3 className="sponsors_tier">Diamond</h3>
                <div className="sponsors_logo">
                    <a href="https://www.nanabianca.it/" target="_blank" rel="noreferrer">
                    <Image width={400} height={200} src="/nanabianca_logo.svg" alt="Nana Bianca" />
                    </a>
                </div>
                */}
          <h3 className="sponsors_tier">Platinum</h3>
          <div className="sponsors_logo">
            <a href="https://www.spindox.it/en/" target="_blank" rel="noreferrer">
              <Image width={500} height={200} src="/Spindox_logo.png" alt="Spindox"/>
            </a>
          </div>
          {/* <h3 className="sponsors_tier">Diamond</h3>
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
                </div>*/}
          <h3 className="sponsors_tier">Gold</h3>
          <div className="sponsors_logo">
            <a href="https://www.claranet.com/it" target="_blank" rel="noreferrer">
              <Image width={300} height={125} src="/CLARANET.png" alt="Claranet"/>
            </a>
          </div>
          <h3 className="sponsors_tier">Silver</h3>
          <div className="sponsors_logo">
            <a href="https://www.nephila.digital/" target="_blank" rel="noreferrer">
              <Image width={250} height={100} src="/nephila_logo.svg" alt="Nephila"/>
            </a>
            <a href="https://www.sparkfabrik.com/" target="_blank" rel="noreferrer">
              <Image width={250} height={100} src="/sparkfabrik_logo.svg" alt="Sparkfabrik"/>
            </a>
            <a href="https://www.birdie.care/" target="_blank" rel="noreferrer">
              <Image width={250} height={100} src="/birdie.svg" alt="Birdie"/>
            </a>
            <a href="https://haystack.deepset.ai/?utm_campaign=developer-relations&utm_source=osday-italy&utm_medium=website"
               target="_blank" rel="noreferrer">
              <Image width={250} height={100} src="/haystack_deepset_logo.svg" alt="Haystack (by deepset)"/>
            </a>        
            <a href="https://www.netdata.cloud/" target="_blank" rel="noreferrer">
              <Image width={250} height={100} src="/netdata.svg" alt="Netdata"/>
            </a>      
            {/*<a href="https://platformatic.dev/" target="_blank" rel="noreferrer">*/}
            {/*<Image width={250} height={100} src="/platformatic_logo.svg" alt="Platformatic" />*/}
            {/*</a>*/}
            <a href="https://victoriametrics.com/" target="_blank" rel="noreferrer">
              <Image width={250} height={66} src="/victoria-metrics.svg" alt="VictoriaMetrics"/>
            </a>
            <a href="https://cometa.rocks/" target="_blank" rel="noreferrer">
              <Image width={250} height={58} src="/cometa.png" alt="Co.meta"/>
            </a>
            <a href="https://learnn.com/" target="_blank" rel="noreferrer">
              <Image width={150} height={100} src="/learnn.svg" alt="Learnn"/>
            </a>
            <a href="https://www.elastic.co/" target="_blank" rel="noreferrer">
              <Image width={150} height={100} src="/elastic.svg" alt="Elastic"/>
            </a>
          </div>
          {/* <h3 className="sponsors_tier">Media</h3>
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
                    <a href="https://www.linkedin.com/company/datapizza" target="_blank" rel="noreferrer">
                    <Image width={330} height={100} src="/datapizza_logo.png" alt="Datapizza" />
                    </a>
                </div> */}
          <h3 className="sponsors_tier">Media</h3>
          <div className="sponsors_logo">
            <a href="https://www.wearedevelopers.com/" target="_blank" rel="noreferrer">
              <Image width={200} height={150} src="/WeAreDevelopers_logo.svg" alt="WeAreDevelopers"/>
            </a>
            <a href="https://kube.events/" target="_blank" rel="noreferrer">
              <Image width={100} height={100} src="/kube-events_logo.svg" alt="Kube Events"/>
            </a>
            <a href="https://kube.careers/" target="_blank" rel="noreferrer">
              <Image width={80} height={80} src="/kube-careers_logo.svg" alt="Kube Careers"/>
            </a>
          </div>
          <h3 className="sponsors_tier">Swag</h3>
          <div className="sponsors_logo">
            {/* <a href="https://www.gitkraken.com/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/gitkraken-logo-light-sq.svg" alt="Gitkraken" />
                    </a>
                    <a href="https://www.jetbrains.com/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/jb_beam.svg" alt="JetBrains" />
                    </a>
                    <a href="https://www.github.com/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/github_logo.svg" alt="GitHub" />
                    </a> */}
            <a href="https://www.stickermule.com/it/adesivi-personalizzati" target="_blank"
               rel="noreferrer">
              <Image width={200} height={200} src="/stickermule_logo.svg" alt="Stickermule"/>
            </a>
            {/* <a href="https://www.treedom.net/" target="_blank" rel="noreferrer">
                    <Image width={175} height={100} src="/treedom_logo.png" alt="Treedom" />
                    </a> */}
          </div>
          <h3 className="sponsors_tier">Community</h3>
          <div className="sponsors_logo">
            <a href="https://www.grusp.org/" target="_blank" rel="noreferrer">
              <Image width={100} height={100} src="/grusp_logo.svg" alt="Grusp"/>
            </a>
            <a href="https://www.theredcode.it/" target="_blank" rel="noreferrer">
              <Image width={80} height={80} src="/the-red-code_logo.png" alt="TheRedCode"/>
            </a>
            {/*
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
                    <a href="https://www.gdgpisa.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/logo-gdg-pisa.svg" alt="GDG Pisa" />
                    </a>
                    <a href="https://t.me/+IxwjMC4ytMU4YjRk" target="_blank" rel="noreferrer">
                    <Image width={120} height={100} src="/hr-feat-ict_logo.png" alt="HR feat. ICT" />
                    </a>
                    <a href="https://linktr.ee/continuousdelivery" target="_blank" rel="noreferrer">
                    <Image width={150} height={150} src="/logo-CD.svg" alt="Continous Delivery" />
                    </a> */}
            <a href="https://pensieriincodice.it/" target="_blank" rel="noreferrer">
              <Image width={100} height={100} src="/pensieri_in_codice-logo.svg"
                     alt="Pensieri in codice"/>
            </a>

            <a href="https://italiaopensource.com/" target="_blank" rel="noreferrer">
              <Image width={150} height={150} src="/logo-italia-opensource.png" alt="Italia Open-Source"/>
            </a>
            <a href="https://latinasintech.org/" target="_blank" rel="noreferrer">
              <Image width={150} height={150} src="/latinasintech.png" alt="Latinas In Tech"/>
            </a>
          </div>
          {/*
                <h3 className="sponsors_tier">Patronage</h3>
                <div className="sponsors_logo">
                    <a href="https://www.comune.fi.it/" target="_blank" rel="noreferrer">
                    <Image width={100} height={100} src="/patrocinio_firenze.png" alt="Comune di Firenze" />
                    </a>
                </div>
                */}
        </section>
      </>
    );
  }
  return null;
};

export default SponsorTable;

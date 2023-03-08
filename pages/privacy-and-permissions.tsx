import Hero from "../components/Hero";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title:
          "Privacy and Permissions policies, Open Source Day 2023 - Florence",
        description:
          "Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social",
      },
      messages: (await import(`../public/locales/${locale}.json`)).default,
    },
  };
}

export default function CodeOfConduct() {
  const t = useTranslations("PrivacyAndPermissions");
  return (
    <>
      <div className="container">
        <Hero title={t("title")} subtitle={t("subtitle")} originals={false} />
        <div className="codeconduct">
          <h3>Oggetto del trattamento</h3>

          <p>
            Informativa ai sensi dell’art. 13 del Regolamento UE 679/2016. Ai
            sensi dell’art. 13 del Regolamento UE 679/2016, recante disposizioni
            a tutela delle persone e di altri soggetti rispetto al trattamento
            dei dati personali, desideriamo informarLa che i dati personali da
            Lei forniti formeranno oggetto di trattamento nel rispetto della
            normativa sopra richiamata.
          </p>

          <h3>Titolare</h3>

          <p>
            Titolare del trattamento è l’ Associazione non riconosciuta
            Schrodinger Hat, in persona dei soci Michele Lombardi, Gabriele
            Puliti, Nicola Puppa, Davide Imola, Lorenzo Pieri (in seguito,
            “Titolare”). L’ Associazione non riconosciuta Schrodinger Hat,
            provvede a svolgere attività didattica in ambito di progettazione
            software e di organizzazione di corsi formativi e di istruzione.
          </p>

          <h3>Tipologia di dati trattati</h3>

          <p>
            In relazione a tali attività professionali saranno necessariamente
            trattati i Vostri dati comuni (a titolo esemplificativo e non
            esaustivo: nome, cognome, luogo di nascita, codice fiscale, luogo di
            residenza, ecc.). Questi dati saranno trattati dal titolare del
            trattamento per espletamento dell’attività professionale richiesta
            nel rispetto della normativa vigente in materia di protezione dei
            dati.
          </p>

          <h3>Dati personali di Suoi familiari</h3>

          <p>
            Per la gestione dell’incarico professionale ricevuto il Titolare
            potrà, altresì, trattare dati personali di Vostri familiari al fine
            di procedere all’emissione della corretta intestazione della fattura
            per il pagamento della prestazione erogata dall’azienda. In tal
            senso Vi impegnate ad informare i Vostri familiari di tali
            trattamenti, anche fornendo loro la presente informativa.
          </p>

          <h3>Finalità del trattamento</h3>

          <p>
            l’Associazione non riconosciuta Schrodinger Hat, raccoglie e tratta
            i dati personali di:
            <ul>
              <li>Clienti e potenziali clienti </li>
              <li>familiari dei clienti e dei potenziali clienti </li>
              <li>Richiedenti servizi </li>
              <li>Imprese e fornitori </li>
            </ul>
            I Vostri dati personali sono trattati senza consenso espresso (art.
            24 lett. a, b, c Codice Privacy e art. 6 lett. b, e GDPR), per le
            seguenti finalità:
            <ol type="a">
              <li>dar seguito alla fornitura dei servizi richiesti;</li>

              <li>
                per finalità di fatturazione attiva e passiva e per ottenere il
                pagamento degli importi che ci risulteranno dovuti;
              </li>

              <li>
                adempiere agli obblighi di legge che gravano sull’azienda in
                forza di norme civilistiche, fiscali e contabili (tra cui,
                obbligo di conservazione delle scritture contabili);
              </li>
            </ol>
          </p>

          <h3>Base giuridica del trattamento</h3>

          <p>
            Il Titolare tratta i dati personali lecitamente, laddove il
            trattamento:
            <ul>
              <li>
                sia necessario all’esecuzione di un contratto di cui siete parte
                o nel caso in cui vi sia il consenso dell’interessato ex D.Lgs.
                81/2008. Il conferimento dei Vostri dati è obbligatorio per
                poter erogare i servizi dell’azienda e l'eventuale rifiuto di
                fornire tali dati potrebbe comportare la mancata o parziale
                prosecuzione del rapporto;
              </li>
              <li>
                sia necessario per adempiere un obbligo legale incombente sul
                Titolare stesso.
              </li>
            </ul>
          </p>

          <h3>Modalità del trattamento e durata del trattamento </h3>

          <p>
            Il trattamento dei dati è realizzato per mezzo delle operazioni
            indicate all’art. 4 n. 2) GDPR e precisamente: raccolta,
            registrazione, organizzazione, conservazione, consultazione,
            elaborazione, modificazione, selezione, estrazione, raffronto,
            utilizzo, interconnessione, blocco, comunicazione, cancellazione e
            distruzione dei dati. I Vostri dati personali potranno essere
            trattati a mezzo sia di archivi cartacei che informatici (ivi
            compresi dispositivi portatili) e trattati con modalità strettamente
            necessarie a far fronte alle finalità sopra indicate. I Dati
            trattati per le finalità sopra indicate verranno conservati nei
            nostri archivi per tutta la durata della relazione contrattuale; al
            termine della stessa, i Dati saranno conservati per un ulteriore
            periodo di 10 anni al fine di ottemperare a ispezioni delle
            competenti autorità, ai vigenti obblighi di legge in materia
            civilistica, fiscale e contabile, nonché per finalità di esercizio o
            di difesa di nostri diritti in sede giudiziaria. I Vostri Dati
            potranno essere altresì continuare a essere conservati e trattati
            finché perduri il legittimo interesse ex art. 47 GDPR. Nel caso in
            cui insorga un contenzioso, i Vostri Dati Personali saranno trattati
            per tutto il tempo che risulterà necessario in relazione a detto
            contenzioso.
          </p>

          <h3>Luogo del trattamento</h3>

          <p>
            I dati vengono trattati ed archiviati su supporto dematerializzato
            in cloud con accesso da remoto e backup.
          </p>

          <h3>Comunicazione dei dati</h3>

          <p>
            Informiamo, inoltre, che i dati raccolti non saranno mai diffusi e
            non saranno oggetto di comunicazione senza Vostro esplicito
            consenso, salvo le comunicazioni necessarie che possono comportare
            il trasferimento di dati ad enti pubblici, a consulenti o ad altri
            soggetti per l’adempimento degli obblighi di legge
          </p>

          <h3>
            Natura del conferimento dei dati e conseguenze del rifiuto di
            rispondere
          </h3>
          <p>
            Il conferimento dei vostri dati per le finalità sopra indicate è
            obbligatorio in quanto necessario per la conclusione e/o
            l’esecuzione di obblighi contrattuali e/o legali, la mancata
            comunicazione dei dati comporta pertanto l’impossibilità di
            adempiere a tali obblighi
          </p>

          <h3>Soggetti a cui potranno essere comunicati i dati personali</h3>

          <p>
            Senza il Vostro consenso, i Dati potranno essere comunicati a
            soggetti terzi nominati responsabili del trattamento ai sensi
            dell’articolo 28 del Regolamento e in particolare a istituti
            bancari, a società attive nel campo assicurativo, a fornitori di
            servizi, persone fisiche e/o giuridiche che erogano il servizio e/o
            che gestiscono il bene da Voi richiesto al Titolare, consulenti e a
            tutti i soggetti ove ciò sia necessario per ragioni fiscali,
            amministrativi, contrattuali o per esigenze tutelate dalle vigenti
            normative in materia. I Dati trattati potranno altresì essere
            condivisi con autorità, enti e/o soggetti a cui vadano comunicati in
            forza di disposizioni di legge od ordini di autorità e non saranno
            diffusi né vi è alcuna intenzione da parte del Titolare di
            trasferire i dati in un paese terzo o a un’organizzazione
            internazionale
          </p>

          <h3>Profilazione e Diffusione dei dati</h3>

          <p>
            I dati personali conferiti posso essere soggetti a diffusione e/o ad
            un processo decisionale interamente automatizzato, ivi compresa la
            profilazione, inoltre potranno essere diffusi e trasferiti anche ad
            un paese terzo o a un’organizzazione internazionale.
          </p>

          <h3> Diritti</h3>

          <p>
            Tra i diritti a Voi riconosciuti dal GDPR rientrano quelli di:
            <ul>
              <li>
                chiedere al Titolare l'accesso ai Vostri i dati personali ed
                alle informazioni relative agli stessi (art. 15 GDPR); la
                rettifica dei dati inesatti o l'integrazione di quelli
                incompleti (art. 16 GDPR); la cancellazione (c.d. “diritto
                all’oblio”) dei dati personali che Vi riguardano (al verificarsi
                di una delle condizioni indicate nell'art. 17, paragrafo 1,
                GDPR, e nel rispetto delle eccezioni previste nel paragrafo 3
                dello stesso articolo); la limitazione del trattamento dei Suoi
                dati personali (al ricorrere di una delle ipotesi indicate
                nell'art. 18, paragrafo 1 GDPR);{" "}
              </li>

              <li>
                richiedere ed ottenere dal Titolare – nelle ipotesi in cui la
                base giuridica del trattamento sia il contratto o il consenso, e
                lo stesso sia effettuato con mezzi automatizzati – i Vostri dati
                personali in un formato strutturato e leggibile da dispositivo
                automatico, anche al fine di comunicare tali dati ad un altro
                titolare del trattamento (c.d. diritto alla portabilità dei dati
                personali, art. 19 GDPR);
              </li>

              <li>
                opporsi in qualsiasi momento al trattamento dei Vostri i dati
                personali al ricorrere di situazioni particolari che Vi
                riguardano (art. 21 GDPR);{" "}
              </li>

              <li>
                revocare il consenso in qualsiasi momento (art. 7, paragrafo 3,
                GDPR), limitatamente alle ipotesi in cui il trattamento sia
                basato sul Vostro consenso per una o più specifiche finalità e
                riguardi dati personali comuni (ad esempio data e luogo di
                nascita o luogo di residenza), o particolari categorie di dati
                (ad esempio dati che rivelano l’origine razziale, opinioni
                politiche, convinzioni religiose, lo stato di salute o la vita
                sessuale). Il trattamento basato sul consenso ed effettuato
                antecedentemente alla revoca dello stesso conserva, comunque, la
                sua liceità;{" "}
              </li>

              <li>
                proporre reclamo a un'autorità di controllo (Autorità Garante
                per la protezione dei dati personali – www.garanteprivacy.it).
              </li>
            </ul>
            L’esercizio dei suindicati diritti può essere esercitato mediante
            comunicazione scritta al Titolare del trattamento da inviare via
            mail all’indirizzo di seguito indicato:
            schrodinger.hat.show@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}

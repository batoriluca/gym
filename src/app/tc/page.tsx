import style from '@/styles/tc.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className={style.container}>
      <div className={style.sc1} id="ssc1" >  
          <video autoPlay muted loop playsInline className={style.vidbg}>         
            <source src="/img/log.mp4" type="video/mp4"/>       
          </video>
          <div className={style.intro} >
            <h3>
              Termeni și Condiții pentru utilizarea site-ului/platformei GrowYourMusic
            </h3>

            <h2> 1. TERMENI ŞI CONDIŢII</h2>

            <h5>Prezentele condiții se aplică la momentul creării unui cont pe platforma GROW YOUR MUSIC de pe site-ul www.growyourmusic.ro, al Întreprinderii Individuale Batori Donca Șimon Cristian Alexandru, cu sediul în loc. Sat Amați Comuna Păulești,
              str. Regele Ferdinand nr. 52, jud. Satu Mare, înregistrată la Registrul Comerţului Satu Mare sub nr. F30/241/07.06.2022, având cod unic de înregistrare 46261071, denumită în continuare administrator. Toate informaţiile şi produsele conţinute
              în acest site sunt proprietatea utilizatorilor care le-au încărcat pe contul lor, aceştia asumându-şi întreaga responsabilitate pentru ele sub toate aspectele, îndeosebi în ceea ce priveşte drepturile de autor, stabilirea contravalorii
              produselor încărcate, livrarea către cumpărător a produselor achiziţionate de cel din urmă, etc. Este interzisă copierea, modificarea, afişarea, distribuirea, transmiterea, publicarea, comercializarea, licenţierea, crearea unor materiale
              derivate sau utilizarea informaţiilor şi produselor conţinute în acest site de către ceilalţi utilizatori fără confirmarea scrisă din partea utilizatorului căruia îi aparţin. Utilizatorul este acea persoană fizică, majoră, care îşi creează
              un cont pe platforma GROW YOUR MUSIC de pe site-ul www.growyourmusic.ro.
            </h5>

            <h2>2. DESCRIEREA SERVICIILOR</h2>

            <h5>Accesul în platformă/pe site şi utilizarea ei/lui are scopul de a veni în sprijinul utilizatorilor (noi artişti/producători în industria muzicală) în vederea promovării şi/sau dezvoltării produselor create de aceştia, care se poate materializa
              prin vânzarea produselor muzicale (instrumentale, versuri, artwork/visualizers, mix master, filmare și editare videoclipuri musicale) respectiv colaborarea cu alţi artişti. Sub rezerva respectării de către utilizatori a acestor Termeni
              și condiții, administratorul acordă o licență limitată, neexclusivă, netransferabilă și revocabilă pentru a utiliza site-ul/platforma GROW YOUR MUSIC, care include dreptul de a:
              - Contracta servicii de beat-uri/instrumentale, versuri, artwork/visualizers, mix master, servicii de filmare și editare a videoclipului musical de la ceilalţi utilizatori, - Efectua tranzacţii de vânzare-cumpărare a produselor celorlalţi utilizatori ai site.ului/platformei, - Participa
              la concursuri cu premii în condiţiile anunţate pe site/platformă,
              - Utiliza toate funcționalitățile conexe pe care le putem oferi. Fişierele pot fi încărcate în orice tip de format caracteristic tipului de fişier creat, iar dimensiunea maximă trebuie să fie următoarea:
              - pentru videoclipuri – 500MB   - pentru text – 3MB   - pentru imagini – 10MB
            </h5>

            <h2>
              3. ACCEPTAREA CONDIŢIILOR
            </h2>

            <h5>Prin crearea unui cont de utilizator pe acest site/platformă sunteţi de acord cu prezentele condiţii de utilizare. Dacă nu sunteţi de acord cu aceşti termeni şi condiţii de utilizare, nu accesaţi acest site. Prin crearea unui cont, postarea
              unui videoclip şi/sau anunţ, vizionarea videoclipurilor, efectuarea unei achiziții sau în alt mod vizitând sau folosind serviciile noastre, acceptați aceşti termeni şi condiţii și sunteți de acord să contractați cu noi pe cale electronică.
              Putem actualiza aceşti termeni şi condiţii publicând o versiune revizuită pe site-ul/platforma nostru/ă. Continuând să utilizați serviciile noastre, acceptați orice revizuiri. Administratorul nu poate garanta că site.ul/platforma nu contine
              erori, însă asigură utilizatorii că va depune toate diligenţele pentru realizarea unei informări corecte şi remedierea eventualelor erori semnalate de utilizatori sau descoperite de cel dintâi. Este posibil ca administratorul să actualizeze
              aplicațiile din când în când pentru a adăuga funcții noi și/sau pentru a corecta erori. Trebuie să vă asigurați că utilizați cea mai recentă versiune a aplicației care este compatibilă cu dispozitivul dvs. Nu putem garanta că veți putea
              folosi cea mai recentă versiune a aplicației pe dispozitivul dvs. Utilizatorul trebuie să aibă propriul dispozitiv pentru folosirea site-ului/platformei și să îşi asigure accesul la internet.
            </h5>

            <h2>
              4. ACCESUL LA SERVICII
            </h2>

            <h5>Pentru a avea acces la serviciile oferite, este necesar să creaţi un cont, urmând paşii de pe site/platformă. Pentru crearea contului este necesar să fie furnizată o adresă de e-mail valabilă, acest lucru urmând să fie supus confirmării înainte
              de deschiderea/activarea contului. Utilizatorul trebuie să aibă cel puțin 18 ani sau vârsta majoră aplicabilă în ţara de reşedinţă a acestuia, oricare dintre acestea este mai mare, pentru a crea un cont sau pentru a utiliza în alt mod
              site.ul/platforma noastră. Persoanele sub vârsta menţionată anterior pot folosi site.ul/platforma noastră numai prin contul unui părinte sau tutore legal și cu implicarea acestora. Vă rugăm să cereți acelei persoane să citească aceşti
              termeni şi condiţii cu dvs. și să-și dea acordul înainte de a continua. Prin acordarea de către părinți și tutori a permisiunii de a utiliza site.ul/platforma noastră prin intermediul contului dumneavoastră de către copilul dumneavoastră,
              sunteți de acord și înțelegeți că sunteți responsabil pentru monitorizarea și supravegherea utilizării copilului dumneavoastră. Dacă credeți că copilul dvs. vă folosește contul și nu are permisiunea dvs., vă rugăm să ne contactați imediat
              pentru a putea dezactiva accesul. Nu se pot crea mai multe conturi de către acelaşi utilizator/de pe aceeaşi adresă de e-mail. Accesul în platformă/pe site se va face în urma creării unui cont şi a achitării contravalorii abonamentului
              lunar, care va consta într-o suma fixă de 50lei, prima săptămână calendaristică fiind gratuită. Plata contravalorii abonamentului lunar se va face lunar, în avans, în prima zi după expirarea perioadei gratuite, pentru următoarele 30 de zile
              calendaristice, prin debitarea automată a contului bancar al utilizatorului. De exemplu, în situaţia unui cont creat în data de 18 iulie 2022, utilizatorul poate să folosească site-ul/platforma gratuit până în data de 25 iulie 2022, urmând
              ca din 26 august 2022 să achite contravaloarea abonamentului lunar valabil până la data de 25 septembrie 2022. La crearea contului se oferă un abonament de încercare gratuită pentru o perioadă de 7 de zile calendaristice. Când se încheie
              perioada de încercare gratuită, începe abonamentul plătit (cu excepția cazului în care utilizatorul a anulat) și utilizatorul trebuie să plătească întreaga taxă lunară, conform exemplului de mai sus. Utilizatorul are obligaţia de a se
              asigura că există lichidităţi suficiente în contul său pentru acoperirea contravalorii abonamentului lunar. În cazul neplăţii contravalorii abonamentului lunar, administratorul va proceda la dezactivarea contului utilizatorului, în termen
              de 3 zile lucrătoare de la data la care trebuia procesată plata, cu emiterea prealabilă a unei notificări pe e-mail.
            </h5>

            <h2>
              5. DREPTURI ŞI OBLIGAŢII
            </h2>

            <h5>Administratorul se angajează să ofere caracteristicile de bază de găzduire video și streaming ale planului utilizatorului (inclusiv lățimea de bandă și capacitățile de stocare declarate la momentul achiziției) în perioada curentă a serviciului.
              Administratorul îşi rezervă dreptul de a schimba caracteristicile din când în când, cu anunţarea prealabilă a utilizatorului. Stocarea nefolosită, lățimea de bandă și alte limite de utilizare nu se transferă. Utilizatorul este singurul responsabil pentru toate activitățile care au loc în
              contul lui, inclusiv pentru activitățile neautorizate. Utilizatorul trebuie să protejeze confidențialitatea acreditărilor contului propriu și nu este posibil să împărtăşească nimănui datele de conectare. Dacă utilizați un computer la care
              au acces alții, trebuie să vă deconectați de la cont după fiecare sesiune. Dacă descoperiți accesul neautorizat la contul dvs., trebuie să vă schimbați parola și să ne anunțați imediat.
            </h5>

            <h2>
              6. UTILIZAREA SERVICIILOR
            </h2>

            <h5>Utilizatorii pot să-şi vândă produsele create şi încărcate pe site/platformă sau să cumpere produsele create şi încărcate de ceilalţi utilizatori sau să realizeze parteneriate. Preţul de vânzare va fi stabilit în mod exclusiv de către fiecare
              utilizator şi va fi afişat lângă produsul promovat. Administratorul va percepe un comision de 8% din preţul de vânzare afişat al produsului, comision care va fi dedus din preţul de vânzare afişat. Cumpărătorul va putea achiziţia un produs
              al unuia dintre ceilalţi utilizatori ai site-ului/platformei prin selectarea produsului dorit şi trimiterea unui contract în conversația cu vânzătorul. Plata produsului şi a comisionului se va face automat, prin debitarea portofelului online al cumpărătorului.
              În cazul în care acesta nu are fonduri suficiente, tranzacţia nu se va realiza, cumparătorul primind un mesaj automat de avertizare în acest sens („fonduri insuficiente”). Administratorul nu are nicio răspundere şi nicio obligaţie în tranzacţia
              dintre cumpărător şi vânzător, cel dintâi neputând fi tras la răspundere în cazul în care cumpărătorul nu livrează/pune la dispoziţia cumpărătorului produsul sau cumpărătorul nu a achitat preţul produsului. Totodată, administratorul nu
              are nicio obligaţie de a declara sumele încasate de vânzător pentru produsele proprii, nici de a reţine vreo taxă sau impozit datorat de vânzător conform legislaţiei fiscale.
            </h5>

            <h2>
              7. POLITICA DE UTILIZARE ACCEPTABILĂ
            </h2>

            <h5>Site.ul/platforma GROW YOUR MUSIC vă permite să creați, să încărcați, să trimiteți sau să publicați conținut, cum ar fi videoclipuri, înregistrări, imagini și text. Trebuie să vă asigurați că conținutul și conduita dvs. respectă Politica de
              utilizare acceptabilă stabilită în această secțiune. Administratorul poate (dar nu este obligat să) să vă monitorizeze contul, conținutul și conduita, indiferent de setările dvs. de confidențialitate. Administratorul poate elimina sau
              limita accesul sau disponibilitatea oricărui conținut sau cont pe care îl consideră cu bună-credință a încălca această politică de utilizare acceptabilă sau dacă i se solicită acest lucru în mod expres de către autorităţi şi instituţii
              publice. Utilizatorii pot încărca numai conținut pe care au dreptul să îl încarce și să îl distribuie. Deţinătorii de drepturi de autor pot trimite administratorului site-ului/platformei o notificare de eliminare, așa cum se menționează
              în politica noastră privind drepturile de autor, dacă consideră că site-ul/platforma găzduiește materiale care încalcă drepturile. În circumstanțe adecvate, vom închide conturile persoanelor care încalcă în mod repetat aceste prevederi.
              Restricţii de conținut: Utilizatorii nu pot trimite niciun conținut care:
              - încalcă drepturile de autor sau alte drepturi ale oricărei terțe părți (de exemplu, mărci comerciale, drepturi de confidențialitate etc.);   - este explicit din punct de vedere sexual sau promovează un serviciu sexual;   -
              este defăimător;
              - este hărțuitor sau abuziv;   - conține un discurs instigator la ură sau discriminatoriu;   - promovează sau sprijină grupurile teroriste sau de rasiste;   - conține instrucțiuni privind asamblarea dispozitivelor explozive/incendiare
              sau a armelor de foc de casă/improvizate;   - exploatează sau pune în pericol minorii;   - înfățișează sau încurajează autovătămarea sau sinuciderea;   - înfățișează (i) acte ilegale din lumea reală de violență extremă, (ii) acte
              de violență și brutalitate vii, realiste sau în special grafice, (iii) violență sexuală, inclusiv viol, tortură, abuz și umilire sau (iv) animale cruzime sau violență extremă față de animale;   - promovează scheme frauduloase sau dubioase
              de a face bani, propune o tranzacție ilegală sau folosește practici de marketing înșelătoare;   - conține afirmații false sau înșelătoare despre (i) siguranța vaccinării sau (ii) informații legate de sănătate care au un potențial serios
              de a provoca vătămări publice;   - conține informații false sau înșelătoare despre vot;   - conține (i) pretenții că nu a avut loc o tragedie în lumea reală; (ii) afirmații false că a avut loc o crimă violentă sau o catastrofă; sau
              (iii) informații false sau înșelătoare (inclusiv știri false, propagandă sau teorii ale conspirației nedovedite sau respinse) care creează un risc grav de vătămare materială unei persoane, unui grup sau publicului larg;   - încalcă
              orice lege aplicabilă.   Codul de conduită:   În utilizarea site-ului/platformei, utilizatorii nu pot:   - folosi un nume de ecran ofensator (de exemplu, limbaj explicit) sau un avatar (de exemplu, care conține nuditate);                  - acționa într-o manieră înșelătoare sau uzurpați identitatea oricărei persoane sau organizații;   - hărțui sau urmări orice persoană;   - deteriora sau exploata minori;   - distribui „spam” sub orice formă sau utilizați metadate
              înșelătoare;
              - colecta informații personale despre alții fără autorizarea acestora;   - accesa contul altuia, cu excepția cazurilor permise aici;   - utiliza sau exportațoricare dintre serviciile noastre cu încălcarea oricărei legi aplicabilă
              în România;   - să se angajeze în orice activitate ilegală;   - determina sau încurajațpe alții să facă oricare dintre cele de mai sus. Măsuri tehnice interzise: utilizatorii nu vor putea să:   - cu excepția cazurilor permise
              în scris de utilizatorul căruia îi aparţine produsul: reproducă, redistribuie, încadreze, creeze lucrări derivate din acestea, modifice, arhiveze sau dezasambleze orice parte a serviciilor oferite;   - trimită orice program, script
              sau cod rău intenționat;
              - ia orice alte acțiuni pentru a manipula, interfera cu sau deteriora serviciile oferite.   Utilizatorii deţin și vor păstra dreptul de proprietate asupra conținutului pe care îl încarcă pe site/platformă. Pentru a permite administratorului
              să găzduiască conținutul utilizatorilor, aceştia acordă adminstratorului permisiunile menționate. Produsele încărcate de utilizatori pe site/platformă vor fi păstrate până când: a) este valabil abonamentul utilizatorului; b) produsul nu
              face obiectul unei notificări de eliminare sau al unei alte reclamații legale; c) atunci când administratorul, cu bună-credință, consideră că este obligat legal să facă acest lucru, atunci când constată că utilizatorul a încălcat termenii
              şi condiţiile prezente. Reprezentări și garanții: Pentru fiecare conținut pe care utilizatorul îl încarcă pe site/platformă, acesta declară şi garantează că:   - are dreptul de a încărca conținutul pe site/platformă;   - a obținut
              acordurile corespunzătoare (dacă este necesar) de la toate persoanele care apar în conținut;   - conținutul nu încalcă și nu va încălca drepturile niciunei terțe părți, inclusiv drepturile de proprietate intelectuală, drepturile de
              publicitate, drepturile morale și drepturile de confidențialitate;   - conținutul respectă acest acord și toate legile aplicabile.   Utilizatorii garantează că vor despăgubi şi vor apăra administratorul, precum și orice angajat al
              acestuia, de și împotriva tuturor plângerilor, cererilor, pretențiilor, daunelor, amenzilor stabilite de autorităţi şi instituţii, pierderi ale terților, costuri, obligații și cheltuieli, inclusiv onorariile avocaților, care decurg din
              sau sunt legate de conținutul produselor pe care utilizatorii îl încarcă pe site/platformă.
            </h5>

            <h2>
              8. NEANGAJAREA RĂSPUNDERII
            </h2>

            <h5> Administratorul nu va acorda nici o garanţie referitoare la:   - evitarea utilizării anevoioase sau întreruperii în utilizare a site-ului;   - neafectarea în sens negativ a altor sisteme prin utilizarea site-ului;   - inexistenţa
              pe site-ul pus la dispoziţie a viruşilor sau alte componente care ar putea dăuna utilizatorilor.   - faptul că serviciile noastre, sau orice parte a acestora, vor fi disponibile sau permise în jurisdicția utilizatorului, neîntrerupte
              sau fără erori, complet sigure sau accesibile de pe toate dispozitivele sau browserele;   - faptul că va găzdui, va pune la dispoziție sau va elimina orice anumit conținut;   - faptul că serviciile noastre vor satisface nevoile de
              afaceri sau profesionale ale utilizatorilor sau că vor aduce un profit garantat utilizatorilor;   - faptul că va continua să accepte orice caracteristică specială sau să mențină compatibilitatea cu orice software sau dispozitiv terță
              parte;
              Administratorul nu va fi responsabil pentru nicio daună indirectă, incidentală, inclusiv pierdere de afaceri, profit sau alte pierderi, chiar dacă acesta a fost anunţat despre posibilitatea acestor daune. În orice situaţie în care
              se va pune în discuţie răspunderea administratorului, acesta va fi limitată la de 10 ori valoarea abonamentului lunar achitat de utilizator.
            </h5>

            <h2>
              9. TERMEN ŞI REZILIERE
            </h2>

            <h5>Acest Acord începe atunci când utilizați pentru prima dată Serviciile noastre și continuă atâta timp cât folosiți Serviciul nostru sau aveți un cont la noi, oricare dintre acestea este mai lungă. Dacă încălcați oricare din termenii şi condiţiile
              esenţiale ale prezentului acord, administratorul poate, la alegerea sa: (a) să suspende, să șteargă sau să limiteze accesul utilizatorului la contul său sau la orice conținut din acesta şi (b) în măsura permisă de legea aplicabilă, să
              rețină/ să nu va restituie contravaloarea abonamentului proporţional cu perioada neutilizată rămasă până la luarea măsurilor de la pct. a). Dacă administratorul va şterge contul unui utilizator pentru încălcarea prevederilor din prezentele
              condiţii, acel utilizator nu se va mai putea reînregistra. Sunt considerate condiţii esenţiale cele prevăzute la punctele 4 şi 7.
            </h5>

            <h2>
              10. INFORMATII PERSONALE şi GDPR
            </h2>

            <h5>Când prin intermediul prezentului site/prezentei platforme vă sunt solicitate informaţii personale, aceasta are ca scop identificarea dumneavoastră sau posibilitatea de a vă contacta. Natura informaţiilor solicitate se referă în special la
              date personale (nume, prenume), adresa de e-mail, datele cardului bancar, dar poate include şi alte informaţii aflate în strânsă legatură cu utilizarea serviciilor noastre. Cu scopul de a răspunde mai bine nevoilor şi întrebărilor utilizatorilor
              site-ului/platformei, informaţiile solicitate vor face obiectul unei stocări şi prelucrări electronice, cu respectarea prevederilor legale interne şi europene legate de Protecţia datelor cu caracter personal (GDPR) - Regulamentul (UE)
              2016/679 privind protecţia persoanelor fizice în ceea ce priveşte prelucrarea datelor cu caracter personal şi privind libera circulaţie a acestor date, transpus în legislaţia din România prin Legea nr. 363/2018. Astfel, administratorul
              se obligă să păstreze confidenţialitatea asupra tuturor informaţiilor la care are acces ca urmare a înregistrării utilizatorilor pe site-ul/platforma GROW YOUR MUSIC, fiindu-i interzisă transmiterea de informaţii către terţe persoane,
              cu excepţia transferării/dezvăluirii în cazurile prevăzute de lege. Totodată, administratorul se obligă să ia măsurile de securitate tehnice şi organizatorice referitoare la operațiunile de prelucrare a datelor cu caracter personal și
              să respecte normele de securitate și cerințele prevăzute de Regulamentul (UE) 2016/679, respectiv să asigure protecția drepturilor persoanei vizate, în conformitate cu prevederile articolului 32 din Regulament.
            </h5>

            <h2>
              11. FORŢA MAJORĂ
            </h2>

            <h5>Administratorul nu va fi responsabil pentru nicio întârziere sau eşec cauzat de (a) acte de forță/dezastre naturale (inclusiv uragane și cutremure); (b) boală, epidemie sau pandemie; (c) atac terorist, război civil, agitație civilă sau revolte,
              conflicte armate, sancțiuni sau embargouri; (d) contaminare nucleară, chimică sau biologică; (e) prăbușirea clădirilor, incendiu, explozie sau accident; (f) greve de muncă sau greve comerciale; (g) întreruperea, pierderea sau funcționarea
              defectuoasă a unui serviciu de utilitate, transport sau telecomunicații; (h) orice ordin emis de un guvern sau o autoritate publică, inclusiv o carantină, o restricție de călătorie sau o altă interdicție; sau (i) orice altă circumstanță
              care nu se află sub controlul rezonabil al administratorului indiferent dacă este sau nu previzibilă. În cazul unui eveniment de forţă majoră, administratorul va fi scutit de îndeplinirea integrală a prestării serviciilor oferite până
              când evenimentul trece sau nu mai împiedică îndeplinirea. Partea care invocă vreunul din evenimentele mai sus menţionate este obligată să aducă la cunoştinţa celeilalte părţi, imediat şi în mod complet, producerea acestuia şi să ia orice
              măsuri care-i stau la dispoziţie în vederea limitării consecinţelor respectivului eveniment. Dacă în termen de 15 (cincisprezece) zile calendaristice de la data producerii lui, respectivul eveniment nu încetează, fiecare parte va avea
              dreptul să notifice celeilalte părţi încetarea de plin drept a obligaţiilor asumate, fără ca vreuna din părţi să poată pretinde celeilalte daune-interese. Partea care invocă evenimentul de forţă majoră trebuie să facă dovada imposibilităţii
              executării obligaţiilor prin înscrisuri eliberate de Camera de Comerţ şi Industrie sau alte instituţii abilitate în acest sens în termen de 5 (cinci) zile lucrătoare de la data producerii evenimentului.
            </h5>

            <h2>
              12. LEGEA APLICABILĂ ŞI LITIGII
            </h2>

            <h5 className={style.ult}> Orice litigiu rezultat din sau în legătură cu prezentele termeni şi condiţii va fi soluţionat pe cale amiabilă, iar în caz contrar de instanţele judecătoreşti competente de la sediul administratorului. Administratorul își rezervă toate drepturile
              care nu sunt acordate în mod expres aici. Drepturile şi remediile administratorului sunt cumulative. Niciun eșec sau întârziere de către administrator în exercitarea vreunui drept nu va putea fi considerat o renunţare la exercitarea ulterioară
              a acestui drept. Dacă orice termen al acestui acord este considerat invalid sau inaplicabil de către o instanță de jurisdicție competentă, termenul respectiv va fi limitat sau întrerupt. Acest acord constituie întreaga înțelegere a părților
              și înlocuiește toate înțelegerile anterioare cu privire la subiectul prezentului acord.</h5>
            <Link href="/">
              <Image width={200} height={200} src="/img/GYM_banner.png" className={style.logo} alt="" />
            </Link>
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}

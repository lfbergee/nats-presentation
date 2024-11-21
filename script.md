Vårt "problem":
Vi har en autentiseringsløsning.
Det er sånt problem de færreste
av oss har lyst å ha.

Etter en kraftig runde stolleken,
endte mitt team opp som eier,
forvalter og generelt ansvarlig
for et system vi ikke vil ha,
egentlig ikke har kunnskap til
å drifte

Vi er ikke spesielt glad i den
løsningen heller. Heldigvis har
vi vært tro til å ikke lage en
monolitt, så hver enkelt lille del
la oss kalle det mikrotjeneste
er splittet ut og self-contained.

Det gjør hver enkelt del relativt
enkel å bytte ut, oppdatere,
oppgradere også videre.

Bortsett fra autentisering da, som nå er
distribuert på tvers av n-tjenester,
fordelt på n-team..
Som da individuelt må støtte ny
og gammel auth, eller vi må ha en
distribuert big bang release.

Hvis vi er helt ærlige med oss selv
i teamet, så har vi klart å
prokastinere den oppgaven med å
gjøre en masse andre oppgaver,
som iogforseg er høyst nyttige.
Legg på en omstrukturering i teamene
som også gav en strålende
unnskyldning for å ikke starte
cross-team-cutting conserns. Men
først og fremst fordi ingen egentlig
har lyst å bytte ut en auth-broker
med en annen auth-broker. Vi vet det
kommer til å ta en helt haug med tid
og oppsiden når vi er ferdig er at
alt virker som det virker i dag.

Det bringer oss til NATS. Plattform
teamet hos oss har proklamert
hvor bra dette er og de fleste andre
team har tatt det i bruk i mer eller
mindre grad. Dette er det stinker av
noe vi også kan bruke masse tid på,
og dermed fortsette å glemme at
vi antageligvis burde byttet ut
autentiseringsløsningen vår.

Vi har ett "underforvalta" området igjen
innenfor vårt ansvarsområdet vi
eier i dag. Så når vi kombinerer NATS
med viltkjøtt, så snakker vi, det er
nyttig, det er nytt, det er ikke
autentisering!

Så veldig enkelt, vi skal lage systemstøtte
for kjøttkontrollører så vi kan sende
ut rapporter ved avvik. En litt kjedelig sak,
eller egentlig bra sak, er at det veldig sjeldent
er avvik. Okei, vi lukter at autentisering
er på bordet igjen, så vi graver litt mer i
problemstillingen og finner ut at selvom det er
få avviksrapporter, så skal det lages en
gebyr- og kontrollrapport for hver kontroll!

Phew! Nytten er tilbake, prokastinering kan
fortsette. Det er kanskje nødvendig på dette
tidspunktet og si ifra at denne autentiserings
løsningen vi har er oppdatert, monitorert og
generelt i god stand, det er ikke nødvendig å
angripe oss.

Okei, la oss se på hvordan vi hadde løst dette
i "dagens" arkitektur. Vi leverer systemstøtte
for tilsvarende prosesser for rødt og hvitt
kjøtt i dag. Men de tre typene har såpass
forskjellig flyt og regelverk at det antageligvis
gir mening å ha dette i tre forskjellige applikasjoner,
som deler noen tjenster under.

Så frontend, i React, snakker REST over
HTTP med en backend for frontend i
kotlin med spring boot som igjen snakker
med en rekke mikrotjenester.

I enkelte tilfeller går frontend rett på
mikrotjenestene for isolerte hendelser.
Men stort set alle "hendelser" skrives igjennom
backend til ene database.

Okei. Vi har alle sett denne skissa før,
dog med litt andre navn på boksene. Men
man vinner ikke akkuart noen arkitektur-pris
for å tegne denne skissen. Og dessuten,
det var et poeng å bruke NATS, og i denne
skissen er det ikke tegna inn en eneste
boks som har noe som helst med NATS å
gjøre. Så vi prøvde oss å lage en ny variant.

Dette var vår første NATS baserte skisse
Og helt ærlig, ingen var spesielt gira på
noe som helst akkurat i dette tilfellet.

Hvis noen leter etter forskjellen, så har
database-boksen falt 90 grader over,
og dermed blitt til en strøm.

Det føltes ikke ut som en stor seier
å bytte ut en god relasjonsdatabase som
Postgres med en relativt dårlig dokument-
database som egentlig ikke er en database.
Hvis dette var målet, så kunne vi heller
byttet til en dokumentdatabase, eller
kanskje enda bedre bare lagt til en plugin
i Postgres og Bobs your uncle.

Heldigvis, så var motivasjonen vår sterk
for å ikke bytte autentiseringsløsning.
Så vi gav ikke opp her. Vi fortsatte å
tenke, tegne og POCe. Vi kom faktisk så
langt at vi på dette tidspunktet bestemte
at vi prøver. Vi gav oss selv ca en måned,
mens vi satt i gang brukertester og skisser
til å få noe til å kjøre. Vi viste jo at vi
relativt enkelt kunne falle tilbake til en
kjent arkitektur.

La meg ta en liten tangent og fortelle
dere om hvitt kjøtt applikasjonen vår.
Den begynte vi på sommer 2023, og
har iløpet av 24 rullet ut til alle inspektørene
på tvers av alle hvitt kjøtt slakteriene.
Den bygget vi med Nextjs, ikke unikt akkurat,
men vi var eneste i Mattilsynet på det
tidspunktet som gjorde det. Vi var også
relativt fremoverlente i vår Next bruk, så vi
gjetta på at App-router og React nye
server mønstre skulle rekke å lande i PROD
inne vi gikk i PROD. Vi var faktisk litt raskere
enn Meta og Vercel, uten at de visste at
det var en konkurranse. Men uansett,
vår lille gamling betalte seg, det ble ingen
store rewrites og de nye server mønstrene
fungerte god for oss.

Det var åpenbart for oss, hvertfall meg,
at vi skulle fortsette på det toget når
vi satt i gang med Vilt. Plutselig en dag
så går det på noen lyspærer for oss, når
vi innser at disse helt nye server-mønstrene,
som PHP også hadde i 2002, gjør at
frontenden har en backend. Du kan nesten
kalle det en backend for frontend.

Så hva som vi flytter databasen, som
selvsagt ikke er en database, men en strøm
som gjør jobben som database, et hakk
frem i skissene.

Det er stort sett frontend som produserer
data. Så gir det ikke mening at det også
er frontend som har ansvar for å skrive den
ned, og lese den ut, og vise den?

Og for backendtjenestene, så forsvinner en
hel haug av CRUD kode for å ta i mot og
skrive ned data som noen andre produserer.
Isteden kan disse tjenestene fokusere på
å agere på den dataen, berike den med data
fra ekserne systemer eller gjøre operasjoner
basert på dataen.

På dette tidspunktet så har vi en POC på
frontenden og en tjenster som kan gjøre noe
basert på dette. Her går vi det som på fagspråket
heter "Full NATS". Det vil si, vi tillater ikke noen
HTTP kall innad i vårt system. Vi kontrollerer
ikke verden rundt oss, enda.. Så ut og inn
av våre systemer så kommer vi ikke unna, men
alt pakkes inn i en strøm og en tjeneste.

Det kan vi, fordi vi inså ganske tidlig
at det er veldig billig for oss å spinne opp
små, isolerte tjenester som kan løse spesifikke
oppgaver i det store systemet. Vi kan kalle
det for mikrotjenseter om du vil.

Kanskje noen vil påstå at vi har funnet opp hjulet
på nytt. Da vil jeg minne deg på, at det
vi egentlig gjør er å ikke bytte autentiserings
løsning. This is a feature, not a bug.

Så for å spre ut litt mer detaljert.
Databasen vår er i praksis bytta ut
med en rekke KVer. Det ble tidlig veldig
tydelig for oss at storage og compute
er sider av samme sak. Det føles faktisk,
klisjeaktig som det er, at frontend og
backend er litt tettere. Så behovene vi har
i front, reflekteres i større grad i dataene
vi produserer.

Feks, vi trenger å hente en
liste med slakterier, da trenger vi å vite
litt om hvert slakteri. Og vi trenger å vite
om slakteriet du jobber på, da trenger vi å
vite mye mer. I dag så henter man en liste
med alle detaljene. Så cacher vi i front og
velger å vise liste eller detaljer, alt ettersom.
Og den lista er et oppslag i tjenesten, ned
i databasen hver gang.

Nå så lager vi en KV når mikrotjenesten for
slakteri starter. Den oppdaterer når den
føler for det med en liste med
alle slakteri, med bare navn og nummer. Og
hvert enkelt slakteri med alle detaljer.
I front så slår vi opp den KVen hver gang
vi trenger den dataen. Enten listen eller
detaljene. Per i dag, no cache needed.

Dette er en verden hvor det oppleves
mye enklere å faktisk lage mikrotjenester
og holde separation-of-concern prinsippene
uten å komplisere infrastruktur så mye
at vi fullstendig mister kontrollen

Vi introduserer databasen igjen, for å
la systemene gjøre det de er gode på
så kan vi skrive ned data vi er "ferdig"
med i databasen. Det gjør at vi når
vi er interessert i historisk data kan
bruke databasespørringer som vi er vant
med, og kunne hente ut nødvendig data
på en mer effektiv måte enn via KVene.

Så fremtiden vår ser forhåpentligvis ut
som noe alla dette. Hvor vi kommuniserer
over strømmer isteden for REST.

I noen tilfeller vil det gi mening med KV-er,
noen object-stores og noen rene køer.
Og noen tilfeller vil request-reply gi mening.

Men alle disse mønstrene er egentlig
refleksjoner av systemet under som
er bare køer. Man bare ser på de litt
forskjellig, og legger litt ulike begreninsinger
og automatikk på de ulike variantene.

Så, React og Next gir oss tilgang på en
server rett i fra klienten ute i browseren.
Og alt derifra å inn er server til server
kommunikasjon over strømmer. Her bruker
vi autentiseringsmodellen til NATS.

Vi kan faktisk spole tilbake til forrige skisse,
altså NÅ situasjonen. Her trenger vi
egentlig ikke brukeren sitt token til
noe annet enn å identifisere brukeren.
Det tilbyr den nye auth løsningen ut av
boksen. Og endre frontend til å bruke
ny løsning er basilcy bare å endre fem
environment variabler.

Som en livslang og tildels professjonell
prokrastinerer. Så går dette inn i boka
som nok et eksempel på at prokastinering
lønner seg. Det er kanskje ikke lærdommen
fortjener, men det er den dere får.

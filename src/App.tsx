import React, { useState } from "react";
import "./index.css";

type Concept = { term: string; def: string };
type Flashcard = { q: string; a: string };
type Block = {
  id: string;
  title: string;
  description: string;
  concepts: Concept[];
  flashcards: Flashcard[];
};

// =========================
//        DATA: BLOCKS
// =========================

const BLOCKS: Block[] = [
  // ------- BLOCK 1 -------
  {
    id: "block1",
    title: "Block 1 – Decision under risk",
    description:
      "Risk, expected utility, försäkring, adverse selection och moral hazard.",
    concepts: [
      {
        term: "Risk vs osäkerhet",
        def: "Risk: sannolikheter är kända. Osäkerhet: sannolikheter är okända eller subjektiva."
      },
      {
        term: "Lotteri",
        def: "Formell representation av slumpmässiga utfall, t.ex. (x1, p1; x2, p2; …)."
      },
      {
        term: "Expected value (EV)",
        def: "Det viktade genomsnittet av möjliga utfall, EV = Σ p_i x_i."
      },
      {
        term: "St. Petersburg-paradoxen",
        def: "EV är oändlig men betalningsvilja är begränsad.Motiv för expected utility theory."
      },
      {
        term: "Expected utility (EU)",
        def: "Det viktade genomsnittet av nyttor, EU = Σ p_i u(x_i). Tar hänsyn till riskpreferenser."
      },
      {
        term: "Riskaversion",
        def: "Konkav nyttokurva, individen föredrar säkra utfall framför lotterier med samma EV."
      },
      {
        term: "Certainty equivalent (CE)",
        def: "Det säkra belopp som ger samma nytta som ett givet lotteri."
      },
      {
        term: "Risk premium",
        def: "EV minus CE. Mäter hur mycket en riskavert individ är villig att betala för att slippa risk."
      },
      {
        term: "Adverse selection",
        def: "Hög-risk individer köper försäkring i större utsträckning än låg-risk, vilket kan spränga marknaden."
      },
      {
        term: "Moral hazard",
        def: "När försäkring förändrar individens beteende, t.ex. mindre prevention eller överkonsumtion av vård."
      }
    ],
    flashcards: [
      {
        q: "Vad är skillnaden mellan risk och osäkerhet?",
        a: "Risk: sannolikheter är kända (t.ex. ett tärningskast). Osäkerhet: sannolikheter är okända eller svåra att ange (t.ex. politiska kriser)."
      },
      {
        q: "Varför räcker inte expected value (EV) för att beskriva beslutsfattande under risk?",
        a: "För att människor bryr sig om risk, inte bara om genomsnittlig utbetalning. De har riskpreferenser som kräver en nyttokurva (expected utility)."
      },
      {
        q: "Hur definieras expected utility (EU)?",
        a: "EU = Σ p_i u(x_i), där p_i är sannolikheter och u(x_i) är nytta av utfallet. EU tar hänsyn till riskaversion via nyttokurvans form."
      },
      {
        q: "Vad innebär riskaversion i termer av nyttokurvans form?",
        a: "Nyttan är konkav i konsumtion/inkomst (u''(x) < 0). Extra pengar ger allt mindre marginalnytta, vilket gör att individen föredrar säkra utfall."
      },
      {
        q: "Hur definieras certainty equivalent (CE) för ett lotteri?",
        a: "Det säkra belopp som ger samma nytta som lotteriet. Om individen är riskavert är CE mindre än lotteriets EV."
      },
      {
        q: "Vad är riskpremien och vad mäter den?",
        a: "Riskpremien = EV − CE. Den mäter hur mycket individen är villig att offra i förväntad värde för att undvika risken."
      },
      {
        q: "Vad är adverse selection på en försäkringsmarknad?",
        a: "När individer med hög risk är mer benägna att köpa försäkring än låg-risk, vilket höjer premien och kan driva ut låg-risk-individer och i extremfall slå ut marknaden."
      },
      {
        q: "Ge ett exempel på moral hazard i sjukvård.",
        a: "En individ med full sjukförsäkring bryr sig mindre om kostnaden när hen väljer behandling och kan efterfråga dyrare vård än om hen betalade själv."
      },
      {
        q: "Varför behövs självrisk och egenavgifter i försäkringar?",
        a: "För att motverka moral hazard – när individen betalar en del av kostnaden blir hen mer kostnadsmedveten och överkonsumtionen minskar."
      },
      {
        q: "Hur relaterar 'Market for Lemons' till försäkring?",
        a: "Precis som med bilarna i Akerlofs exempel kan dold information om risktyper göra att bara 'dåliga risker' blir kvar på försäkringsmarknaden när premien stiger."
      }
    ]
  },

  // ------- BLOCK 2 -------
  {
    id: "block2",
    title: "Block 2 – Decision over time",
    description:
      "Intertemporala val, diskontering, beta–delta-modellen och present bias.",
    concepts: [
      {
        term: "Present value (PV)",
        def: "Nuvarande värde av en framtida betalning: PV = FV / (1 + r)^t."
      },
      {
        term: "Future value (FV)",
        def: "Framtida värde av en nuvarande summa: FV = PV (1 + r)^t."
      },
      {
        term: "Intertemporal budget constraint",
        def: "Visar möjliga kombinationer av konsumtion idag och i framtiden givet inkomster och ränta."
      },
      {
        term: "MRS (intertemporalt)",
        def: "Marginal rate of substitution mellan konsumtion idag och i framtiden. Vid optimum: MRS = 1 + r."
      },
      {
        term: "Exponential discounting",
        def: "Standardmodellen där framtida nytta diskonteras med en konstant faktor δ^t och preferenser är tidskonsistenta."
      },
      {
        term: "Beta–delta-modellen",
        def: "Quasi-hyperbolisk diskontering: U = u(c0) + βδu(c1) + βδ^2u(c2)+… med β < 1 som fångar present bias."
      },
      {
        term: "Present bias",
        def: "Tendensen att övervärdera nutida konsumtion relativt framtida, jämfört med vad man själv tycker är optimalt på längre sikt."
      },
      {
        term: "Naiv individ",
        def: "Individ som har present bias men inte inser det. Tror att framtida jag kommer följa dagens planer."
      },
      {
        term: "Sofistikerad individ",
        def: "Individ med present bias som inser sina självkontrollproblem och därför efterfrågar commitment devices."
      },
      {
        term: "Commitment device",
        def: "Självpåtaget åtagande eller begränsning som hjälper individen att få framtida beteende att stämma med dagens planer (t.ex bundet sparande, deadlines)."
      }
    ],
    flashcards: [
      {
        q: "Vad är present value (PV) och varför är det viktigt i intertemporala beslut?",
        a: "PV är nuvärdet av en framtida betalning. Det används för att kunna jämföra beslut som inträffar vid olika tidpunkter på en gemensam skala."
      },
      {
        q: "Hur påverkar en högre realränta valet mellan konsumtion idag och i framtiden?",
        a: "Framtida konsumtion blir relativt billigare, vilket via substitutionseffekten tenderar att öka sparandet och minska nutida konsumtion."
      },
      {
        q: "Vad innebär att MRS = 1 + r vid optimum i tvåperiodsmodellen?",
        a: "Att individens villighet att byta bort konsumtion idag mot konsumtion i framtiden exakt matchar marknadens bytesförhållande via räntan."
      },
      {
        q: "Hur ser exponential discounting ut i formel?",
        a: "U = Σ δ^t u(c_t), med 0 < δ < 1. Diskonteringen är densamma mellan alla perioder, vilket ger tidskonsistenta preferenser."
      },
      {
        q: "Vad tillför beta–delta-modellen jämfört med exponential discounting?",
        a: "Den lägger till en extra parameter β < 1 som sänker vikten på all framtida nytta relativt nuet, vilket fångar present bias och tidsinkonsistens."
      },
      {
        q: "Vad menas med present bias i praktiken?",
        a: "Att man upprepat väljer omedelbar belöning (t.ex skrolla, konsumera) framför långsiktiga mål (spara, plugga), trots att man senare ångrar sig."
      },
      {
        q: "Hur beter sig en naiv individ med present bias över tid?",
        a: "Den skjuter upp viktiga saker eftersom den varje gång tror att 'nästa gång' kommer den ta det långsiktiga beslutet – men gör det aldrig."
      },
      {
        q: "Hur beter sig en sofistikerad individ med present bias?",
        a: "Den inser att framtida jag kommer frestas att bryta planen och söker därför bindande lösningar, t.ex tidslåsta sparkonton eller hårda deadlines."
      },
      {
        q: "Ge ett exempel på ett commitment device i vardagen.",
        a: "Ett tidsbundet sparkonto där du inte kan ta ut pengarna utan avgift, eller att skriva upp sig på en kurs med deadline och avgift vid utebliven närvaro."
      },
      {
        q: "Vad innebär det att preferenser är tidskonsistenta?",
        a: "Att det beslut du tycker är bäst idag för framtida perioder är samma som du faktiskt kommer genomföra när framtiden väl inträffar."
      }
    ]
  },

  // ------- BLOCK 3 -------
  {
    id: "block3",
    title: "Block 3 – Efficiency & Fairness",
    description:
      "Paretoeffektivitet, sociala välfärdsfunktioner, Okun’s leaky bucket och rättviseprinciper.",
    concepts: [
      {
        term: "Paretoeffektivitet",
        def: "En fördelning där ingen kan få det bättre utan att någon annan får det sämre. Säger inget om rättvisa."
      },
      {
        term: "Paretoförbättring",
        def: "En förändring som gör någon bättre utan att göra någon sämre."
      },
      {
        term: "Utilitarism",
        def: "Social välfärd är summan av individers nyttor. Omfördelning motiveras tills marginalnyttan av inkomst är lika."
      },
      {
        term: "Rawlsian maximin",
        def: "Social välfärd bestäms av den sämst ställdes nytta. Politiken ska maximera denna."
      },
      {
        term: "Equality vs equity",
        def: "Equality: lika utfall. Equity/fairness: rättvisa principer, inte nödvändigtvis lika utfall."
      },
      {
        term: "Procedural fairness",
        def: "Fokus på om processen varit rättvis, t.ex lika möjligheter, transparenta regler."
      },
      {
        term: "Substantive fairness",
        def: "Fokus på om utfallet är rättvist, t.ex fattigdomsreducering."
      },
      {
        term: "Okun’s leaky bucket",
        def: "Metafor för att omfördelning har effektivitetsförluster – 'läckage' genom skatter, beteendeförändringar och administration."
      },
      {
        term: "Equality of opportunity",
        def: "Skillnader ska bero på val och ansträngning, inte på bakgrundsfaktorer (accidents of birth)."
      }
    ],
    flashcards: [
      {
        q: "Vad innebär Paretoeffektivitet i en ekonomi?",
        a: "Att inga ytterligare omfördelningar kan göras som förbättrar någons situation utan att försämra för någon annan."
      },
      {
        q: "Varför är Paretoeffektivitet ett svagt rättvisekriterium?",
        a: "För att det inte säger något om hur resurserna är fördelade – en extremt ojämlik fördelning kan vara Paretoeffektiv."
      },
      {
        q: "Hur definierar utilitarismen social välfärd?",
        a: "Som summan av allas nyttor. En poltik är bättre om den ökar total nytta, även om vissa individer förlorar."
      },
      {
        q: "Hur skiljer sig Rawls syn på rättvisa från utilitarismens?",
        a: "Rawls vill maximera nyttan för den sämst ställde (maximin), medan utilitarismen maximerar total nytta även om vissa hamnar mycket sämre."
      },
      {
        q: "Vad illustrerar Okun’s leaky bucket?",
        a: "Att omfördelning från rika till fattiga sker genom en 'läckande hink' – på vägen försvinner resurser via skatteeffekter och administration."
      },
      {
        q: "Vad är skillnaden mellan equality och equity?",
        a: "Equality handlar om lika utfall, equity om rättvisa principer – t.ex lika möjligheter eller kompensation för nackdelar."
      },
      {
        q: "Vad menas med procedural fairness?",
        a: "Att processen fram till utfallet upplevs rättvis (t.ex meritbaserad rekrytering), oavsett om slutresultatet är helt jämlikt."
      },
      {
        q: "Vad menas med equality of opportunity?",
        a: "Att alla ska ha samma möjligheter, och att skillnader i utfall ska bero på ansträngning och val, inte på faktorer man inte kan påverka."
      },
      {
        q: "Ge ett exempel på en konflikt mellan efficiency och fairness.",
        a: "En mycket progressiv skatt kan kraftigt minska fattigdom (fairness) men också minska incitament att arbeta extra (efficiency)."
      },
      {
        q: "Hur kan sociala preferenser påverka klassiska effektivitetsresonemang?",
        a: "Om individer bryr sig om andras inkomster (inequality aversion, status) kan en fördelning som är 'effektiv' i klassisk mening ändå vara politiskt instabil."
      }
    ]
  },

  // ------- BLOCK 4 -------
  {
    id: "block4",
    title: "Block 4 – Inequality & Measurement",
    description:
      "Lorenzkurva, Gini, ekvivalensskalor och intergenerationell rörlighet.",
    concepts: [
      {
        term: "Lorenzkurva",
        def: "Graf som visar kumulativ andel inkomst mot kumulativ andel befolkning, sorterad från fattigast till rikast."
      },
      {
        term: "Gini-koefficient",
        def: "Mått på ojämlikhet: G = A/(A+B), där A är ytan mellan Lorenzkurvan och 45-graderslinjen."
      },
      {
        term: "Equivalence scales",
        def: "Justering av hushållsinkomst för hushållsstorlek och sammansättning för att jämföra levnadsstandard."
      },
      {
        term: "Market income vs disposable income",
        def: "Market income är inkomster före skatt/transfereringar, disposable income efter. Skillnaden visar omfördelningens omfattning."
      },
      {
        term: "Intergenerational elasticity (IGE)",
        def: "Mått på hur starkt barns inkomster hänger ihop med föräldrars inkomster. Hög IGE = låg rörlighet."
      }
    ],
    flashcards: [
      {
        q: "Vad visar Lorenzkurvan?",
        a: "Den visar hur stor andel av den totala inkomsten som innehas av de x% fattigaste, för alla x mellan 0 och 100."
      },
      {
        q: "Hur tolkas en Lorenzkurva som ligger långt från 45°-linjen?",
        a: "Det tyder på hög ojämlikhet – de fattigaste procenten har mycket liten del av total inkomst."
      },
      {
        q: "Vad beskriver Gini-koefficienten?",
        a: "Ett sammanfattande mått på ojämlikhet mellan 0 (perfekt jämlikhet) och 1 (maximal ojämlikhet)."
      },
      {
        q: "Varför använder man equivalence scales i ojämlikhetsanalys?",
        a: "För att en krona räcker olika långt i små respektive stora hushåll. Ekvivalensskalor justerar för hushållsstorlek och sammansättning."
      },
      {
        q: "Vad är skillnaden mellan market income och disposable income?",
        a: "Market income är före skatter och transfereringar, disposable income är efter. Skillnaden fångar statens omfördelande roll."
      },
      {
        q: "Vad innebär en hög intergenerational elasticity (IGE)?",
        a: "Att barns inkomster i hög grad avgörs av föräldrarnas inkomster – låg social rörlighet."
      },
      {
        q: "Hur kan global ojämlikhet minska samtidigt som nationell ojämlikhet ökar?",
        a: "Fattiga länder växer snabbare än rika (minskad ojämlikhet mellan länder), samtidigt som klyftorna ökar inom många länder."
      },
      {
        q: "Varför är förmögenhetsojämlikhet ofta större än inkomstojämlikhet?",
        a: "Förmögenheter ackumuleras över tid genom sparande och avkastning och kan ärvas, vilket förstärker skillnader."
      },
      {
        q: "Vad innebär population principle för Lorenzkurvan?",
        a: "Att kurvan inte ska påverkas av att vi duplicerar befolkningen – bara relativa andelar spelar roll."
      },
      {
        q: "Ge ett exempel på en policy som minskar Gini-koefficienten.",
        a: "Progressiv beskattning kombinerad med riktade transfereringar till låginkomsthushåll."
      }
    ]
  },

  // ------- BLOCK 5 -------
  {
    id: "block5",
    title: "Block 5 – Health Economics",
    description:
      "Hälsa som kapital, hälsoförsäkringar, RAND-experimentet och prioriteringar.",
    concepts: [
      {
        term: "Grossman-modellen",
        def: "Individen har ett hälsokapital som både ger direkt nytta och påverkar möjligheten att arbeta och konsumera. Hälsokapitalet deprecieras och kan ökas genom investeringar."
      },
      {
        term: "Full coverage",
        def: "Försäkring där individen inte betalar något själv vid vård (0% egenavgift)."
      },
      {
        term: "Copayment",
        def: "Individen betalar en viss andel av kostnaden själv vid varje vårdtillfälle, t.ex 25%."
      },
      {
        term: "Deductible (självrisk)",
        def: "Belopp individen måste betala ur egen ficka innan försäkringen börjar ersätta kostnader."
      },
      {
        term: "RAND Health Insurance Experiment",
        def: "Stort randomiserat experiment som visar att högre egenavgifter minskar vårdkonsumtion men har liten effekt på hälsa för de flesta grupper."
      },
      {
        term: "Supplier-induced demand",
        def: "När läkare påverkar patientens vårdkonsumtion mer än vad patientens egna preferenser och behov skulle motivera."
      }
    ],
    flashcards: [
      {
        q: "Hur ser hälsa ut i Grossman-modellen?",
        a: "Som ett kapital: individen föds med en viss nivå, som deprecieras med ålder men kan förstärkas genom investeringar som vård, kost och motion."
      },
      {
        q: "Varför ökar vårdkonsumtion vanligtvis med ålder?",
        a: "För att hälsokapitalets depreciation ökar med åldern, vilket skapar fler sjukdomstillstånd och ett större vårdbehov."
      },
      {
        q: "Vad visar RAND-experimentet om priselasticitet för vård?",
        a: "Att efterfrågan på vård är oelastisk: högre egenavgifter minskar konsumtionen, men inte dramatiskt."
      },
      {
        q: "Vilken slutsats drogs om hälsa i RAND-experimentet?",
        a: "Att högre egenavgifter minskade vårdkonsumtionen utan någon tydlig negativ effekt på hälsan för de flesta deltagare."
      },
      {
        q: "Vad är skillnaden mellan adverse selection och moral hazard i hälsoförsäkring?",
        a: "Adverse selection handlar om vem som väljer att försäkra sig (hög/låg risk), moral hazard om hur de försäkrade beter sig efter att de fått försäkring."
      },
      {
        q: "Vad är supplier-induced demand (SID)?",
        a: "Att vårdgivare, pga informationsövertag, kan få patienten att konsumera mer (eller dyrare) vård än vad patienten själv skulle valt med full information."
      },
      {
        q: "Hur påverkar fee-for-service incitamenten för läkare?",
        a: "Det ger incitament att öka antalet åtgärder och besök, vilket riskerar överbehandling."
      },
      {
        q: "Vad är huvudmotivet för offentligt finansierad hälso- och sjukvård?",
        a: "Att säkerställa tillgång efter behov snarare än betalningsförmåga, samt hantera adverse selection genom obligatorisk medverkan."
      },
      {
        q: "Vad innebär equality of access i sjukvården?",
        a: "Att alla, oavsett inkomst eller bakgrund, har likvärdig tillgång till vård när de behöver den."
      },
      {
        q: "Vad menas med prioriteringsprinciperna i svensk hälso- och sjukvård?",
        a: "Människovärdesprincipen, behovsprincipen och kostnadseffektivitetsprincipen styr vilken vård som ska ges först och hur resurser fördelas."
      }
    ]
  },

  // ------- BLOCK 6 -------
  {
    id: "block6",
    title: "Block 6 – Environmental Economics",
    description:
      "Externaliteter, Pigouskatter, cap-and-trade, abatement och värdering av miljö.",
    concepts: [
      {
        term: "Negativ externalitet",
        def: "En handling som åsamkar kostnader för tredje part utan att dessa kompenseras, t.ex utsläpp."
      },
      {
        term: "Pigouvian tax",
        def: "En skatt som sätts lika med den marginala externa kostnaden för att internalisera externaliteten."
      },
      {
        term: "Cap-and-trade",
        def: "System där staten sätter ett totalt utsläppstak och delar ut/auktionerar utsläppsrätter som företag får handla med."
      },
      {
        term: "Abatement cost curve",
        def: "Kurva som visar marginalkostnaden för att reducera utsläpp med ytterligare en enhet."
      },
      {
        term: "Value of a Statistical Life (VSL)",
        def: "Monetärt mått på värdet av en liten riskreduktion multiplicerat med antal liv."
      }
    ],
    flashcards: [
      {
        q: "Vad är huvudproblemet vid negativa externaliteter som utsläpp?",
        a: "Att marknadspriset inte reflekterar hela samhällskostnaden, vilket leder till överproduktion och för mycket utsläpp."
      },
      {
        q: "Hur fungerar en Pigouvian skatt i teorin?",
        a: "Genom att sätta en skatt lika med marginal extern kostnad skiftar man producentens beslut så att den samhällsoptimala nivån på produktionen uppnås."
      },
      {
        q: "Vad är grundidén bakom cap-and-trade?",
        a: "Att bestämma mängden utsläpp politiskt (cap) och låta marknaden hitta den billigaste fördelningen av utsläppsminskningar via handel med utsläppsrätter."
      },
      {
        q: "Vad visar en abatement cost curve?",
        a: "Hur dyrt det är vid marginalen att reducera ett ton utsläpp med olika tekniker eller åtgärder; används för att prioritera de billigaste åtgärderna först."
      },
      {
        q: "Vad är en 'win-win'-åtgärd i miljöekonomi?",
        a: "En åtgärd som både minskar utsläpp och sparar pengar, t.ex energieffektivisering där lägre elräkning mer än kompenserar investeringskostnaden."
      },
      {
        q: "Hur definieras value of a statistical life (VSL)?",
        a: "Som betalningsviljan för en liten riskreduktion dividerat med riskförändringen, t.ex 400 kr för att minska risk från 1/100000 → VSL ≈ 40 miljoner."
      },
      {
        q: "Varför är CO2 ett 'stock pollutant'?",
        a: "För att det ackumuleras i atmosfären över tid, och det är den totala mängden (stocken) snarare än flödet per år som avgör klimatpåverkan."
      },
      {
        q: "Vad är en positiv återkopplingsloop i klimatsystemet?",
        a: "En process där en initial uppvärmning leder till effekter (t.ex isavsmältning) som förstärker ytterligare uppvärmning."
      },
      {
        q: "När är regleringar (command-and-control) mer rimliga än priser?",
        a: "När skadorna är mycket känsliga för överskridanden (t.ex giftiga ämnen) eller när mätning av utsläpp är svår, så att tydliga gränsvärden är enklare."
      },
      {
        q: "Vad är skillnaden mellan lokala och globala miljöproblem i policy-design?",
        a: "Lokala problem (t.ex NOx) kan lösas nationellt/kommunalt, medan globala problem (t.ex CO2) kräver internationell samordning."
      }
    ]
  },

  // ------- BLOCK 7 -------
  {
    id: "block7",
    title: "Block 7 – Interventions & Empirical Methods",
    description: "Policyutvärdering, RCT, naturliga experiment, DiD och RDD.",
    concepts: [
      {
        term: "Randomized Controlled Trial (RCT)",
        def: "Experiment där individer randomiseras till behandling eller kontroll för att identifiera kausala effekter."
      },
      {
        term: "Naturligt experiment",
        def: "Situation där en extern händelse skapar variation som liknar randomisering, t.ex policyförändring eller cutoff-regel."
      },
      {
        term: "Difference-in-Differences (DiD)",
        def: "Metod som jämför förändringen över tid i en behandlad grupp med förändringen i en kontrollgrupp."
      },
      {
        term: "Regression Discontinuity Design (RDD)",
        def: "Metod som utnyttjar en cutoff-regel och jämför observationer precis ovanför och under gränsen."
      }
    ],
    flashcards: [
      {
        q: "Vad är den stora styrkan med ett RCT?",
        a: "Randomisering gör att behandlings- och kontrollgrupp är likartade i genomsnitt, vilket gör det möjligt att tolka skillnaden som en kausal effekt."
      },
      {
        q: "Vad är ett naturligt experiment?",
        a: "En verklig händelse eller policyförändring som skapar 'som-om-slumpmässig' variation i behandling, utan att forskaren kontrollerar den."
      },
      {
        q: "Vad är huvudantagandet i Difference-in-Differences?",
        a: "Att behandlad och kontrollgrupp skulle följt parallella trender över tid i frånvaro av behandlingen (parallel trends)."
      },
      {
        q: "Hur fungerar Regression Discontinuity Design?",
        a: "Man utnyttjar en cutoff-regel (t.ex betygsgräns) och jämför individer nära gränsen, där behandlingstilldelningen kan ses som nästan slumpmässig."
      },
      {
        q: "Ge ett exempel på naturligt experiment i utbildningslitteraturen.",
        a: "Angrist & Krueger utnyttjar födelsekvartal och obligatorisk skolplikt för att skapa exogen variation i utbildningslängd."
      }
    ]
  },

  // ------- BLOCK 8 -------
  {
    id: "block8",
    title: "Block 8 – Labour & Human Capital",
    description:
      "Arbetsmarknad, minimilön, könslönegap, humankapital och avkastning på utbildning.",
    concepts: [
      {
        term: "Humankapital",
        def: "Individens produktiva egenskaper: utbildning, erfarenhet, färdigheter, hälsa och socioemotionella förmågor."
      },
      {
        term: "Mincer-ekvationen",
        def: "Standardmodellen för lön: ln(wage) = α + β·schooling + γ·exp + δ·exp², där β är avkastningen per skolår."
      },
      {
        term: "Ability bias",
        def: "Snedvridning i skattningar av avkastning på utbildning när högförmågaindivider både utbildar sig mer och tjänar mer."
      },
      {
        term: "Motherhood penalty",
        def: "Långsiktig löne- och inkomstförlust för kvinnor efter att de fått barn, som inte syns hos män."
      },
      {
        term: "Minimum wage (minimilön)",
        def: "Lagstadgad lägstalön per timme eller månad som inte får underskridas."
      }
    ],
    flashcards: [
      {
        q: "Vad menas med humankapital?",
        a: "Alla egenskaper hos individen som påverkar produktiviteten: utbildning, erfarenhet, kunskap, färdigheter, hälsa och sociala förmågor."
      },
      {
        q: "Hur tolkas β i Mincer-ekvationen?",
        a: "Som den genomsnittliga procentuella löneökningen av ett extra år utbildning, givet erfarenhet."
      },
      {
        q: "Varför ger naiva löneregressioner ofta för hög skattad avkastning på utbildning?",
        a: "För att de inte kontrollerar för ability – högförmågaindivider utbildar sig oftare och har högre lön, vilket leder till ability bias."
      },
      {
        q: "Vad är motherhood penalty?",
        a: "En bestående nedgång i kvinnors inkomster efter barn, ofta via minskad arbetstid, karriäravbrott och sämre löneutveckling."
      },
      {
        q: "Hur skiljer sig signaling från humankapitalteori?",
        a: "Signaling hävdar att utbildning främst signalerar förmåga till arbetsgivare, medan humankapitalteori säger att utbildning ökar produktiviteten."
      },
      {
        q: "Vad visade Card & Krueger om minimilönens effekter?",
        a: "Att en höjd minimilön i New Jersey inte minskade sysselsättningen i fast-food, utan snarare ökade den jämfört med Pennsylvania."
      },
      {
        q: "Varför kan minimilön vara förenlig med högre sysselsättning i vissa modeller?",
        a: "I monopsoni-liknande arbetsmarknader kan en högre minimilön öka både lön och antal anställda."
      },
      {
        q: "Vad är ett naturligt experiment kring utbildning som används i litteraturen?",
        a: "Angrist & Krueger använder födelsekvartal och skolplikt för att skapa exogen variation i utbildning och skatta kausala effekter på lön."
      },
      {
        q: "Varför betonar Heckman vikten av tidiga investeringar i humankapital?",
        a: "För att 'skills begets skills': tidiga insatser gör senare utbildning mer effektiv och har därför högre avkastning."
      },
      {
        q: "Vad är ability bias och hur påverkar den vår tolkning av utbildningsavkastning?",
        a: "Ability bias innebär att observerade skillnader i lön mellan utbildningsnivåer delvis beror på medfödda eller tidiga förutsättningar, inte bara utbildningen i sig."
      }
    ]
  }
];

// =========================
//       KOMPONENTER
// =========================

type AccordionItemProps = {
  block: Block;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  block,
  isOpen,
  onToggle
}) => {
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onToggle}>
        <div className="accordion-header-text">
          <span className="accordion-title-main">{block.title}</span>
          <span className="accordion-title-sub">{block.description}</span>
        </div>
        <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div className={`accordion-panel ${isOpen ? "open" : ""}`}>
        <div className="panel-grid">
          <div className="card">
            <h3>
              Begrepp <span className="badge">Teori</span>
            </h3>
            <p className="subtle" style={{ marginBottom: "0.35rem" }}>
              Skumma igenom först, använd sedan flashcardsen för att testa dig
              själv.
            </p>
            <div className="scroll">
              <dl>
                {block.concepts.map((c) => (
                  <React.Fragment key={c.term}>
                    <dt>{c.term}</dt>
                    <dd>{c.def}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
          <FlashcardPanel block={block} />
        </div>
      </div>
    </div>
  );
};

type FlashcardPanelProps = {
  block: Block;
};

const FlashcardPanel: React.FC<FlashcardPanelProps> = ({ block }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const card = block.flashcards[index % block.flashcards.length];

  const next = () => {
    setIndex(prev => (prev + 1) % block.flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="card">
      <h3>
        Flashcards <span className="badge">Träning</span>
      </h3>
      <p className="subtle" style={{ marginBottom: "0.35rem" }}>
        Kort {index + 1} / {block.flashcards.length}
      </p>
      <div className="flashcard">
        <div>
          <div className="flash-label">Fråga</div>
          <div className="flash-question">{card.q}</div>
          {showAnswer && <div className="flash-answer">{card.a}</div>}
        </div>
        <div className="flash-actions">
          <button onClick={() => setShowAnswer(v => !v)}>
            {showAnswer ? "Dölj svar" : "Visa svar"}
          </button>
          <button onClick={next}>Nästa kort</button>
        </div>
      </div>
    </div>
  );
};

// =========================
//           APP
// =========================

const App: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(BLOCKS[0]?.id ?? null);

  return (
    <div className="app">
      <header className="header">
        <h1>NEK103 – Pluggportal</h1>
        <p className="subtle">
          Klicka på ett block för att se begrepp och öva på flashcards. Perfekt
          för intensivtentaplugg.
        </p>
        <div className="pill-row">
          <span className="pill">Mikro &amp; beteende</span>
          <span className="pill">Risk &amp; tid</span>
          <span className="pill">Hälsa &amp; miljö</span>
          <span className="pill">Arbetsmarknad &amp; humankapital</span>
          <span className="pill">Empiriska metoder</span>
        </div>
      </header>
      <div className="accordion">
        {BLOCKS.map(block => (
          <AccordionItem
            key={block.id}
            block={block}
            isOpen={openId === block.id}
            onToggle={() =>
              setOpenId(prev => (prev === block.id ? null : block.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;



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
        term: "Riskneutral",
        def: "linjär utility, bryr sig inte om risk"
      },
      {
        term: "Risksökande",
        def: "Konkav nyttokurva, konvex utility, föredrar risk"
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
      }, 
        {
        term: "Law of large numbers",
        def: "risk sprids i grupp → försäkring möjligt."
      }
    ],
    flashcards: [
      {
    q: "Vad är skillnaden mellan risk och osäkerhet?",
    a: "Risk: sannolikheter kända. Osäkerhet: sannolikheter okända, beslutsfattaren måste gissa eller använda subjektiva sannolikheter."
  },
  {
    q: "Varför räcker inte Expected Value (EV) för att beskriva mänskligt beteende?",
    a: "För att människor har riskpreferenser — de värderar säkerhet mer än risk. EV ignorerar utility."
  },
  {
    q: "Vad fångar Expected Utility (EU) som EV inte gör?",
    a: "EU tar hänsyn till att marginalnyttan av pengar minskar. En riskavert individ får lägre utility av osäkra utfall än av säkra med samma EV."
  },
  {
    q: "Vad innebär riskaversion på en utilityfunktion?",
    a: "Utilityfunktionen är konkav, u''(x) < 0. Varje extra krona ger mindre nytta → preferens för säkerhet."
  },
  {
    q: "Vad är certainty equivalent (CE)?",
    a: "Det säkra belopp som ger samma utility som lotteriet. Används för att kvantifiera riskaversion."
  },
  {
    q: "Vad är risk premium?",
    a: "Skillnaden mellan EV och CE. En riskavert individ är villig att 'betala bort' denna skillnad för att slippa risk."
  },
  {
    q: "Hur vet man om en individ är riskneutral genom EU?",
    a: "Utilityfunktionen är linjär, u(x) = ax + b. Då är CE = EV för alla lotterier."
  },
  {
    q: "Vad är moral hazard i försäkringar?",
    a: "När försäkring ändrar beteendet. Ex-ante: mindre prevention. Ex-post: dyrare/mer omfattande behandlingar när skadan väl inträffat."
  },
  {
    q: "Vad är adverse selection och när uppstår det?",
    a: "När hög-risk-kunder i större utsträckning än låg-risk-kunder köper försäkring. Uppstår när företaget inte kan observera risktypen."
  },
  {
    q: "Hur relaterar Akerlofs 'Market for Lemons' till försäkring?",
    a: "Informationsasymmetri gör att premien stiger när fler hög-risk-individer försäkrar sig, vilket kan göra att låg-risk lämnar marknaden och att bara 'dåliga risker' blir kvar."
  },
  {
    q: "Varför behövs ett stort och homogent kollektiv för försäkring?",
    a: "Law of large numbers kräver många oberoende risker. Då kan försäkringsbolaget uppskatta förväntade skador och sätta en stabil premie."
  },
  {
    q: "Vad innebär en actuarially fair premium?",
    a: "Premien är lika med förväntad skada. Försäkringen ger då ingen förväntad vinst för bolaget (ingen loading)."
  },
  {
    q: "Vad innebär insurance loading?",
    a: "Ett påslag över fair premium för att täcka administration, vinst och risk för oförväntade utfall."
  },
  {
    q: "Vad är representativeness-bias i riskbedömning?",
    a: "Människor tror att små sampel representerar helheten, vilket t.ex. leder till gambler’s fallacy: att tidigare utfall påverkar sannolikheter som egentligen är oberoende."
  },
  {
    q: "Vad är certainty effect?",
    a: "Människor övervärderar 100 % säkerhet jämfört med nästan säkerhet (t.ex. 99 %), mer än vad sannolikhetsskillnaden motiverar."
  },
  {
    q: "Vad är loss aversion i riskbedömning?",
    a: "Förluster upplevs starkare än vinster av samma storlek. Individer är ofta riskaverta i vinstdomänen men mer risksökande i förlustdomänen."
  },
  {
    q: "Vad är framing i riskbeslut?",
    a: "Hur information presenteras påverkar beslut, t.ex. om man beskriver ett program i termer av överlevnad (90 % överlever) eller dödlighet (10 % dör)."
  },
  {
    q: "Varför är vissa risker oförsäkringsbara?",
    a: "När riskerna är starkt korrelerade/systematiska (t.ex. stora naturkatastrofer), skadorna svåra att mäta eller när det finns risk för avsiktliga skador/fusk."
  },
  {
    q: "Vilka verktyg kan motverka moral hazard?",
    a: "Självrisk, medförsäkring (copay), maxersättning, bonus/malus-system, kontroll/monitoring och krav på prevention."
  },
  {
    q: "Varför kan staten fungera bättre än privata försäkringar för sjukvård?",
    a: "Staten kan göra försäkringen obligatorisk (motverka adverse selection), sprida risker över hela befolkningen och hantera systematiska risker samt fördela efter behov."
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
  { term: "Present Value (PV)", def: "Nuvarande värde av en framtida summa: PV = FV / (1+r)^t." },
  { term: "Future Value (FV)", def: "Framtida värde av en summa idag: FV = PV(1+r)^t." },
  { term: "Compounded interest", def: "Ränta på ränta-effekten som gör att tillgångar växer snabbare över tid." },

  // Tvåperiodsmodellen
  { term: "Endowment", def: "Individens resurser i period 1 och 2, t.ex lön idag och lön i framtiden." },
  { term: "Intertemporal budget constraint", def: "c1 + c2/(1+r) = y1 + y2/(1+r), bestämmer möjliga val över tid." },
  { term: "Intertemporal choice", def: "Val mellan konsumtion idag (c1) och konsumtion senare (c2)." },

  // Optimum
  { term: "Indifference curves", def: "Visar kombinationer av c1 och c2 som ger samma nytta. Brantare kurva = mer tålamod." },
  { term: "Intertemporal MRS", def: "MRS(c1, c2) = 1+r vid optimum; individens bytesvilja mellan nutid och framtid." },
  { term: "Income effect", def: "Ökad total rikedom → ökar c1 och c2." },
  { term: "Substitution effect", def: "Högre ränta gör framtida konsumtion billigare → individen sparar mer." },

  // Standardteorins antaganden
  { term: "Time consistency", def: "Beslut fattade idag över framtiden ångras inte när framtiden kommer." },
  { term: "Utility independence", def: "Nytta i en period beror inte på konsumtion i andra perioder." },
  { term: "Stationary utility", def: "Nytta bedöms likadant över tid; inga preferensförändringar." },
  { term: "No habit formation", def: "Tidigare konsumtion påverkar inte dagens nytta." },

  // Empiriska avvikelser
  { term: "Present bias", def: "Individer övervärderar nutida belöningar relativt framtida." },
  { term: "Juice-experimentet", def: "Visar att barn och vuxna väljer små belöningar idag framför större senare." },

  // Beta–delta-modellen
  { term: "Beta (β)", def: "Fångar present bias. β < 1 innebär övervärdering av nuet." },
  { term: "Delta (δ)", def: "Långsiktigt diskonteringsmått; hur starkt framtiden väger i beslut." },
  { term: "Quasi-hyperbolic discounting", def: "U(c0) + βδu(c1) + βδ^2u(c2)... som ger tidsinkonsistens." },

  // Typer av individer
  { term: "Naiv individ", def: "Tror framtida jag kommer ha bättre självkontroll än vad som faktiskt sker." },
  { term: "Sophisticated individ", def: "Inser sitt självkontrollproblem och söker skydd i commitment devices." },

  // Commitment devices
  { term: "Commitment device", def: "Bindande regler eller kontrakt som låser framtida beteende för att undvika impulsivitet." },
  { term: "Self-exclusion", def: "Att frivilligt blockera sig själv från oönskade val (ex. spel)." },
  { term: "Deadlines", def: "Framtvingar beteende genom tidsgränser." },
  { term: "Prepayment", def: "Förbetalning (ex. gymkort) som ökar motivationen att nyttja tjänsten." },

  // Övrigt
  { term: "Marshmallow-experimentet", def: "Visar variation i självkontroll och förekomst av tidsinkonsistens." },
  { term: "Financial literacy", def: "Kunskap om ränta, lån, sparande — låg nivå → sämre beslut över tid." }
],
   flashcards: [
  {
    q: "Vad är present value och varför används det?",
    a: "PV är värdet idag av en framtida summa. Det används för att jämföra beslut som sker vid olika tidpunkter på en gemensam värdeskala."
  },
  {
    q: "Hur påverkar räntan den intertemporala budgetlinjen?",
    a: "Högre ränta gör framtida konsumtion billigare relativt nutida konsumtion → budgetlinjen roterar → ökat sparande via substitutionseffekt."
  },
  {
    q: "Vad innebär MRS = 1 + r?",
    a: "Vid optimum är individen villig att byta 1 enhet konsumtion idag mot (1+r) enheter i framtiden → matchning med marknadens bytesförhållande."
  },
  {
    q: "Vad är skillnaden mellan en patient och en impatient individ?",
    a: "Patient: värderar framtiden högt, brant IC (sparar mer). Impatient: vill konsumera idag, flack IC (hög diskontering)."
  },
  {
    q: "Hur fungerar substitutionseffekten när räntan ökar?",
    a: "Framtida konsumtion blir relativt billigare → individen sparar mer och skjuter konsumtion till framtiden."
  },
  {
    q: "Hur fungerar inkomsteffekten när räntan ökar?",
    a: "Individen får högre avkastning på sparande → blir rikare → ökar både konsumtion idag och i framtiden."
  },
  {
    q: "Vilket centralt antagande bryts av present bias?",
    a: "Stationary instantaneous utility – egentligen förändras preferenser beroende på hur nära i tid en belöning är."
  },
  {
    q: "Vad fångar delta (δ) i beta-delta-modellen?",
    a: "Den långsiktiga diskonteringsfaktorn som anger hur starkt framtida nytta väger — 'vanlig' diskontering."
  },
  {
    q: "Vad fångar beta (β) i beta-delta-modellen?",
    a: "Den extra vikt som ges åt nuet. Om β < 1 → present bias, dvs nuet prioriteras oproportionerligt mycket."
  },
  {
    q: "Hur beter sig en 'naiv' individ med present bias?",
    a: "Tror att framtida jag inte kommer vara impulsiv → skjuter upp sparande, misslyckas med mål, tar dyra lån."
  },
  {
    q: "Hur beter sig en 'sophisticated' individ?",
    a: "Inser sina självkontrollproblem och söker därför commitment devices (låsta konton, deadlines, förskottsbetalning)."
  },
  {
    q: "Vad är ett commitment device?",
    a: "En självvald begränsning för att säkerställa att framtida jag följer dagens planer — t.ex fasträntesparande, deadlines, gymkort."
  },
  {
    q: "Hur förklarar beta-delta-modellen prokrastinering?",
    a: "När β < 1 övervärderas nuet → även om framtida nytta är större skjuter man upp viktiga aktiviteter."
  },
  {
    q: "Vad visar marshmallow-experimentet om tidskonsistens?",
    a: "Att individer varierar i självkontroll. Barn som kunde vänta hade bättre utbildnings-, inkomst- och hälsoutfall senare."
  },
  {
    q: "Vilken typ av policy passar individer med present bias bäst?",
    a: "Commitment-lösningar: förvalda sparalternativ, tidslåsta konton, deadlines, förskottsbetalning."
  },
  {
    q: "Hur påverkas sparande av låg finansiell kunskap?",
    a: "Låg financial literacy → bristande räntesförståelse → man sparar för lite och lånar för mycket/dyrt."
  },
  {
    q: "Vad är exponential discounting?",
    a: "Den klassiska modellen där diskonteringen är konstant över tid och preferenser är tidskonsistenta."
  },
  {
    q: "Varför bryter beta-delta-modellen tidkonsistens?",
    a: "Första periodens val viktas annorlunda än senare (β-parameter) → framtida jag ändrar planerna."
  },
  {
    q: "Hur kan företag utnyttja present bias?",
    a: "Genom produkter där nutida belöningar är stora men framtida kostnader dolda: prenumerationer, kreditkort, BNPL, gymkort."
  },
  {
    q: "Vad händer med optimum om räntan blir negativ?",
    a: "Konsumtion idag blir mer värdefull än framtida konsumtion → minskat sparande och större konsumtion nu."
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



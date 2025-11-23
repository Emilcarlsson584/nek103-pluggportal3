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
      // Homo economicus och beteende
    { term: "Homo economicus", def: "Rationell, självisk, perfekt optimerande individ med full information." },
    { term: "Beyond homo economicus", def: "Modeller som inkluderar sociala preferenser, emotioner, heuristics och begränsad rationalitet." },
    { term: "Decision utility", def: "Nyttan som människor förväntar sig före ett beslut (ex ante)." },
    { term: "Experience utility", def: "Nyttan som faktiskt upplevs efter beslut (ex post)." },

    // Effektivitet
    { term: "Paretoeffektivitet", def: "Ingen kan få det bättre utan att någon får det sämre." },
    { term: "Market efficiency", def: "I perfekt konkurrens maximeras total surplus." },
    { term: "Pareto improvement", def: "Förändring där någon får det bättre och ingen får det sämre." },
    { term: "Pareto frontier", def: "Mängden av alla möjliga Paretoeffektiva utfall." },

    // Fairness
    { term: "Equality", def: "Lika utfall." },
    { term: "Equity", def: "Rättvisa principer — inte nödvändigtvis lika utfall." },
    { term: "Substantive fairness", def: "Rättvisa i resultatet." },
    { term: "Procedural fairness", def: "Rättvisa i processen som leder till resultatet." },

    // Okun
    { term: "Okun’s leaky bucket", def: "Omfördelning innebär läckage via administration, skatteeffekter och beteendeförändringar." },

    // Social Welfare Functions
    { term: "Utilitarian SWF", def: "SWF = Σu_i. Maximerar summan av nyttor och motiverar omfördelning tills marginalnyttan är lika." },
    { term: "Rawlsian SWF", def: "SWF = min(u_i). Maximerar nyttan hos den sämst ställde (maximin-principen)." },

    // Equality of Opportunity
    { term: "Equality of opportunity", def: "Rättvisa ska bedömas efter möjligheter, inte utfall. Bakgrundsfaktorer ('accidents of birth') ska inte avgöra." },

    // Commodity egalitarianism
    { term: "Commodity egalitarianism", def: "Staten bör garantera grundläggande varor (mat, hälsa, utbildning), inte nödvändigtvis lika inkomster." },

    // Social Preferences
    { term: "Altruism", def: "Individen får nytta av andras nytta." },
    { term: "Warm glow", def: "Nytta av själva givandet, inte bara mottagarens nytta." },
    { term: "Inequality aversion", def: "Negativ utility av att ligga över eller under andra." },
    { term: "Status preferences", def: "Utility från relativ position snarare än absolut nivå." },

    // Well-being / Inequality
    { term: "Life satisfaction", def: "Subjektivt mått på hur nöjd individen är med sitt liv." },
    { term: "GDP criticism", def: "BNP fångar inte fritid, hälsa, miljö, oavlönat arbete eller ojämlikhet." },
    { term: "Lorenzkurva", def: "Visar kumulativ inkomstfördelning." },
    { term: "Gini-koefficient", def: "Mått på ojämlikhet: avstånd från perfekt jämlikhet." },
    { term: "Equivalence scales", def: "Justerar inkomster för hushållsstorlek och komposition." }
    ],
    flashcards: [
    {
      q: "Vad innebär Pareto-effektivitet och varför är det ett svagt rättvisekriterium?",
      a: "Det betyder att ingen kan få det bättre utan att någon får det sämre. Det säger ingenting om hur rättvis fördelningen är."
    },
    {
      q: "Kan en extremt ojämlik fördelning vara Pareto-effektiv?",
      a: "Ja. Även en fördelning där en person har allt kan vara Pareto-effektiv om alla förändringar gör någon sämre."
    },
    {
      q: "Vad är skillnaden mellan fairness och equality?",
      a: "Equality = lika utfall. Fairness = rättvisa principer. De kan ge olika policyrekommendationer."
    },
    {
      q: "Vad mäter en social welfare function?",
      a: "Hur samhället värderar olika fördelningar av nytta. Möjliggör normativa jämförelser mellan utfall."
    },
    {
      q: "Vad är utilitarismens syn på omfördelning?",
      a: "Omfördela tills marginalnyttan av pengar är lika i hela befolkningen."
    },
    {
      q: "Hur skiljer sig Rawls från utilitarism?",
      a: "Rawls maximerar nyttan hos den sämst ställde (maximin). Utilitarismen maximerar total nytta."
    },
    {
      q: "Vad innebär equality of opportunity?",
      a: "Att möjligheter ska vara jämlika, oberoende av bakgrund. Utfall får skilja sig baserat på val."
    },
    {
      q: "Vad betyder procedural fairness?",
      a: "Att processen är rättvis — t.ex lika möjligheter, transparens, opartiskhet — oavsett resultat."
    },
    {
      q: "Vad är Okun’s leaky bucket och vad illustrerar den?",
      a: "Att omfördelning innebär läckage: administrativa kostnader, skatteeffekter, beteendeeffekter. Visar equity–efficiency-tradeoff."
    },
    {
      q: "Hur kan social preferences leda till ineffektiva resultat i standardmodeller?",
      a: "Altruism, inequality aversion och status kan göra att individer avviker från nyttomaximering."
    },
    {
      q: "Vad är inequality aversion?",
      a: "När individer får lägre nytta av att ligga över eller under andra i inkomst."
    },
    {
      q: "Varför är statuskonsumtion ineffektivt?",
      a: "Alla tävlar om relativ position → mer arbete/konsumtion utan högre välfärd på samhällsnivå."
    },
    {
      q: "Hur relaterar nudges till fairness?",
      a: "Nudges förändrar beteende utan att minska valfrihet och kan därför uppfattas som mer rättvisa än skatter."
    },
    {
      q: "Hur påverkar equivalence scales fattigdomsmätning?",
      a: "Striktare skalor sänker justerad inkomst för stora hushåll → fler klassas som fattiga."
    },
    {
      q: "Vad är commodity egalitarianism?",
      a: "Idén att staten bör garantera vissa basvaror (hälsa, utbildning, mat) oavsett inkomstnivå."
    },
    {
      q: "Hur påverkar 'accidents of birth' rättviseargument?",
      a: "De är faktorer individen inte kan påverka (t.ex. kön, föräldrar) och används som argument för omfördelning."
    },
    {
      q: "Vad är skillnaden mellan absolut och relativ fattigdom?",
      a: "Absolut: behovsbaserad miniminivå. Relativ: låg inkomst jämfört med övriga samhället."
    },
    {
      q: "Varför mäter BNP inte välbefinnande bra?",
      a: "BNP tar inte hänsyn till fritid, hälsa, miljö, ojämlikhet eller välmående."
    },
    {
      q: "Vad är life satisfaction och varför används det?",
      a: "Ett subjektivt mått på hur nöjd individen är med livet. Kompletterar objektiva mått som inkomst."
    },
    {
      q: "Hur kan man argumentera för att ojämlikhet ibland är rättvis?",
      a: "Om den speglar individuella val och ansträngning (procedural fairness)."
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
        // Typer av ojämlikhet
    {
      term: "Income inequality",
      def: "Skillnader i inkomster (t.ex. lön + kapitalinkomster) mellan individer eller hushåll."
    },
    {
      term: "Wealth inequality",
      def: "Skillnader i förmögenhet. Förmögenhetsojämlikhet är typiskt mycket större än inkomstojämlikhet."
    },
    {
      term: "Market income",
      def: "Inkomst före skatter och transfereringar (lön + kapitalinkomster)."
    },
    {
      term: "Disposable income",
      def: "Inkomst efter skatter och transfereringar. Visar vilken standard hushållet faktiskt har."
    },
    {
      term: "Within-country inequality",
      def: "Inkomstojämlikhet inom ett land (t.ex. Sverige)."
    },
    {
      term: "Between-country inequality",
      def: "Skillnader i genomsnittlig inkomst mellan länder (t.ex. Sverige vs Indien)."
    },

    // Lorenzkurva
    {
      term: "Lorenzkurva",
      def: "Grafisk illustration av ojämlikhet: x-axeln visar kumulativ andel befolkning (fattig → rik), y-axeln kumulativ inkomstandel. 45°-linjen är perfekt jämlikhet."
    },
    {
      term: "Anonymity (Lorenzkurvan)",
      def: "Det spelar ingen roll vem som har vilken inkomst, bara fördelningen som helhet."
    },
    {
      term: "Population principle",
      def: "Lorenzkurvan ska inte påverkas av att befolkningen blir större eller mindre – bara andelar spelar roll."
    },
    {
      term: "Scale invariance",
      def: "Om alla inkomster multipliceras med samma faktor (t.ex. dubbleras) förändras inte ojämlikheten."
    },

    // Gini
    {
      term: "Gini-koefficient",
      def: "Sammanfattande mått på ojämlikhet baserat på Lorenzkurvan: G = A/(A+B), 0 = perfekt jämlikhet, 1 = maximal ojämlikhet."
    },

    // Equivalence scales
    {
      term: "Equivalence scales",
      def: "Metoder för att justera hushållsinkomst för hushållsstorlek och sammansättning (t.ex. OECD-skalor, square root) för rättvis jämförelse."
    },
    {
      term: "Economies of scale i hushåll",
      def: "Större hushåll behöver inte lika mycket per person eftersom vissa kostnader delas."
    },

    // Categorical inequality
    {
      term: "Categorical (group) inequality",
      def: "Skillnader mellan grupper baserade på 'accidents of birth', t.ex. kön, etnicitet, religion, föräldrar, födelseland."
    },

    // Intergenerational mobility
    {
      term: "Intergenerational mobility",
      def: "Hur mycket barns ekonomiska utfall beror på föräldrarnas utfall. Hög mobilitet = svag koppling."
    },
    {
      term: "Intergenerational Elasticity (IGE)",
      def: "Mäter hur starkt barns inkomster korrelerar med föräldrars inkomster. IGE nära 1 → låg mobilitet, IGE nära 0 → hög mobilitet."
    },

    // Global inequality
    {
      term: "Country-weighted inequality",
      def: "Mäter ojämlikhet mellan länder utifrån länders medelinkomster."
    },
    {
      term: "Global individual-based Gini",
      def: "Mäter ojämlikhet för alla individer i världen, inte bara ländernas medelvärden."
    },

    // Middle class & orsaker
    {
      term: "Middle class erosion",
      def: "Minskande andel medelinkomstjobb; fler jobb i låg- och höginkomstsegment → polarisering."
    },
    {
      term: "Sources of inequality",
      def: "Teknologi, globalisering, institutioner, politik (skatt/bidrag), utbildningsskillnader, hälsa och humankapital."
    },

    // Normativt
    {
      term: "When is inequality unfair?",
      def: "När den beror på faktorer individen inte kan påverka (accidents of birth) och när möjligheterna är strukturellt olika."
    }
    ],
    flashcards: [
    {
      q: "Vad visar Lorenz-kurvan?",
      a: "Hur stor andel av den totala inkomsten som ägs av den fattigaste x% av befolkningen. Ger en visuell representation av ojämlikhet."
    },
    {
      q: "Varför visar Lorenz-kurvan alltid en konvex form vid ojämlikhet?",
      a: "De första procenten av befolkningen äger väldigt lite av total inkomst, vilket gör att kurvan ligger klart under 45°-linjen."
    },
    {
      q: "Vad betyder en Gini på 0,5?",
      a: "Det tyder på hög ojämlikhet. Halva ytan mellan perfekt jämlikhet och Lorenzkurvan är 'fylld'. Typiskt för mer ojämlika länder."
    },
    {
      q: "Varför används ekvivalensskalor?",
      a: "För att jämföra inkomster mellan hushåll med olika storlek och sammansättning på ett rättvist sätt. Större hushåll behöver inte lika mycket per person."
    },
    {
      q: "Hur påverkar valet av ekvivalensskala mätning av fattigdom?",
      a: "Strängare skalor (t.ex. square root) sänker justerad inkomst per person och kan göra att fler hushåll hamnar under fattigdomsgränsen."
    },
    {
      q: "Vad innebär skillnaden mellan market och disposable income?",
      a: "Den visar hur mycket staten omfördelar via skatter och transfereringar. Stor skillnad → kraftig omfördelningspolitik."
    },
    {
      q: "Varför är wealth inequality normalt högre än income inequality?",
      a: "Förmögenhet ackumuleras över tid, växer med avkastning och kan ärvas, medan inkomster är mer kortsiktiga och ofta mer beskattade."
    },
    {
      q: "Hur kan teknologi öka ojämlikhet?",
      a: "Skill-biased technological change gynnar högutbildade och högkvalificerade jobb, vilket ökar deras löner relativt lågutbildade."
    },
    {
      q: "Vad är intergenerational elasticity (IGE)?",
      a: "Ett mått på hur starkt barns inkomster beror på föräldrarnas. Hög IGE → låg mobilitet, låg IGE → hög mobilitet."
    },
    {
      q: "Varför ökar within-country inequality i många OECD-länder?",
      a: "P.g.a. globalisering, teknologisk förändring, svagare fack, lägre skatter på höga inkomster och ökade kapitalinkomster."
    },
    {
      q: "Varför minskar global inequality samtidigt som nationell inequality ökar?",
      a: "Fattiga länder som Kina och Indien växer snabbare (minskad mellan-länder-oägmlikhet), men inom-länder ökar klyftorna."
    },
    {
      q: "Vad beskriver population principle för Lorenzkurvan?",
      a: "Att kurvans form inte ska påverkas av att vi multiplicerar befolkningen; bara andelar spelar roll."
    },
    {
      q: "Hur kan policy påverka Gini-koefficienten?",
      a: "Progressiv beskattning, transfereringar och välfärdsprogram minskar Gini för disponibel inkomst."
    },
    {
      q: "Vad menas med 'middle class hollowing out'?",
      a: "Att jobb i mitten försvinner relativt sett, medan både låg- och höginkomstjobb ökar → en mer polariserad inkomstfördelning."
    },
    {
      q: "Vilken roll spelar utbildning för inkomstojämlikhet?",
      a: "Skillnader i utbildning skapar skillnader i löner och livsinkomster och är en central drivkraft bakom ojämlikhet."
    },
    {
      q: "Vad fångar relative income hypothesis?",
      a: "Att individers välbefinnande beror på relativ inkomst (jämfört med andra), inte bara absolut nivå."
    },
    {
      q: "Varför kan Gini-koefficienten ibland vara missvisande?",
      a: "Två olika inkomstfördelningar kan ha samma Gini, trots att ojämlikheten ligger i olika delar av fördelningen (t.ex. botten vs toppen)."
    },
    {
      q: "Vad är skillnaden mellan pre-tax och post-tax inequality?",
      a: "Pre-tax mäter marknadsfördelningen, post-tax visar faktisk ojämlikhet efter statens skatter och transfereringar."
    },
    {
      q: "Hur kan migration påverka ojämlikhet?",
      a: "Den kan minska global ojämlikhet (fattiga flyttar till rikare länder) men kan både öka och minska ojämlikhet inom ett enskilt land beroende på arbetsmarknaden."
    },
    {
      q: "Vad menas med 'accidents of birth' i ojämlikhetsdiskussioner?",
      a: "Faktorer individen inte kan styra över, som kön, föräldrar, etnicitet, födelseland. Dessa ses ofta som legitima skäl för omfördelning."
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
       // 1. Varför hälsa skiljer sig från andra varor
    {
      term: "Need (behov)",
      def: "Hälsa anses vara en nödvändighet snarare än en vanlig konsumtionsvara."
    },
    {
      term: "Right (rättighet)",
      def: "I många länder anses hälsa vara en rättighet, vilket påverkar hur vård finansieras och tillhandahålls."
    },
    {
      term: "Positive externalities",
      def: "När en individ tar en åtgärd (t.ex. vaccination) som skapar fördelar för andra."
    },
    {
      term: "Negative externalities",
      def: "När en handling (t.ex. antibiotikaanvändning) skapar negativa effekter för andra."
    },
    {
      term: "Asymmetric information",
      def: "Patient-läkare, patient-försäkringsbolag och försäkringsbolag-vårdgivare har olika information."
    },
    {
      term: "Irreversibility",
      def: "Dålig hälsa kan vara svår att återställa, vilket gör prevention extra värdefull."
    },

    // 2. Demand for health care
    {
      term: "Need vs want",
      def: "Need = medicinskt behov. Want = efterfrågan även utan behov."
    },
    {
      term: "Grossman-modellen",
      def: "Hälsa behandlas som ett kapital som deprecieras över tid och kan ökas via investeringar som vård, kost och motion."
    },
    {
      term: "Depreciation rate",
      def: "Hastigheten som hälsokapital slits — högre vid äldre ålder."
    },
    {
      term: "Health as consumption good",
      def: "Hälsa ger direkt nytta genom välmående."
    },
    {
      term: "Health as investment good",
      def: "Hälsa ökar produktivitet och framtida inkomster."

    },

    // 3. Beteende & hälsa
    {
      term: "Obesity paradox",
      def: "Modern miljö sänker kostnad för snacking, snabbmat och gör träning dyrare tidsmässigt."
    },
    {
      term: "Crowding out (Mellström & Johannesson)",
      def: "Monetära incitament kan minska altruistiskt beteende, t.ex bloddonationer."
    },
    {
      term: "Gym membership bias",
      def: "Folk överskattar sitt framtida tränande pga present bias."
    },
    {
      term: "Charness & Gneezy",
      def: "Ekonomiska incitament kan skapa långsiktiga vanor om de är tillräckligt starka."
    },

    // 4. Health insurance
    {
      term: "Full coverage",
      def: "0% egenkostnad; individen betalar inget för vård."
    },
    {
      term: "Copayment",
      def: "Procentuell del individen betalar av kostnaden per besök."
    },
    {
      term: "Deductible (självrisk)",
      def: "Belopp som individen måste betala själv innan försäkringen träder in."
    },
    {
      term: "Maximum / stop-loss",
      def: "Maximalt belopp individen kan behöva betala under ett år."
    },

    // 5. Informationsasymmetrier
    {
      term: "Adverse selection",
      def: "Hög-risk-individer köper försäkring i högre grad → premiehöjningar → risk för marknadskollaps."
    },
    {
      term: "Community rating",
      def: "Alla betalar samma premie, kräver ofta obligatorisk anslutning."
    },
    {
      term: "Cream skimming",
      def: "Försäkringsbolag försöker locka låg-risk-individer."
    },
    {
      term: "Moral hazard (ex ante)",
      def: "Mindre prevention eftersom kostnaderna täcks av försäkring."
    },
    {
      term: "Moral hazard (ex post)",
      def: "Överdriven konsumtion av vård pga låg egenkostnad."
    },

    // 6. RAND-experimentet
    {
      term: "RAND HIE",
      def: "Stort RCT som randomiserade egenavgifter. Vård är oelastisk, mer egenavgift → mindre konsumtion utan sämre hälsa."
    },

    // 7. Supply side
    {
      term: "Supplier-induced demand",
      def: "Läkare rekommenderar mer vård än nödvändigt pga informationsasymmetri."
    },
    {
      term: "Principal-agent-problem",
      def: "Patienten (principal) litar på läkaren (agent) men deras intressen kan skilja sig."
    },
    {
      term: "Fee-for-service",
      def: "Betalning per åtgärd → risk för överbehandling."
    },
    {
      term: "Salary",
      def: "Läkaren får fast lön → inga volymincitament."
    },
    {
      term: "Capitation",
      def: "Fast ersättning per patient → incitament att undvika dyr vård."
    },
    {
      term: "DRG",
      def: "Ersättning per diagnos. Motverkar extrem överbehandling och sätter kostnadstak."
    },

    // 8. Inequality in health care
    {
      term: "Equality of access",
      def: "Alla har tillgång till vård."
    },
    {
      term: "Equality of use",
      def: "Alla använder lika mycket vård — inte alltid rättvist."
    },
    {
      term: "Equality of health",
      def: "Alla ska ha lika hälsoutfall — mer ambitiöst."
    },
    {
      term: "Need standardization",
      def: "Justering av vårdkonsumtion efter medicinskt behov."
    },
    {
      term: "Concentration curve",
      def: "Visar hur vård fördelas över inkomstgrupper liknande Lorenz-kurvan."
    },
    {
      term: "Concentration index",
      def: "Motsvarighet till Gini men för vårdkonsumtion."
    },

    // 9. Priority setting
    {
      term: "Människovärdesprincipen",
      def: "Alla människor har lika värde oberoende av egenskaper."
    },
    {
      term: "Behovsprincipen",
      def: "De med störst behov ska prioriteras först."
    },
    {
      term: "Kostnadseffektivitetsprincipen",
      def: "Resurser ska ge största möjliga hälsovinst per krona."
    },

    // 10. Utmaningar framåt
    {
      term: "Sisyphus syndrome",
      def: "Ny teknik möjliggör behandling av fler tillstånd → ökad efterfrågan → stigande kostnader."
    },
    {
      term: "Global health workforce mobility",
      def: "Konkurrens om vårdpersonal mellan länder skapar brist."
    }
    ],
    flashcards: [
    {
      q: "Varför fungerar inte sjukvård som en vanlig marknad?",
      a: "Pga asymmetrisk information, externa effekter, osäkerhet, och att hälsa är en need snarare än en want."
    },
    {
      q: "Vad är skillnaden mellan need och want i vård?",
      a: "Need = medicinskt nödvändigt. Want = efterfrågad vård trots att behov saknas."
    },
    {
      q: "Vad är kärnan i Grossman-modellen?",
      a: "Hälsa är både konsumtionsvara och investeringsvara. Individer väljer investeringar i hälsokapital som deprecieras med tiden."
    },
    {
      q: "Varför deprecieras hälsokapital snabbare vid hög ålder?",
      a: "Biologiska processer gör att kroppen försämras snabbare och kräver större hälsovårdsinsatser."
    },
    {
      q: "Hur påverkar inkomster hälsa enligt Grossman?",
      a: "Högre inkomst gör det billigare att investera i hälsa och leder normalt till högre hälsostock."
    },
    {
      q: "Varför är copayments viktiga?",
      a: "De minskar moral hazard genom att individen betalar en del av kostnaden."
    },
    {
      q: "Vad visar RAND-experimentet om priselasticitet?",
      a: "Elasticitet −0.1 till −0.2 → vård är oelastisk. Konsumtionen minskar med högre självrisk, men hälsan påverkas knappt."
    },
    {
      q: "Hur påverkade hög självrisk hälsa i RAND?",
      a: "Nästan ingen påverkan — individer minskade främst onödig vård, inte nödvändig vård."
    },
    {
      q: "Vad är adverse selection i sjukförsäkring?",
      a: "Hög-risk-individer köper försäkring i större grad → premiehöjningar → risk för marknadskollaps."
    },
    {
      q: "Vad är cream skimming?",
      a: "Försäkringsbolag försöker attrahera låg-risk-individer för att sänka sina kostnader."
    },
    {
      q: "Vad är ex ante moral hazard?",
      a: "Mindre prevention eftersom försäkring minskar kostnaden av ohälsa."
    },
    {
      q: "Vad är ex post moral hazard?",
      a: "Överdriven konsumtion av vård eftersom individen inte betalar hela kostnaden själv."
    },
    {
      q: "Varför är fee-for-service problematiskt?",
      a: "Det ger incitament för överbehandling."
    },
    {
      q: "Vad är capitation?",
      a: "Fast ersättning per patient. Skapar incitament att undvika onödig vård men risk för underbehandling."
    },
    {
      q: "Vad innebär supplier-induced demand?",
      a: "Läkaren rekommenderar mer behandling än nödvändigt pga informationsövertag."
    },
    {
      q: "Vad är concentration index?",
      a: "Ett mått på hur vård är fördelad över inkomstgrupper. Positiv CI → rika konsumerar mer vård."
    },
    {
      q: "Vad är need standardization?",
      a: "Justering av vårdkonsumtion efter medicinskt behov för att identifiera faktisk ojämlikhet."
    },
    {
      q: "Vad innebär behovsprincipen?",
      a: "De som har störst medicinskt behov ska prioriteras först."
    },
    {
      q: "Vad är Sisyphus syndrome?",
      a: "Teknologiska framsteg ökar behandlingsmöjligheter → efterfrågan på vård stiger → kostnaderna ökar."
    },
    {
      q: "Hur relaterar present bias till gymmedlemskap?",
      a: "Individer överskattar framtida träning → köper dyra abonnemang → tränar mindre än planerat."
    },
    {
      q: "Vad är argumentet för offentlig finansiering av vård?",
      a: "Motverkar adverse selection, möjliggör riskdelning och garanterar att vård ges efter behov."
    },
    {
      q: "Hur fungerar monetary incentives i hälsa enligt Charness & Gneezy?",
      a: "Starka incitament kan skapa långsiktiga vanor (habit formation)."
    },
    {
      q: "Hur påverkar externa effekter vårdpolitiken?",
      a: "Vaccinationer bör subventioneras; antibiotika bör regleras för att minska resistens."
    },
    {
      q: "Vad är principal-agent-problem i vården?",
      a: "Läkaren (agenten) kan ha andra incitament än patienten (principal)."
    },
    {
      q: "Vad innebär equality of access?",
      a: "Alla ska ha lika möjlighet att få vård — centralt i offentliga system."
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



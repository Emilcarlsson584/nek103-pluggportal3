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
       // 1. Externalities
    { term: "Negative externality", def: "Handling som skadar tredje part, t.ex utsläpp eller buller." },
    { term: "Positive externality", def: "Handling som gynnar tredje part, t.ex utbildning, pollinering." },
    { term: "MPC (Marginal Private Cost)", def: "Marginalkostnad för producenten själv." },
    { term: "MEC (Marginal External Cost)", def: "Kostnaden som drabbar andra." },
    { term: "MSC (Marginal Social Cost)", def: "MSC = MPC + MEC. Samhällets totala marginalkostnad." },
    { term: "Overproduction problem", def: "Negativa externaliteter leder till för hög produktion i marknaden." },

    // 2. Coase theorem
    { term: "Coase theorem", def: "Om äganderätter är väldefinierade och transaktionskostnader = 0 → privata förhandlingar ger Pareto-effektivitet." },
    { term: "Distribution vs efficiency", def: "Coase säger att äganderätt påverkar fördelning, inte effektivitet." },
    { term: "Transaktionskostnader", def: "Hinder som gör Coase-lösning svår: många offer, juridik, mätproblem, brist på information." },

    // 3. Government interventions
    { term: "Command-and-control regulation", def: "Direkta regler/standarder som begränsar utsläpp." },
    { term: "Pigouvian tax", def: "Skatt som motsvarar MEC för att internalisera externaliteten." },
    { term: "Subsidy (positive externality)", def: "Stöd för åtgärder som skapar samhällsnytta." },
    { term: "Compensation", def: "Skadevållare kompenserar drabbade." },
    { term: "Environmental information", def: "Nudges, märkning och energiinformation." },

    // 4. Growth & climate
    { term: "Positive feedback loops", def: "Processer som förstärker sig själva, t.ex is-smältning → mindre albedo." },
    { term: "Stock pollutant", def: "Förorening som ackumuleras över tid (CO₂)." },
    { term: "Irreversibility", def: "Skador som inte kan återställas, t.ex tipping points." },

    // 5. Abatement
    { term: "Abatement cost curve", def: "Marginalkostnaden för att minska utsläpp med en extra enhet." },
    { term: "Least-cost abatement", def: "Att reducera utsläpp där det är billigast först." },
    { term: "MRT", def: "Marginal Rate of Transformation — kostnaden i konsumtion för miljöförbättring." },
    { term: "MRS", def: "Marginal Rate of Substitution — medborgarnas WTP för miljö." },
    { term: "Optimal abatement", def: "MRS = MRT." },
    { term: "Technological improvement", def: "Gör abatement billigare och skjuter produktionsteknologi utåt." },

    // 6. Cap-and-trade
    { term: "Cap-and-trade", def: "Utsläppstak + handel med utsläppsrätter." },
    { term: "Allowance allocation", def: "Auction (effektivt) eller grandfathering (politisk genomförbarhet)." },
    { term: "Permit price volatility", def: "Pris svänger med konjunktur och efterfrågan." },

    // 7. Cost–Benefit Analysis (CBA)
    { term: "Direct costs", def: "Teknik, investeringar, drift." },
    { term: "Indirect costs", def: "Förlorad konsumtion eller substitution." },
    { term: "Administrative costs", def: "Kostnader för övervakning och genomförande." },
    { term: "Use value", def: "Direkt nyttjande av natur (fiske, rekreation)." },
    { term: "Non-use value", def: "Värde av att naturen finns kvar, även om man inte använder den." },
    { term: "Option value", def: "Värdet av att ha möjlighet att nyttja naturen i framtiden." },

    // 8. Contingent Valuation
    { term: "Contingent valuation", def: "Stated preference-metod för att mäta WTP för miljöförändringar." },
    { term: "Dichotomous choice", def: "Effektivaste elicitation-metoden i CV." },
    { term: "Hypothetical bias", def: "Folk anger högre WTP än de skulle betala i verkligheten." },
    { term: "Strategic bias", def: "Respondenter manipulerar sina svar beroende på incitament." },

    // 9. Value of a Statistical Life (VSL)
    { term: "Value of a Statistical Life (VSL)", def: "WTP för en liten riskreduktion dividerat med riskreduktionen." },
    { term: "Risk perception problems", def: "Svårt att förstå små sannolikheter och risker." },

    // 10. Behavioral environmental economics
    { term: "Default effects", def: "Standardval styr beteende, t.ex dubbel-sidigt utskrift." },
    { term: "Social norms", def: "Information om andras beteende styr individens val." },
    { term: "Moral appeals", def: "Har ofta liten effekt på miljöbeteende." },
    { term: "Short-run vs long-run behavior", def: "Nudges kan tappa effekt över tid." }
    ],
    flashcards: [
     {
      q: "Vad är skillnaden mellan MPC och MSC?",
      a: "MPC är producentens marginalkostnad. MSC = MPC + MEC. Ineffektivitet uppstår eftersom MPC < MSC vid negativa externaliteter."
    },
    {
      q: "Varför produceras för mycket vid negativa externaliteter?",
      a: "Producenten tar inte hänsyn till MEC → priset blir för lågt → kvantiteten för hög."
    },
    {
      q: "Hur löser en Pigou-skatt en negativ externalitet?",
      a: "Genom att sätta skatt = MEC, så möter producenten MSC och väljer den samhällsoptimala mängden."
    },
    {
      q: "Vad säger Coase-teoremet?",
      a: "Med noll transaktionskostnader och väldefinierade äganderätter når parterna Pareto-effektivitet via förhandling."
    },
    {
      q: "Varför håller Coase ofta inte i verkligheten?",
      a: "Pga många berörda, mätproblem, asymmetri, enforcement-kostnader och höga transaktionskostnader."
    },
    {
      q: "Vad är fördelen med cap-and-trade jämfört med regulation?",
      a: "Billigaste utsläppsminskningarna sker först → minskar totalkostnaden."
    },
    {
      q: "Varför kan cap-and-trade ge fel politiska signaler?",
      a: "Eftersom man 'köper rätten' att släppa ut → kan uppfattas som att utsläpp är okej om man betalar."
    },
    {
      q: "Vad är least-cost abatement?",
      a: "Minska utsläpp där det är billigast först för att minimera samhällets kostnad."
    },
    {
      q: "Vad är skillnaden mellan MRT och MRS?",
      a: "MRT = kostnaden i produktion för miljöförbättring. MRS = medborgarnas betalningsvilja. Optimum: MRS = MRT."
    },
    {
      q: "Hur påverkar teknologisk utveckling optimal abatement?",
      a: "Teknologin minskar MRT → mer miljöskydd är samhällsekonomiskt optimalt."
    },
    {
      q: "Vad är option value?",
      a: "Värdet av att bevara möjligheten att använda naturen i framtiden även om man inte använder den nu."
    },
    {
      q: "Vad är hedonic pricing?",
      a: "Värdering av miljöegenskaper genom marknadspriser, t.ex fastighetspriser kopplat till luftkvalitet."
    },
    {
      q: "Varför används stated preference-metoder?",
      a: "För att värdera miljövaror utan marknadspris, som arter och landskap."
    },
    {
      q: "Vad är hypothetical bias?",
      a: "Respondenter anger högre WTP i hypotetiska scenarier än de skulle betala i verkligheten."
    },
    {
      q: "Hur räknar man ut VSL?",
      a: "VSL = WTP / riskreduktion. Ex: 400 kr / (1/100000) = 40 miljoner."
    },
    {
      q: "Varför är VSL kontroversiellt?",
      a: "Det sätter monetärt värde på liv och bygger på små sannolikheter som folk ofta missförstår."
    },
    {
      q: "Ge ett exempel på en positiv externalitet inom miljö.",
      a: "Grönområden förbättrar luft, minskar buller och ökar livskvalitet."
    },
    {
      q: "Vad är en positive feedback loop i klimatet?",
      a: "Is smälter → lägre albedo → mer värmeabsorbering → mer issmältning."
    },
    {
      q: "Varför är CO₂ en stock pollutant?",
      a: "Det ackumuleras i atmosfären under mycket lång tid och påverkan beror på total stock, inte årliga flöden."
    },
    {
      q: "Varför räcker det inte att bara minska utsläppen?",
      a: "Stocken måste stabiliseras. Även minskade utsläpp ökar stocken om de är > nollsänkorna."
    },
    {
      q: "Vad är moral appeals inom miljö?",
      a: "Budskap som försöker få människor att agera genom moral – men har ofta liten effekt."
    },
    {
      q: "Varför fungerar social norms som nudge?",
      a: "Folk svarar starkt på jämförelser med andra ('din granne använder 15% mindre vatten')."
    },
    {
      q: "Vad är marginal abatement cost?",
      a: "Kostnaden för att minska utsläpp med en extra enhet."
    },
    {
      q: "Varför är win-win-åtgärder viktiga?",
      a: "De minskar utsläpp och sparar pengar — borde implementeras direkt eftersom de har negativ kostnad."
    },
    {
      q: "Vad avgör om nudges fungerar långsiktigt?",
      a: "Om beteendet är vanebundet och om nudgen förändrar incitament på sikt — många nudges tappar effekt i long run."
    }
    ]
  },

  // ------- BLOCK 7 -------
  {
    id: "block7",
    title: "Block 7 – Interventions & Empirical Methods",
    description: "Policyutvärdering, RCT, naturliga experiment, DiD och RDD.",
    concepts: [
     // 1. Varför empiriska metoder?
    {
      term: "Kausalitet vs korrelation",
      def: "Korrelation visar samvariation men inte orsakssamband. Kausalitet kräver kontroll för confounders och omvänd kausalitet."
    },
    {
      term: "Policyutvärdering",
      def: "Att med data undersöka effekter av reformer och interventioner."
    },

    // 2. RCT
    {
      term: "Randomized Controlled Trial (RCT)",
      def: "Experiment där individer randomiseras till behandling eller kontroll, vilket ger hög intern validitet."
    },
    {
      term: "Intern validitet (RCT)",
      def: "Hög – randomisering gör grupperna jämförbara."
    },
    {
      term: "Extern validitet (RCT)",
      def: "Ofta begränsad eftersom experiment görs i specifika miljöer/populationer."
    },

    // 3. Naturliga/quasi-experiment
    {
      term: "Naturligt experiment",
      def: "Exogen policy/händelse som skapar variation liknande randomisering."
    },
    {
      term: "Quasi-experiment",
      def: "Design som använder institutionella regler (cutoffs, tidpunkter) för att skapa exogen variation."
    },

    // 4. Difference-in-Differences
    {
      term: "Difference-in-Differences (DiD)",
      def: "Metod som jämför förändringen över tid i en behandlad grupp med förändringen i en kontrollgrupp."
    },
    {
      term: "Parallel trends-antagandet",
      def: "I frånvaro av behandling skulle grupperna följt samma trend över tid."
    },

    // 5. Regression Discontinuity Design
    {
      term: "Regression Discontinuity Design (RDD)",
      def: "Metod som utnyttjar en cutoff – individer precis över/under gränsen antas vara jämförbara."
    },
    {
      term: "Sharp RDD",
      def: "Behandling bestäms strikt av cutoffs-regeln."
    },
    {
      term: "Fuzzy RDD",
      def: "Cutoff ändrar sannolikheten för behandling men inte perfekt – analyseras ofta med IV-teknik."
    },

    // 6. Instrumental Variables
    {
      term: "Instrumental Variables (IV)",
      def: "Metod för att hantera endogenitet genom ett instrument som påverkar X men endast påverkar Y via X."
    },
    {
      term: "Endogenitet",
      def: "När en förklarande variabel är korrelerad med feltermen, t.ex utbildning och inneboende förmåga i lönemodeller."
    },

    // 7. Validitet
    {
      term: "Intern validitet",
      def: "Hur väl en studie identifierar ett kausalt samband givet data och metod."
    },
    {
      term: "Extern validitet",
      def: "Hur väl resultaten generaliserar till andra miljöer, populationer och tidpunkter."
    },

    // 8. Policyinterventioner
    {
      term: "Policyinstrument",
      def: "Skatter, subventioner, regleringar, förbud, kontantöverföringar, program, nudges, information etc."
    },

    // 9. Cost-effectiveness vs Cost-benefit
    {
      term: "Cost-effectiveness analysis",
      def: "Jämför kostnad per enhet outcome (t.ex kostnad per räddat liv) utan att värdera outcome i pengar."
    },
    {
      term: "Cost-benefit analysis",
      def: "Monetariserar alla effekter och jämför med kostnader. Beslut baseras på nettonytta."
    },

    // 10. Behavioral interventions
    {
      term: "Nudges",
      def: "Förändringar i valarkitektur som påverkar beteende utan att ändra monetära incitament."
    },
    {
      term: "Behavioral interventions",
      def: "Standardbrev, default-alternativ, social information, commitment devices, salience och framing."
    },
    {
      term: "Regression to the mean",
      def: "Extrema observationer tenderar att bli mindre extrema vid nästa mätning – viktigt att kontrollera för i utvärderingar."
    },
    {
      term: "Before/after-studier",
      def: "Studier utan kontrollgrupp. Känsliga för samtidiga förändringar och trendbrott."
    }
    ],
    flashcards: [
 {
      q: "Varför räcker inte korrelation för att dra slutsatser om kausalitet?",
      a: "Korrelation fångar samvariation men inte om A orsakar B. Sambandet kan bero på omvänd kausalitet eller tredje variabler (confounders)."
    },
    {
      q: "Vad är huvudstyrkan med RCT?",
      a: "Randomisering säkerställer att behandlings- och kontrollgrupp är lika i genomsnitt, både i observerade och oobserverade dimensioner, vilket ger en ren kausal effekt."
    },
    {
      q: "Vad är extern validitet och varför är den ofta låg i RCTs?",
      a: "Extern validitet är generaliserbarhet. RCTs sker ofta i specifika miljöer med selekterade deltagare, vilket gör att resultaten inte alltid gäller för hela populationen."
    },
    {
      q: "Vad är skillnaden mellan natural och quasi-experiment?",
      a: "Natural experiments bygger på händelser utanför forskarens kontroll. Quasi-experiment använder policyregler (cutoffs, tidpunkter) som skapar exogen variation."
    },
    {
      q: "Vad är parallel trends-antagandet i DiD?",
      a: "Att behandlings- och kontrollgrupp skulle haft samma utveckling över tid om ingen intervention genomförts."
    },
    {
      q: "Hur kan man testa parallel trends?",
      a: "Genom att studera pre-trender i data. Om grupperna följer liknande utveckling före behandlingen är antagandet mer rimligt."
    },
    {
      q: "Varför ger RDD hög intern validitet?",
      a: "Individer precis över och precis under cutoff är nästan identiska, så skillnader kan tolkas som behandlingseffekter."
    },
    {
      q: "Vad är skillnaden på sharp och fuzzy RDD?",
      a: "I sharp RDD bestäms behandling exakt av cutoff. I fuzzy RDD ökar bara sannolikheten för behandling vid cutoff – ofta analyserat med IV-metoder."
    },
    {
      q: "Hur vet man om ett instrument är starkt i IV?",
      a: "Genom att F-statistiken i first stage är tillräckligt hög (ofta > 10). Ett svagt instrument ger stora bias."
    },
    {
      q: "Vad innebär internal validity?",
      a: "Att den skattade effekten verkligen speglar ett kausalt samband i den undersökta populationen, givet studiens design."
    },
    {
      q: "Vad är ett exempel på endogenitet?",
      a: "Utbildning och lön: individer med hög förmåga får både mer utbildning och högre lön, vilket ger upward bias om man inte kontrollerar."
    },
    {
      q: "Varför är instrument viktiga i arbetsmarknadsekonomi?",
      a: "För att centrala variabler som utbildning, erfarenhet och arbetstid ofta är endogena. Instrument behövs för att isolera kausala effekter."
    },
    {
      q: "Vad menas med selection bias?",
      a: "När deltagare i en behandling skiljer sig systematiskt från icke-deltagare, vilket ger snedvridna skattningar om man bara jämför grupperna."
    },
    {
      q: "Vad är treatment effect heterogeneity?",
      a: "Att olika individer eller grupper påverkas olika mycket av samma intervention, t.ex starkare effekt för låginkomsttagare."
    },
    {
      q: "Varför är information en billig intervention?",
      a: "För att många beslut tas på basis av felaktig eller ofullständig information. Att korrigera information kostar lite men kan ha stor effekt."
    },
    {
      q: "Vad är skillnaden mellan nudges och skatter?",
      a: "Nudges ändrar beslutskontext (valarkitektur) utan att ändra monetära incitament, medan skatter direkt ändrar relativa priser."
    },
    {
      q: "Vad är regression to the mean?",
      a: "Fenomenet att extremt höga eller låga observationer ofta följs av mer genomsnittliga värden vid nästa mätning."
    },
    {
      q: "Varför måste man vara försiktig med before/after-studier?",
      a: "Eftersom de saknar kontrollgrupp kan andra samtidiga förändringar ligga bakom observerade skillnader över tid."
    },
    {
      q: "Vad är ett exempel på ett naturligt experiment i kursen?",
      a: "Angrist & Krueger: födelsekvartal påverkar skolstart och därmed utbildningslängd, vilket används som instrument för utbildning i lönemodeller."
    },
    {
      q: "När är RDD att föredra framför DiD?",
      a: "När en tydlig cutoff i en regel skapar lokal exogen variation och vi är intresserade av effekten just runt denna tröskel."
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



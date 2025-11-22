import React, { useState } from "react";
import "./index.css";

// Simple data model for blocks and flashcards
const BLOCKS = [
  {
    id: "block1",
    title: "Block 1 – Decision under risk",
    description: "Risk, expected utility, försäkring, adverse selection och moral hazard.",
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
        q: "Hur relaterar "Market for Lemons" till försäkring?",
        a: "Precis som med bilarna i Akerlofs exempel kan dold information om risktyper göra att bara "dåliga risker" blir kvar på försäkringsmarknaden när premien stiger."
      }
    ]
  }
];

const AccordionItem = ({ block, isOpen, onToggle }) => {
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
              Begrepp
              <span className="badge">Teori</span>
            </h3>
            <p className="subtle" style={{ marginBottom: "0.35rem" }}>
              Skumma igenom först, använd sedan flashcardsen för att testa dig själv.
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

const FlashcardPanel = ({ block }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const card = block.flashcards[index % block.flashcards.length];

  const next = () => {
    setIndex((prev) => (prev + 1) % block.flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="card">
      <h3>
        Flashcards
        <span className="badge">Träning</span>
      </h3>
      <p className="subtle" style={{ marginBottom: "0.35rem" }}>
        Kort {index + 1} / {block.flashcards.length}
      </p>
      <div className="flashcard">
        <div>
          <div className="flash-label">Fråga</div>
          <div className="flash-question">{card.q}</div>
          {showAnswer && (
            <div className="flash-answer">{card.a}</div>
          )}
        </div>
        <div className="flash-actions">
          <button onClick={() => setShowAnswer((v) => !v)}>
            {showAnswer ? "Dölj svar" : "Visa svar"}
          </button>
          <button onClick={next}>Nästa kort</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [openId, setOpenId] = useState(BLOCKS[0].id);

  return (
    <div className="app">
      <header className="header">
        <h1>NEK103 – Pluggportal</h1>
        <p className="subtle">
          Klicka på ett block för att se begrepp och öva på flashcards. Perfekt för intensivtentaplugg.
        </p>
        <div className="pill-row">
          <span className="pill">Mikro & beteende</span>
          <span className="pill">Risk & tid</span>
          <span className="pill">Hälsa & miljö</span>
          <span className="pill">Arbetsmarknad & humankapital</span>
          <span className="pill">Empiriska metoder</span>
        </div>
      </header>
      <div className="accordion">
        {BLOCKS.map((block) => (
          <AccordionItem
            key={block.id}
            block={block}
            isOpen={openId === block.id}
            onToggle={() => setOpenId((prev) => (prev === block.id ? null : block.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

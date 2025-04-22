// funnel.js
// Versione completa del funnel odontoiatrico Mantovani
// Tutto il funnel è reso in un unico container #app
// Logica interattiva, ramificazioni e raccolta dati in JSON

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Stato dell’app: step corrente e risposte
  const state = {
    step: "main",
    answers: {}
  };

  // Definizione di tutti i "passi" del funnel
  const steps = {
    // Passo iniziale
    main: {
      question: "Quale di queste opzioni descrive meglio il tuo problema?",
      options: [
        { value: "dolore",    label: "Ho mal di denti" },
        { value: "estetica",  label: "Non mi piace il mio sorriso" },
        { value: "mancante",  label: "Ho un dente mancante" },
        { value: "igiene",    label: "Penso di aver bisogno di un’igiene dentale" },
        { value: "ortodonzia",label: "Vorrei raddrizzare i denti" },
        { value: "altro",     label: "Altro" }
      ],
      // funzione che restituisce il prossimo passo
      next: val => val === "altro" ? "contatto" : val
    },

    // RAMO 1: Dolore
    dolore: {
      question: "Raccontaci il tuo dolore",
      fields: [
        {
          type: "radio",
          name: "dolore-loc",
          question: "Dove si trova il dolore?",
          options: [
            { v: "sopra", label: "Sopra" },
            { v: "sotto", label: "Sotto" },
            { v: "tutta", label: "Tutta la bocca" }
          ]
        },
        {
          type: "range",
          name: "dolore-intensita",
          question: "Intensità del dolore (0 = nessuno, 10 = insopportabile)",
          attrs: { min: 0, max: 10, value: 5 }
        },
        {
          type: "radio",
          name: "dolore-tempo",
          question: "Da quanto tempo hai questo dolore?",
          options: [
            { v: "settimana", label: "Meno di 1 settimana" },
            { v: "piu-settimane", label: "Più di 1 settimana" },
            { v: "mesi", label: "Da mesi" }
          ]
        },
        {
          type: "radio",
          name: "dolore-tipo",
          question: "Che tipo di dolore senti?",
          options: [
            { v: "puntuale", label: "Puntuale" },
            { v: "diffuso", label: "Diffuso" },
            { v: "intermittente", label: "Intermittente" }
          ]
        },
        {
          type: "radio",
          name: "dolore-pre",
          question: "Hai già fatto qualcosa per alleviarlo?",
          options: [
            { v: "si", label: "Sì" },
            { v: "no", label: "No" }
          ]
        }
      ],
      next: "contatto"
    },

    // RAMO 2: Estetica
    estetica: {
      question: "Parliamo di estetica",
      fields: [
        {
          type: "radio",
          name: "est-colore",
          question: "Cosa ti infastidisce del tuo sorriso?",
          options: [
            { v: "colore", label: "Colore" },
            { v: "forma", label: "Forma" },
            { v: "posizione", label: "Posizione" },
            { v: "altro", label: "Altro" }
          ]
        },
        {
          type: "radio",
          name: "est-prepast",
          question: "Ti sei già rivolto a un dentista per questo?",
          options: [
            { v: "si", label: "Sì" },
            { v: "no", label: "No" }
          ]
        },
        {
          type: "radio",
          name: "est-evento",
          question: "Hai un evento imminente per cui vuoi migliorare il sorriso?",
          options: [
            { v: "si", label: "Sì" },
            { v: "no", label: "No" }
          ]
        },
        {
          type: "radio",
          name: "est-urgenza",
          question: "Quanto è urgente?",
          options: [
            { v: "non-urgente", label: "Non urgente" },
            { v: "nei-prossimi-mesi", label: "Nei prossimi mesi" },
            { v: "subito", label: "Subito" }
          ]
        }
      ],
      next: "contatto"
    },

    // RAMO 3: Dente Mancante
    mancante: {
      question: "Dente mancante",
      fields: [
        {
          type: "radio",
          name: "man-loc",
          question: "Dove si trova il dente mancante?",
          options: [
            { v: "sopra", label: "Sopra" },
            { v: "sotto", label: "Sotto" },
            { v: "piu", label: "Più di uno" }
          ]
        },
        {
          type: "radio",
          name: "man-tempo",
          question: "Da quanto tempo manca?",
          options: [
            { v: "giorni", label: "Giorni" },
            { v: "settimane", label: "Settimane" },
            { v: "mesi", label: "Mesi" },
            { v: "anni", label: "Anni" }
          ]
        },
        {
          type: "radio",
          name: "man-soluzione",
          question: "Soluzione desiderata?",
          options: [
            { v: "fissa", label: "Fissa" },
            { v: "rimovibile", label: "Rimovibile" },
            { v: "non-so", label: "Non so" }
          ]
        },
        {
          type: "radio",
          name: "man-problema",
          question: "Estetico o funzionale?",
          options: [
            { v: "estetico", label: "Estetico" },
            { v: "funzionale", label: "Funzionale" },
            { v: "entrambi", label: "Entrambi" }
          ]
        }
      ],
      next: "contatto"
    },

    // RAMO 4: Igiene Dentale
    igiene: {
      question: "Igiene dentale",
      fields: [
        {
          type: "radio",
          name: "ig-last",
          question: "Quando hai fatto l’ultima igiene dentale?",
          options: [
            { v: "meno-6m", label: "Meno di 6 mesi fa" },
            { v: "piu-6m", label: "Più di 6 mesi fa" },
            { v: "non-ricordo", label: "Non ricordo" }
          ]
        },
        {
          type: "radio",
          name: "ig-sangue",
          question: "Noti sanguinamento quando ti lavi i denti?",
          options: [
            { v: "si", label: "Sì" },
            { v: "no", label: "No" }
          ]
        },
        {
          type: "radio",
          name: "ig-sensibilita",
          question: "Hai sensibilità dentale o gengivale?",
          options: [
            { v: "si", label: "Sì" },
            { v: "no", label: "No" }
          ]
        },
        {
          type: "radio",
          name: "ig-tempo-giorno",
          question: "Quanto tempo dedichi ogni giorno all’igiene orale?",
          options: [
            { v: "meno-1", label: "Meno di 1 minuto" },
            { v: "1-2", label: "1–2 minuti" },
            { v: "piu-2", label: "Più di 2 minuti" }
          ]
        }
      ],
      next: "contatto"
    },

    // RAMO 5: Ortodonzia
    ortodonzia: {
      question: "Ortodonzia",
      fields: [
        {
          type: "radio",
          name: "or-funzione",
          question: "Perché desideri un trattamento ortodontico?",
          options: [
            { v: "funzionale", label: "Funzionale" },
            { v: "estetico", label: "Estetico" },
            { v: "entrambi", label: "Entrambi" }
          ]
        },
        {
          type: "radio",
          name: "or-prepast",
          question: "Hai già fatto ortodonzia in passato?",
          options: [
            { v: "si", label: "Sì" },
            { v: "no", label: "No" }
          ]
        },
        {
          type: "radio",
          name: "or-soluzione",
          question: "Vorresti una soluzione fissa o trasparente?",
          options: [
            { v: "fissa", label: "Fissa" },
            { v: "trasparente", label: "Trasparente" },
            { v: "non-so", label: "Non so" }
          ]
        },
        {
          type: "radio",
          name: "or-motivazione",
          question: "Quanto sei motivato ad iniziare?",
          options: [
            { v: "poco", label: "Poco" },
            { v: "abbastanza", label: "Abbastanza" },
            { v: "molto", label: "Molto" }
          ]
        }
      ],
      next: "contatto"
    },

    // Schermata finale: raccolta contatti
    contatto: {
      question: "Lasciaci i tuoi recapiti e ti richiameremo al più presto",
      fields: [
        { type: "text",     name: "name",  placeholder: "Nome e Cognome", required: true },
        { type: "tel",      name: "phone", placeholder: "Numero di telefono", required: true },
        { type: "email",    name: "email", placeholder: "Email", required: true },
        { type: "textarea", name: "note",  placeholder: "Note aggiuntive (facoltativo)" }
      ]
    }
  };

  // Rendering di un singolo step
  function renderStep() {
    const stepDef = steps[state.step];
    let html = `<h2>${stepDef.question}</h2>`
             + `<form id="funnel-form">`;

    // radio generiche (solo in main)
    if (stepDef.options) {
      for (const opt of stepDef.options) {
        html += `<label><input type="radio" name="choice" value="${opt.value}"> ${opt.label}</label>`;
      }
    }

    // campi dettagliati
    if (stepDef.fields) {
      for (const f of stepDef.fields) {
        if (f.type === "radio") {
          html += `<p>${f.question}</p>`;
          for (const o of f.options) {
            html += `<label><input type="radio" name="${f.name}" value="${o.v}"> ${o.label}</label>`;
          }
        } else if (f.type === "range") {
          html += `<label>${f.question}<br>`
                + `<input type="range" name="${f.name}" min="${f.attrs.min}" max="${f.attrs.max}" value="${f.attrs.value}">`
                + `</label>`;
        } else if (f.type === "textarea") {
          html += `<textarea name="${f.name}" placeholder="${f.placeholder}"></textarea>`;
        } else {
          html += `<input type="${f.type}" name="${f.name}" placeholder="${f.placeholder}" ${f.required?"required":""}>`;
        }
      }
    }

    // bottoni avanti/indietro
    html += `<div style="margin-top:1rem;">`;
    if (state.step !== "main") {
      html += `<button type="button" id="btn-back">Indietro</button>`;
    }
    html += `<button type="submit">Avanti</button>`
         + `</div></form>`;

    app.innerHTML = html;
    attachListeners();
  }

  // Collego eventi a form e bottoni
  function attachListeners() {
    document.getElementById("funnel-form")
            .addEventListener("submit", onNext);
    const backBtn = document.getElementById("btn-back");
    if (backBtn) backBtn.addEventListener("click", () => {
      state.step = state.answers._branch || "main";
      renderStep();
    });
  }

  // Gestione click "Avanti"
  function onNext(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Se siamo nella schermata finale di contatto
    if (state.step === "contatto") {
      for (const [k, v] of formData.entries()) {
        state.answers[k] = v;
      }
      console.log("Risposte complete:", state.answers);
      alert("Grazie! Ti richiameremo presto.");
      return;
    }

    // Se siamo nel passo iniziale
    if (state.step === "main") {
      const choice = formData.get("choice");
      if (!choice) {
        alert("Seleziona un'opzione per proseguire.");
        return;
      }
      state.answers.choice = choice;
      state.answers._branch = choice;
      state.step = (typeof steps.main.next === "function")
                   ? steps.main.next(choice)
                   : steps.main.next;
      renderStep();
      return;
    }

    // Siamo in un ramo intermedio
    const defs = steps[state.step].fields || [];
    for (const f of defs) {
      const val = formData.get(f.name);
      if (f.required && !val) {
        alert(`Per favore, compila il campo "${f.name}".`);
        return;
      }
      state.answers[f.name] = val;
    }
    state.step = steps[state.step].next || "contatto";
    renderStep();
  }

  // Avvia il funnel
  renderStep();
});


document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const state = {
    step: "main",
    answers: {},
  };

  const steps = {
    main: {
      question: "Quale di queste opzioni descrive meglio il tuo problema?",
      options: [
        { value: "dolore", label: "Ho mal di denti" },
        { value: "estetica", label: "Non mi piace il mio sorriso" },
        { value: "mancante", label: "Ho un dente mancante" },
        { value: "igiene", label: "Penso di aver bisogno di un’igiene dentale" },
        { value: "ortodonzia", label: "Vorrei raddrizzare i denti" },
        { value: "altro", label: "Altro" },
      ],
      next: (val) => (val === "altro" ? "contatto" : val),
    },
    dolore: {
      question: "Dove si trova il dolore?",
      options: [
        { value: "sopra", label: "Sopra" },
        { value: "sotto", label: "Sotto" },
        { value: "tutta", label: "Tutta la bocca" },
      ],
      next: "contatto",
    },
    estetica: {
      question: "Come potrebbe aiutarti un trattamento estetico?",
      options: [
        { value: "migliorare", label: "Migliorare il sorriso" },
        { value: "aggiustare", label: "Aggiustare un dente scheggiato" },
        { value: "sbiancare", label: "Sbiancare i denti" },
      ],
      next: "contatto",
    },
    mancante: {
      question: "Dove si trova il dente mancante?",
      options: [
        { value: "sopra", label: "Sopra" },
        { value: "sotto", label: "Sotto" },
        { value: "piu", label: "Mi mancano più denti" },
      ],
      next: "contatto",
    },
    igiene: {
      question: "Perché pensi di aver bisogno di un’igiene dentale?",
      options: [
        { value: "routine", label: "Igiene di routine" },
        { value: "gengive", label: "Problemi gengivali" },
        { value: "sensibilita", label: "Sensibilità dentale" },
      ],
      next: "contatto",
    },
    ortodonzia: {
      question: "Perché desideri un trattamento ortodontico?",
      options: [
        { value: "occlusione", label: "Migliorare l’occlusione" },
        { value: "raddrizzare", label: "Raddrizzare i denti" },
        { value: "mandibola", label: "Allineare la mandibola" },
      ],
      next: "contatto",
    },
    contatto: {
      question: "Lasciaci i tuoi contatti, ti richiameremo al più presto.",
      inputs: ["name", "phone", "email"],
    },
  };

  function renderStep() {
    const current = steps[state.step];
    let html = `<h2>${current.question}</h2><form id="funnel-form">`;

    if (current.options) {
      current.options.forEach(opt => {
        html += `
          <label>
            <input type="radio" name="option" value="${opt.value}"/>
            ${opt.label}
          </label>
        `;
      });
    }

    if (current.inputs) {
      html += `
        <input type="text" name="name" placeholder="Nome e Cognome" required/>
        <input type="tel" name="phone" placeholder="Numero di telefono" required/>
        <input type="email" name="email" placeholder="Email" required/>
      `;
    }

    html += `<button type="submit">Avanti</button></form>`;
    app.innerHTML = html;

    const form = document.getElementById("funnel-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const value = formData.get("option");

      if (state.step === "contatto") {
        state.answers = {
          ...state.answers,
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
        };
        console.log("Invio dati:", state.answers);
        alert("Grazie! Ti contatteremo presto.");
        form.reset();
        state.step = "main";
        state.answers = {};
        renderStep();
        return;
      }

      if (!value) {
        alert("Seleziona un'opzione per proseguire.");
        return;
      }

      state.answers[state.step] = value;
      const next = typeof current.next === "function" ? current.next(value) : current.next;
      state.step = next;
      renderStep();
    });
  }

  renderStep();
});

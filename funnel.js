
const container = document.getElementById("funnel-container");
container.innerHTML = `
  <h2 class="animate__animated animate__fadeIn">Quale di queste opzioni descrive meglio il tuo problema?</h2>
  <ul class="options">
    <li><label><input type="radio" name="main" value="dolore"> Ho mal di denti</label></li>
    <li><label><input type="radio" name="main" value="estetica"> Non mi piace il mio sorriso</label></li>
    <li><label><input type="radio" name="main" value="mancante"> Ho un dente mancante</label></li>
    <li><label><input type="radio" name="main" value="igiene"> Penso di aver bisogno di un’igiene dentale</label></li>
    <li><label><input type="radio" name="main" value="ortodonzia"> Vorrei raddrizzare i denti</label></li>
    <li><label><input type="radio" name="main" value="altro"> Altro</label></li>
  </ul>
  <button class="btn" onclick="alert('Qui parte la logica di funnel!')">Avanti</button>
`;

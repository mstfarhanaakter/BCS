


const sectionsContainer = document.getElementById('sectionsContainer');
const letters = ["ক", "খ", "গ", "ঘ"];

function addSection(sectionNumber, questions = []) {
    const card = document.createElement('div');
    card.className = 'accordion-item section-card';

    card.innerHTML = `
    <h2 class="accordion-header d-flex justify-content-between align-items-center" id="heading${sectionNumber}">
      <button class="accordion-button collapsed me-4" type="button" 
              data-bs-toggle="collapse" data-bs-target="#section${sectionNumber}" 
              aria-expanded="false" aria-controls="section${sectionNumber}">
        ${sectionNumber}<sup>th</sup>&nbsp;BCS — (${questions.length} টি প্রশ্ন)
      </button>
      <div class="d-flex gap-3 p-0 m-0 ">
        <button class="btn btn-warning p-0 m2-1  btn-check-answer btn-sm">Check Answers</button>
        <button class="btn btn-outline-primary p-0  toggleAllBtn" btn-md>⬇ Expand All</button>
      </div>
    </h2>
    <div id="section${sectionNumber}" class="accordion-collapse collapse" aria-labelledby="heading${sectionNumber}">
      <div class="accordion-body">
        <div class="section-summary text-center mb-2" style="display:none;">
          <b>সঠিক উত্তর:</b> <span class="correct">0</span> 
          <br> 
          <b>ভুল উত্তর:</b> <span class="wrong">0</span>
        </div>
        <div id="questions${sectionNumber}"></div>
      </div>
    </div>
  `;

    sectionsContainer.appendChild(card);

    const qContainer = card.querySelector(`#questions${sectionNumber}`);
    questions.forEach((q, idx) => {
        const qCard = document.createElement('div');
        qCard.className = 'mb-3';
        qCard.innerHTML = `
        <div class="card-header question-header" data-bs-toggle="collapse" data-bs-target="#q${sectionNumber}_${idx}">
          প্রশ্ন ${idx + 1}: ${q.question}
        </div>
        <div id="q${sectionNumber}_${idx}" class="collapse">
          <div class="card-body" data-correct="${q.correct}">
            ${q.options.map((opt, i) => `
              <label class="option-label d-block">
                <input type="radio" name="q${sectionNumber}_${idx}" value="${i}">
                <span class="letter">${letters[i]}</span> ${opt}
              </label>
            `).join('')}
            <div class="answer-explanation d-none">
              <strong>সঠিক উত্তর: ${letters[q.correct]}</strong>
              <p>${q.explanation}</p>
            </div>
          </div>
        </div>
      `;
        qContainer.appendChild(qCard);
    });

    const checkBtn = card.querySelector('.btn-check-answer');
    const toggleBtn = card.querySelector('.toggleAllBtn');
    const summary = card.querySelector('.section-summary');
    const correctSpan = summary.querySelector('.correct');
    const wrongSpan = summary.querySelector('.wrong');

    // Check Answers button
    checkBtn.addEventListener('click', e => {
        e.stopPropagation();
        let correctCount = 0;
        let wrongCount = 0;
        const bodies = card.querySelectorAll('.card-body[data-correct]');
        bodies.forEach(body => {
            const correct = parseInt(body.dataset.correct);
            const opts = body.querySelectorAll('input');
            const explanation = body.querySelector('.answer-explanation');
            let answered = false;
            opts.forEach((opt, i) => {
                opt.parentElement.classList.remove('correct', 'incorrect');
                if (opt.checked) {
                    answered = true;
                    if (i === correct) opt.parentElement.classList.add('correct');
                    else opt.parentElement.classList.add('incorrect');
                }
            });
            if (answered) {
                if (Array.from(opts).some((opt, i) => opt.checked && i === correct)) correctCount++;
                else wrongCount++;
            }
            opts[correct].parentElement.classList.add('correct');
            explanation.classList.remove('d-none');
        });
        correctSpan.textContent = correctCount;
        wrongSpan.textContent = wrongCount;
        summary.style.display = 'block';
    });

    // Expand/Collapse section + all questions
    toggleBtn.addEventListener('click', e => {
        e.stopPropagation();
        const sectionCollapse = card.querySelector(`#section${sectionNumber}`);
        const questionsCollapse = card.querySelectorAll(`#questions${sectionNumber} .collapse`);

        const isExpanded = sectionCollapse.classList.contains('show');

        // Toggle main section
        bootstrap.Collapse.getOrCreateInstance(sectionCollapse).toggle();

        // Toggle all questions
        questionsCollapse.forEach(qc => {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(qc);
            if (!isExpanded) bsCollapse.show();
            else bsCollapse.hide();
        });

        // Update button text
        toggleBtn.textContent = !isExpanded ? '⬆ Collapse All' : '⬇ Expand All';
    });

    // Section header click (without clicking buttons)
    const headerBtn = card.querySelector('.accordion-button');
    headerBtn.addEventListener('click', e => {
        // If the click is not on the buttons, toggle only the section
        if (!e.target.closest('.btn')) {
            const sectionCollapse = card.querySelector(`#section${sectionNumber}`);
            bootstrap.Collapse.getOrCreateInstance(sectionCollapse).toggle();
        }
    });
}


// উদাহরণ Section 46
const bcs46Questions = [
   
];

addSection(46, bcs46Questions);


// উদাহরণ Section 45
const bcs45Questions = [
   
];

addSection(45, bcs45Questions);

// উদাহরণ Section 44
        const bcs44Questions = [
   
];


        addSection(44, bcs44Questions);
// উদাহরণ Section 43
        const bcs43Questions = [
   
]


        addSection(43, bcs43Questions);


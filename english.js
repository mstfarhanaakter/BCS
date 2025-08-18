


const sectionsContainer = document.getElementById('sectionsContainer');
const letters = ["A", "B", "C", "D"];

function addSection(sectionNumber, questions = []) {
  const card = document.createElement('div');
  card.className = 'accordion-item section-card';

  card.innerHTML = `
    <h2 class="accordion-header d-flex justify-content-between align-items-center" id="heading${sectionNumber}">
      <button class="accordion-button collapsed me-4" type="button" 
              data-bs-toggle="collapse" data-bs-target="#section${sectionNumber}" 
              aria-expanded="false" aria-controls="section${sectionNumber}">
        ${sectionNumber}<sup>th</sup>&nbsp;BCS — (${questions.length} Questions)
      </button>
      <div class="d-flex gap-3 p-0 m-0 ">
        <button class="btn btn-warning p-0 m2-1  btn-check-answer btn-sm">Check Answers</button>
        <button class="btn btn-outline-primary p-0  toggleAllBtn" btn-md>⬇ Expand All</button>
      </div>
    </h2>
    <div id="section${sectionNumber}" class="accordion-collapse collapse" aria-labelledby="heading${sectionNumber}">
      <div class="accordion-body">
        <div class="section-summary text-center mb-2" style="display:none;">
          <b>Correct Answer:</b> <span class="correct">0</span> 
          <br> 
          <b>Correct Answer:</b> <span class="wrong">0</span>
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
          Q${idx + 1}: ${q.question}
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
  {
    question: "Which of the following words can be used as a verb?",
    options: ["mobile", "sugar", "media", "sand"],
    correct: 3,
    explanation: "'Sand' can also be used as a verb meaning to smooth or polish with sandpaper."
  },
  {
    question: "In which sentence ‘Like’ is used as a preposition?",
    options: ["He likes to eat fish", "He laughs like his father does", "He climbed the tree like a cat", "Like minded people are necessary to start a business"],
    correct: 2,
    explanation: "'Like' functions as a preposition in 'He climbed the tree like a cat'."
  },
  {
    question: "He died following the incident. The word 'following' is a/an-",
    options: ["adjective", "adverb", "noun", "preposition"],
    correct: 3,
    explanation: "'Following' acts as a preposition in this sentence."
  },
  {
    question: "'Writing a diary' is a very good practice to develop the writing skill. The word 'Writing a diary' is a/an–",
    options: ["noun phrase", "verbal phrase", "adjective phrase", "adverbial phrase"],
    correct: 0,
    explanation: "'Writing a diary' functions as a noun phrase here."
  },
  {
    question: "Fill in the blank: __ he lay on the ground groaning",
    options: ["Injured", "Injuring", "having injured", "Be injured"],
    correct: 2,
    explanation: "'Having injured' correctly completes the sentence."
  },
  {
    question: "Find out the meaning of the phrase: 'By and large'",
    options: ["very large", "on the whole", "far away", "the largest one"],
    correct: 1,
    explanation: "'By and large' means 'on the whole'."
  },
  {
    question: "He went back on his promise of voting for me. Alternative for 'went back':",
    options: ["withdrew", "forgot", "reinforced", "support"],
    correct: 0,
    explanation: "'Went back' means 'withdrew'."
  },
  {
    question: "'Let the cat out of the bag' means --",
    options: ["bring out a cat from a bag", "let a cat move at large", "reveal a secret carelessly", "take a pre-cautious step"],
    correct: 2,
    explanation: "It means 'reveal a secret carelessly'."
  },
  {
    question: "He is a man 'to depend on'. The part 'to depend on' is -",
    options: ["a noun phrase", "an adjective phrase", "an adverbial phrase", "a prepositional phrase"],
    correct: 1,
    explanation: "'To depend on' modifies 'man', so it's an adjective phrase."
  },
  {
    question: "His dream 'that he will be a BCS Cadre' finally came true. The bold part is -",
    options: ["a noun clause", "an adjective clause", "an independent clause", "a co-ordinate clause"],
    correct: 0,
    explanation: "It functions as a noun clause in the sentence."
  },
  {
    question: "Which of the following is a correct simple sentence?",
    options: ["All that glitters is not gold", "All's well that ends well", "Do or die", "I saw an old man walking past me"],
    correct: 3,
    explanation: "'I saw an old man walking past me' is a complete simple sentence."
  },
  {
    question: "Which is the correct complex form of the sentence? 'A corrupt man cannot win the respect of others’",
    options: ["A man who is corrupt cannot respect others", "A man does not respect others who are corrupt", "A man who is corrupt cannot win the respect of others", "A man who can win the respect of others cannot be corrupt"],
    correct: 2,
    explanation: "The correct complex sentence is 'A man who is corrupt cannot win the respect of others'."
  },
  {
    question: "Find out the correct positive form of the sentence: 'Who else is the better player than Zaman in the team?'",
    options: ["Is there any other player in this team who is as good as Zaman?", "Who is the best player than Zaman in this team?", "Is there any other players in this team who is as good as Zaman?", "Are there any other player in this team who are as good as Zaman?"],
    correct: 0,
    explanation: "The correct positive form is 'Is there any other player in this team who is as good as Zaman?'."
  },
  {
    question: "The submarine dipped to avoid __ by the enemy plane.",
    options: ["see", "seeing", "being seen", "seen"],
    correct: 2,
    explanation: "'Being seen' correctly completes the sentence."
  },
  {
    question: "In fear of __ he escaped elsewhere.",
    options: ["arresting", "arrested", "being arrested", "having arrested"],
    correct: 2,
    explanation: "'Being arrested' fits correctly in the sentence."
  },
  {
    question: "I didn't follow who passed by me. It____ Shajib.",
    options: ["were", "must be", "might be", "was"],
    correct: 2,
    explanation: "'Might be' correctly indicates possibility."
  },
  {
    question: "Samin is my colleague. I _ him for ten years.",
    options: ["know", "knew", "have known", "have been known"],
    correct: 2,
    explanation: "'Have known' is correct for the duration of ten years."
  },
  {
    question: "The snow swirls _ the valley.",
    options: ["up", "in", "down", "through"],
    correct: 2,
    explanation: "'Down' correctly describes the movement of snow."
  },
  {
    question: "There is a coffee shop __ the street.",
    options: ["at", "on", "before", "across"],
    correct: 3,
    explanation: "'Across the street' is the correct prepositional phrase."
  },
  {
    question: "Identify the correct sentence:",
    options: [
      "He has said to me that I will go but you will stay there in Dhaka.",
      "He has told me that he will go but I will stay here in Dhaka.",
      "He has told me that I would go but you would stay here in Dhaka.",
      "He has told me that he would go but I would stay here in Dhaka."
    ],
    correct: 1,
    explanation: "Option 2 is grammatically correct."
  },
  {
    question: "Identify the correct sentence:",
    options: [
      "The room was darkened by switching off all the lights.",
      "The room was darkened switching off all the lights.",
      "The room was darkened to switch off all the lights.",
      "Switching off all the lights the room was darkened."
    ],
    correct: 0,
    explanation: "Option 1 is grammatically correct."
  },
  {
    question: "Identify the correct sentence:",
    options: [
      "Had you been there on time, you could have had the information.",
      "If you had been there on time, you could have the information.",
      "If you have been there on time, you might get the information.",
      "Had been you there, you could have got the information."
    ],
    correct: 0,
    explanation: "Option 1 is the correct conditional sentence."
  },
  {
    question: "Identify the correct sentence:",
    options: [
      "There are trees on the both sides of the road.",
      "There are trees on both the sides of the road.",
      "There are trees, on the side of the road.",
      "There are trees on either sides of the road."
    ],
    correct: 1,
    explanation: "Option 2 is correct usage."
  },
  {
    question: "The antonym of ‘boisterous’ is–",
    options: ["noisy", "quit", "unruly", "cheerful"],
    correct: null,
    explanation: "Correct answer should be 'quiet'."
  },
  {
    question: "‘Plagiarism’ means–",
    options: ["the act of using someone else's idea as one’s own", "the act of planning everything beforehand", "the act of playing a musical instrument", "the art of dealing with forgery"],
    correct: 0,
    explanation: "Plagiarism is using someone else's idea as your own."
  },
  {
    question: "The two cities in A Tale of Two Cities are –",
    options: ["London and Manchester", "London and Paris", "Paris and New York", "Paris and Geneva"],
    correct: 1,
    explanation: "The novel is set in London and Paris."
  },
  {
    question: "The line ‘Frailty, thou name is woman’ occurs in Shakespeare’s play –",
    options: ["Hamlet", "Macbeth", "Othello", "King Lear"],
    correct: 0,
    explanation: "This line occurs in Hamlet."
  },
  {
    question: "Who compiled an English Dictionary?",
    options: ["Samuel Johnson", "T.S. Eliot", "John Dryden", "William Congreve"],
    correct: 0,
    explanation: "Samuel Johnson compiled a famous English dictionary."
  },
  {
    question: "Which is not a poetry form?",
    options: ["Sonnet", "Ballad", "Tale", "Epic"],
    correct: 2,
    explanation: "'Tale' is a narrative, not a poetry form."
  },
  {
    question: "‘I am a man more sinned against than sinning’. This is uttered by –",
    options: ["Horatio", "Hamlet", "King Lear", "Macbeth"],
    correct: 2,
    explanation: "This line is spoken by King Lear."
  },
  {
    question: "Which event influenced the literature of the Romantic Period?",
    options: ["French revolution", "Industrial Revolution", "Russian Revolution", "Hundred Year’s War"],
    correct: 0,
    explanation: "The French Revolution influenced Romantic literature."
  },
  {
    question: "The author of 'A Farewell to Arms' is –",
    options: ["Somerset Maugham", "Ernest Hemingway", "D.H. Lawrence", "Jane Austen"],
    correct: 1,
    explanation: "Ernest Hemingway wrote 'A Farewell to Arms'."
  },
  {
    question: "Who is the most famous satirist in English literature?",
    options: ["Alexander Pope", "Jonathan Swift", "John Dryden", "William Wordsworth"],
    correct: 1,
    explanation: "Jonathan Swift is the most famous satirist."
  },
  {
    question: "Which period is known as 'The Golden Age of English Literature'?",
    options: ["The Victorian Age", "The Elizabethan Age", "The Eighteen century", "The Restoration period"],
    correct: 1,
    explanation: "The Elizabethan Age is considered the Golden Age."
  },
  {
    question: "Which novel is written by an Indian novelist?",
    options: ["The Ministry of Utmost Happiness", "The Return of the Native", "Things Fall Apart", "Heart of Darkness"],
    correct: 0,
    explanation: "'The Ministry of Utmost Happiness' is written by Arundhati Roy."
  }



];
addSection(46, bcs46Questions);




// উদাহরণ Section 45
const bcs45Questions = [
  {
    question: "Who is not a Victorian poet?",
    options: ["Alfred Tennyson", "Robert Browning", "William Wordsworth", "Matthew Arnold"],
    answer: 2,
    explanation: "William Wordsworth was a Romantic poet, not a Victorian poet."
  },
  {
    question: "Which of the following novels was written by George Orwell?",
    options: ["1984", "Brave New World", "A clockwork Orange", "For Whom the Bell Tolls"],
    answer: 0,
    explanation: "'1984' is a novel by George Orwell."
  },
  {
    question: "The poem 'To his Coy Mistress' was written by:",
    options: ["Andrew Marvell", "John Donne", "George Herbert", "Henry Vaughan"],
    answer: 0,
    explanation: "'To His Coy Mistress' is a metaphysical poem by Andrew Marvell."
  },
  {
    question: "The character, Elizabeth Bennett, appears in the novel––",
    options: ["Pride and Prejudice", "Tess of the D’Llrberville", "Wuthering Heights", "Jane Eyre"],
    answer: 0,
    explanation: "Elizabeth Bennett is the heroine of Jane Austen’s 'Pride and Prejudice'."
  },
  {
    question: "Don Juan was composed by––",
    options: ["W B Yeats", "E.B. Browning", "George Gordon Byron", "Alexander Pope"],
    answer: 2,
    explanation: "'Don Juan' is a satirical poem by Lord Byron."
  },
  {
    question: "‘Ulysses’ is a poem written by––",
    options: ["Robert Browning", "Wordsworth", "S.T. Coleridge", "Alfred Tennyson"],
    answer: 3,
    explanation: "'Ulysses' is a poem by Alfred Tennyson."
  },
  {
    question: "Who wrote the poem ‘Ozymandias’?",
    options: ["Thomas Hardy", "Robert Frost", "P.B Shelley", "Edmund Spenser"],
    answer: 2,
    explanation: "'Ozymandias' is a sonnet by Percy Bysshe Shelley."
  },
  {
    question: "Clym Yeobright is the protagonist of the novel––",
    options: ["David Copperfield", "Adam Bede", "A Passage of India", "The Return of the Native"],
    answer: 3,
    explanation: "Clym Yeobright is the main character in Thomas Hardy’s 'The Return of the Native'."
  },
  {
    question: "Desdemona is a character in the following Shakespearean play:",
    options: ["Macbeth", "Othello", "Hamlet", "King Lear"],
    answer: 1,
    explanation: "Desdemona is the heroine in Shakespeare’s 'Othello'."
  },
  {
    question: "She insisted on ––– leaving the house.",
    options: ["he", "him", "himself", "his"],
    answer: 3,
    explanation: "The possessive 'his' is correct in this context."
  },
  {
    question: "The phrase “Achilles’ heel” means––",
    options: ["a strong point", "a strong solution", "a weak point", "a permanent solution"],
    answer: 2,
    explanation: "An 'Achilles’ heel' refers to a vulnerability or weak point."
  },
  {
    question: "He does not adhere ––– any principle.",
    options: ["by", "in", "at", "to"],
    answer: 3,
    explanation: "'Adhere to' is the correct usage with principles."
  },
  {
    question: "Millennium is a period of–––",
    options: ["100 year", "1000 year", "1 million year", "1 million year"],
    answer: 1,
    explanation: "A millennium is a period of 1000 years."
  },
  {
    question: "Identify the passive form of the following sentence: Who has broken this jug?",
    options: [
      "By whom has this jug been broken?",
      "By whom has this jug broken?",
      "By whom this jug has been broken?",
      "Whom has this jug been broken?"
    ],
    answer: 0,
    explanation: "This is the correct passive form of the sentence."
  },
  {
    question: "Identify the correct sentence:",
    options: [
      "She speaks English like English",
      "She speaks the English like English",
      "She speaks the English like the English",
      "She speaks English like the English"
    ],
    answer: 3,
    explanation: "The idiomatic expression is 'like the English'."
  },
  {
    question: "When one makes a promise, one must not go ––– on it.",
    options: ["forward", "back", "by", "around"],
    answer: 1,
    explanation: "'Go back on a promise' means to break a promise."
  },
  {
    question: "I can’t put up with him any more. Here 'put up with' means:",
    options: ["To protect", "To terminate", "To tolerate", "To prevent"],
    answer: 2,
    explanation: "'Put up with' means to tolerate or endure."
  },
  {
    question: "The synonym of ‘altitude’ is–––",
    options: ["height", "width", "length", "depth"],
    answer: 0,
    explanation: "Altitude means height above a given level."
  },
  {
    question: "This could have worked if I __ been more far-sighted.",
    options: ["have", "had", "might", "would"],
    answer: 1,
    explanation: "Third conditional uses 'had' for unreal past situations."
  },
  {
    question: "What may be considered courteous in one culture may be arrogant in another. Here 'arrogant' means––",
    options: ["rude", "gracious", "coarse", "pretentious"],
    answer: 0,
    explanation: "'Arrogant' means rude or offensive in this context."
  },
  {
    question: "Identify the imperative sentence:",
    options: ["Shut up!", "Shahin is playing football.", "I shall cook dinner now.", "What is your name?"],
    answer: 0,
    explanation: "Imperative sentences give a command."
  },
  {
    question: "“Black Death” is the name of a ––",
    options: ["fever", "black fever", "plague pandemic", "death of black people"],
    answer: 2,
    explanation: "Black Death refers to the bubonic plague pandemic in Europe."
  },
  {
    question: "The train is running ––– forty miles an hour.",
    options: ["on", "to", "at", "for"],
    answer: 2,
    explanation: "'At' is used with speed."
  },
  {
    question: "He divided the money ––– the two children.",
    options: ["between", "over", "among", "in between"],
    answer: 0,
    explanation: "'Between' is used for two people."
  },
  {
    question: "No one can ––– that he is clever.",
    options: ["defy", "deny", "admire", "denounce"],
    answer: 1,
    explanation: "'Deny' is correct as it means to refuse the truth."
  },
  {
    question: "Choose the right form of verb: The boy (to lie) on the floor yesterday.",
    options: ["lies", "lied", "lay", "layed"],
    answer: 2,
    explanation: "Past tense of 'lie' (recline) is 'lay'."
  },
  {
    question: "She played on the flute. Passive form is –––",
    options: ["The flute was played by ger.", "The flute was played on by her.", "The flute was played to her.", "The flute was being played by her."],
    answer: 1,
    explanation: "The verb 'play on' requires 'on' in the passive voice."
  },
  {
    question: "Antonym for Adieu–––",
    options: ["Farewell", "Good bye", "Hello", "Valediction"],
    answer: 2,
    explanation: "'Adieu' means farewell; antonym is 'Hello'."
  },
  {
    question: "‘Walk fast lest you should miss the train’. This is a––",
    options: ["Simple sentence", "Compound sentence", "Complex sentence", "Interrogative sentence"],
    answer: 1,
    explanation: "The sentence has a main clause and a subordinate clause."
  },
  {
    question: "A number of singers in a church is called––",
    options: ["Choir", "Cast", "Claque", "Clump"],
    answer: 0,
    explanation: "A choir is a group of singers."
  },
  {
    question: "Put the right word in the blank. 'He reached the ––– of his literary career.'",
    options: ["abattoir", "acme", "admonish", "abdicate"],
    answer: 1,
    explanation: "'Acme' means the highest point or peak."
  },
  {
    question: "Anger may be compared ––– fire.",
    options: ["to", "within", "against", "into"],
    answer: 0,
    explanation: "'Compare to' is the correct preposition."
  },
  {
    question: "Choose the correct sentence:",
    options: ["He discussed the matter.", "He discussed about the matter.", "He discussed on the matter.", "None of the above."],
    answer: 0,
    explanation: "'Discuss' does not require a preposition."
  },
  {
    question: "Identify the correct spelt word.",
    options: ["Horroscope", "Pneumonia", "Occasion", "Embarass"],
    answer: 1,
    explanation: "'Pneumonia' is correctly spelled."
  },
  {
    question: "Meteorology is related to––",
    options: ["concrete slabs", "motor vehicles", "weather forecasting", "motor neurone disease"],
    answer: 2,
    explanation: "Meteorology is the science of weather and forecasting."
  }
];

addSection(45, bcs45Questions);



// উদাহরণ Section 44
const bcs44Questions = [
  {
    question: "‘By and large’ means –",
    options: ["everwhere", "very large", "mostly", "far away"],
    answer: 2,
    explanation: "‘By and large’ means mostly."
  },
  {
    question: "Francis Bacon is an illustrious –",
    options: ["essayist", "dramatist", "novelist", "journalist"],
    answer: 0,
    explanation: "Francis Bacon was a renowned essayist."
  },
  {
    question: "‘He could not win but learnt a lot.’ Which part of speech is the word ‘but’?",
    options: ["an adverb", "a verb", "an adjective", "a conjunction"],
    answer: 3,
    explanation: "Here, 'but' functions as a conjunction connecting two clauses."
  },
  {
    question: "Select the appropriate preposition: ‘Are you doing’ anything special ____ the weekend?",
    options: ["at", "with", "on", "for"],
    answer: 0,
    explanation: "Correct preposition is 'at'."
  },
  {
    question: "What is the plural form of ‘sheep’?",
    options: ["sheeps", "sheep", "sheepes", "sheepses"],
    answer: 1,
    explanation: "The plural of 'sheep' is the same as singular."
  },
  {
    question: "‘Sweet are the uses of adversity’ is quoted from Shakespeare’s-",
    options: ["Julius Caesar", "Macbeth", "Comedy of Errors", "As you like it"],
    answer: 3,
    explanation: "This quote is from 'As You Like It'."
  },
  {
    question: "‘To get along with’ means –",
    options: ["to adjust", "to interest", "to accompany", "to walk"],
    answer: 0,
    explanation: "It means 'to adjust' or 'manage well with someone'."
  },
  {
    question: "The synonym of ‘panoramic’ is –",
    options: ["scenic", "narrow", "limited", "restricted"],
    answer: 0,
    explanation: "'Panoramic' refers to a wide or scenic view."
  },
  {
    question: "The antonym for ‘slothful’ is –",
    options: ["playful", "sluggish", "energetic", "quarrelsome"],
    answer: 2,
    explanation: "'Slothful' means lazy; the opposite is 'energetic'."
  },
  {
    question: "Alexander Pope’s ‘Essay on Man’ is a –",
    options: ["novel", "treatise", "short story", "poem"],
    answer: 3,
    explanation: "It is a poem written by Alexander Pope."
  },
  {
    question: "What is the verb form of the word ‘ability’?",
    options: ["capable", "inability", "enable", "unable"],
    answer: 2,
    explanation: "'Enable' is the verb form of 'ability'."
  },
  {
    question: "The word ‘equivocation’ refers to –",
    options: ["stating like an author", "two contradictory things in the same statement", "free expression of opinions", "a true statement"],
    answer: 1,
    explanation: "Equivocation refers to saying two contradictory things in the same statement."
  },
  {
    question: "“Life’s but a walking shadow, a poor player, That struts and frets his hour upon the stage, And then is heard no more;” These memorable lines in Shakespearean tragedy are spoken by –",
    options: ["Lady Macbeth", "Banquo", "Duncan", "Macbeth"],
    answer: 3,
    explanation: "These lines are spoken by Macbeth."
  },
  {
    question: "Which of the following words is spelt correctly?",
    options: ["authoratative", "autheritative", "authoritative", "authoratative"],
    answer: 2,
    explanation: "The correct spelling is 'authoritative'."
  },
  {
    question: "Find out the active form of the sentence: ‘By whom can our country be saved?’",
    options: ["Who can save our country?", "Our country has been saved by who?", "Who save our country?", "Who will save our country?"],
    answer: 0,
    explanation: "The active form is 'Who can save our country?'."
  },
  {
    question: "“All changed, changed utterly: A terrible beauty is born.” This extract is taken from W.B. Yeats poem titled –",
    options: ["No Second Troy", "Easter 1916", "The Second Coming", "The Wild Swans at Coole"],
    answer: 1,
    explanation: "The extract is from 'Easter 1916'."
  },
  {
    question: "Identify the correct passive form: ‘Do not close the door.’",
    options: ["Let not the door close.", "Let not the door be closed.", "Let not the door close.", "Let not door closed."],
    answer: 1,
    explanation: "The correct passive form is 'Let not the door be closed.'"
  },
  {
    question: "The poetic drama ‘Murder in the Cathedral’ was written by –",
    options: ["Harold Pinter", "G. B. Shaw", "T. S. Eliot", "Samuel Beckett"],
    answer: 2,
    explanation: "It was written by T. S. Eliot."
  },
  {
    question: "‘All for Love’ is a drama written by –",
    options: ["John Dryden", "William Congreve", "John Bunyan", "Francis Bacon"],
    answer: 0,
    explanation: "Written by John Dryden."
  },
  {
    question: "Sitting happily, The chicken laid eggs. The underlined part is a/an –",
    options: ["noun clause", "subordinate clause", "independent clause", "coordinate clause"],
    answer: 1,
    explanation: "The underlined part is a subordinate clause."
  },
  {
    question: "Caliban is an important character from Shakespeare’s-",
    options: ["The Tempest", "Hamlet", "Macbeth", "Othello"],
    answer: 0,
    explanation: "Caliban appears in 'The Tempest'."
  },
  {
    question: "What kind of noun is ‘river’?",
    options: ["Material", "Collective", "Proper", "Common"],
    answer: 3,
    explanation: "'River' is a common noun."
  },
  {
    question: "‘Caesar and Clopatra’ is –",
    options: ["a tragedy by William Shakespeare", "a poem by Lord Byron", "a play by Bernard Shaw", "a novel by S. T. Coleridge"],
    answer: 2,
    explanation: "It is a play by Bernard Shaw."
  },
  {
    question: "Identify the write tense: ‘My father ________ before I came’. ",
    options: ["would be leaving", "had been leaving", "had left", "will leave"],
    answer: 2,
    explanation: "The correct tense is 'had left'."
  },
  {
    question: "Which of the following word is spelt incorrectly?",
    options: ["reminescence", "glycerin", "idiosyncrasy", "lexicography"],
    answer: 0,
    explanation: "'Reminescence' is incorrectly spelt; correct is 'reminiscence'."
  },
  {
    question: "Who wrote the picaresque novel titled ‘Tom Jones’?",
    options: ["Samuel Richardson", "Horace Walpole", "Henry Fielding", "Laurence Sterne"],
    answer: 2,
    explanation: "Henry Fielding wrote 'Tom Jones'."
  },
  {
    question: "The story of ‘Moby Dick’ centres on",
    options: ["a mermaid", "a whale", "a crocodile", "a shark"],
    answer: 1,
    explanation: "It centers on a whale."
  },
  {
    question: "‘He prayeth best, who loveth best.’-Who said that?",
    options: ["John Milton", "John Donne", "Lord Byron", "S. T. Coleridge"],
    answer: 3,
    explanation: "S. T. Coleridge said this."
  },
  {
    question: "The controlling sentence of a paragraph is known as –",
    options: ["content modulator", "terminator", "thesis statement", "topic sentence"],
    answer: 3,
    explanation: "It is called the topic sentence."
  },
  {
    question: "Choose the correct comparative form of the sentence: ‘Very few boys are as industrious as Zaman’",
    options: ["Zaman is one of the most industrious boys.", "Zaman is more industrious than most other boys.", "Zaman is really industrious like other boys.", "Zaman is as industrious as other boys."],
    answer: 1,
    explanation: "Correct comparative: 'Zaman is more industrious than most other boys.'"
  },
  {
    question: "Identify the appropriate preposition: Your opinion is identical _______ mine.",
    options: ["for", "in", "with", "by"],
    answer: 2,
    explanation: "Correct preposition is 'with'."
  },
  {
    question: "‘Paradise Lost’ attempted to –",
    options: ["justify the ways of man to God", "show that Satan and God have equal power", "justify the ways of God to man", "explain why both good and evil are necessary"],
    answer: 2,
    explanation: "It attempts to justify the ways of God to man."
  },
  {
    question: "“Oh, lift me as a wave, a leaf, a cloud! I fall upon the thorns of life! I bleed!” The extract is taken from P. B. Shelley’s poem –",
    options: ["The Cloud", "To a Skylark", "Ode to the West Wind", "Adonais"],
    answer: 2,
    explanation: "This is from 'Ode to the West Wind'."
  },
  {
    question: "Who wrote the story ‘The ant and the Grasshopper’?",
    options: ["Guy de Maupassant", "W. Somerset Maugham", "J. K. Rawlings", "O’ Henry"],
    answer: 1,
    explanation: "W. Somerset Maugham wrote this story."
  },
  {
    question: "The word ‘vital’ is a/an –",
    options: ["noun", "adverb", "adjective", "verb"],
    answer: 2,
    explanation: "'Vital' is an adjective."
  }
];

addSection(44, bcs44Questions);

// উদাহরণ Section 43
const bcs43Questions = [
  {
    question: "Who is not an Irish writer?",
    options: ["Oscar Wilde", "James Joyce", "Jonathan Swift", "D.W. Lawrence"],
    answer: 3,
    explanation: "D.W. Lawrence was an English writer, not Irish."
  },
  {
    question: "‘A herd of cattle is passing’. The underlined word ‘herd’ is an/a-",
    options: ["adverb", "adjective", "collective noun", "abstract noun"],
    answer: 2,
    explanation: "'Herd' is a collective noun."
  },
  {
    question: "What is the antonym for the word ‘deformation’?",
    options: ["distortion", "contortion", "wholeness", "disfigurement"],
    answer: 2,
    explanation: "'Wholeness' is the opposite of 'deformation'."
  },
  {
    question: "Words inscribed on a tomb is an-",
    options: ["epitome", "epithet", "episode", "epitaph"],
    answer: 3,
    explanation: "Words inscribed on a tomb are called an epitaph."
  },
  {
    question: "The phrase ‘dog days’ means –",
    options: ["hot weather", "cold shower", "rain-soaked streets", "ice storm"],
    answer: 0,
    explanation: "'Dog days' refers to hot weather."
  },
  {
    question: "Which gender is the word ‘orphan’?",
    options: ["neuter", "feminine", "common", "masculine"],
    answer: 2,
    explanation: "'Orphan' is of common gender."
  },
  {
    question: "What is the noun form of the word ‘laugh’?",
    options: ["laughing", "laughable", "laughter", "laughingly"],
    answer: 2,
    explanation: "'Laughter' is the noun form of 'laugh'."
  },
  {
    question: "Identify the word which is spelt incorrectly?",
    options: ["fluctuation", "remission", "ocassion", "decision"],
    answer: 2,
    explanation: "'Ocassion' is incorrect; the correct spelling is 'occasion'."
  },
  {
    question: "Change the voice: ‘Nobody trusts a traitor.’",
    options: [
      "A traitor is trusted.",
      "A traitor should not be trusted.",
      "Everybody hates a traitor.",
      "A traitor is not trusted by anybody."
    ],
    answer: 3,
    explanation: "The correct passive form is 'A traitor is not trusted by anybody.'"
  },
  {
    question: "Who wrote the play ‘The Way of the World’?",
    options: ["William Shakespeare", "William Congreve", "Ben Jonson", "Oscar Wilde"],
    answer: 1,
    explanation: "Written by William Congreve."
  },
  {
    question: "“Better to reign in Hell, than serve in Heav’n.” – Who wrote this?",
    options: ["Geoffrey Chaucer", "Christopher Marlowe", "John Milton", "P. B Shelley"],
    answer: 2,
    explanation: "This line is from John Milton's 'Paradise Lost'."
  },
  {
    question: "Who is not the Modern poet?",
    options: ["W.B Yeats", "W.H Auden", "John Keats", "T.S Eliot"],
    answer: 2,
    explanation: "John Keats was a Romantic poet, not Modern."
  },
  {
    question: "Who is the author of the novel “The God of Small Things”?",
    options: ["Thomas Hardy", "Jhumpa Lahiri", "R.K. Narayan", "Arundhati Roy"],
    answer: 3,
    explanation: "Arundhati Roy wrote 'The God of Small Things'."
  },
  {
    question: "‘Moby Dick’, a novel, was written by-",
    options: ["Herman Melville", "Nathaniel Hawthorne", "Mark Twain", "William Faulkner"],
    answer: 0,
    explanation: "Herman Melville wrote 'Moby Dick'."
  },
  {
    question: "“If winter comes, can spring be far behind?” – Who wrote this?",
    options: ["William Blake", "S.T Coleridge", "Lord Byron", "P. B Shelley"],
    answer: 3,
    explanation: "This line is from P. B. Shelley."
  },
  {
    question: "O Henry was from –",
    options: ["Canada", "America", "England", "Ireland"],
    answer: 1,
    explanation: "O Henry was an American writer."
  },
  {
    question: "Where is the setting of the play ‘Hamlet’?",
    options: ["England", "Italy", "France", "Denmark"],
    answer: 3,
    explanation: "The play 'Hamlet' is set in Denmark."
  },
  {
    question: "What is the adjective form of the word ‘people’?",
    options: ["populous", "popular", "popularity", "popularize"],
    answer: 0,
    explanation: "'Populous' is the adjective form."
  },
  {
    question: "‘He contemplated marrying his cousin.’ Here ‘marrying‘ is an/a-",
    options: ["present participle", "gerund", "verb", "infinitive"],
    answer: 1,
    explanation: "'Marrying' is a gerund here."
  },
  {
    question: "‘No Second Troy’ is a-",
    options: ["short story", "novel", "poem", "drama"],
    answer: 2,
    explanation: "'No Second Troy' is a poem."
  },
  {
    question: "The word ‘to genuflect’ means-",
    options: ["to be genuine", "to reflect", "to bend the knee", "to be flexible"],
    answer: 2,
    explanation: "To genuflect means 'to bend the knee'."
  },
  {
    question: "Fill in the blank: ‘She went to New Market __’",
    options: ["on foot", "on feet", "by foot", "by walking"],
    answer: 0,
    explanation: "Correct preposition: 'on foot'."
  },
  {
    question: "What kind of play is ‘Julius Caesar’?",
    options: ["romantic", "anti-romantic", "comedy", "historical"],
    answer: 3,
    explanation: "'Julius Caesar' is a historical play by Shakespeare."
  },
  {
    question: "Fill in the gap: Birds fly ____ in the sky.",
    options: ["random", "at large", "at a stitch", "are long"],
    answer: 1,
    explanation: "'At large' means free or unrestrained."
  },
  {
    question: "Who is the author of ‘Jane Eyre’?",
    options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "Mary Shelley"],
    answer: 0,
    explanation: "Charlotte Brontë wrote 'Jane Eyre'."
  },
  {
    question: "Which of the following novels is not written by an English writer?",
    options: ["A Passage of India", "Sons and Lovers", "One Hundred Years of Solitude", "Pride and Prejudice"],
    answer: 2,
    explanation: "'One Hundred Years of Solitude' was written by Gabriel Garcia Marquez, a Colombian author."
  },
  {
    question: "A speech full of too many words is –",
    options: ["a big speech", "maiden speech", "a verbose speech", "an unimportant speech"],
    answer: 2,
    explanation: "A verbose speech is wordy or long-winded."
  },
  {
    question: "Who is the poet of the poem ‘Ozymandias’?",
    options: ["P. B. Shelley", "William Wordsworth", "S.T Coleridge", "John Keat"],
    answer: 0,
    explanation: "P. B. Shelley wrote 'Ozymandias'."
  },
  {
    question: "The most famous romantic poet of English literature is-",
    options: ["John Dryden", "Alexander Pope", "William Wordsworth", "T.S Eliot"],
    answer: 2,
    explanation: "William Wordsworth is the most famous Romantic poet."
  },
  {
    question: "Identify the correct synonym of the word ‘magnanimous’.",
    options: ["unkind", "generous", "revengeful", "friendly"],
    answer: 1,
    explanation: "'Magnanimous' means generous."
  },
  {
    question: "Choose the right form of verb: It is high time we (act) on the matter.",
    options: ["are acting", "acted", "have acted", "could act"],
    answer: 1,
    explanation: "Correct form: 'acted'."
  },
  {
    question: "____ was both a poet and a painter.",
    options: ["John Keats", "Spenser", "William Blake", "John Donne"],
    answer: 2,
    explanation: "William Blake was both a poet and painter."
  },
  {
    question: "Identify the correct sentence:",
    options: [
      "The girl burst out tears.",
      "The girl burst into tears.",
      "The girl burst with tears.",
      "The girl bursted out tears."
    ],
    answer: 1,
    explanation: "'Burst into tears' is correct; it means to suddenly start crying."
  },
  {
    question: "The phrase ‘sine die’ means-",
    options: ["half-heartedly", "doubtfully", "fixed", "uncertain"],
    answer: 3,
    explanation: "'Sine die' means without a fixed date or uncertain."
  },
  {
    question: "Do you have any money ____ you? (Fill in the blank)",
    options: ["to", "over", "in", "on"],
    answer: 3,
    explanation: "Correct preposition: 'on'."
  }
];


addSection(43, bcs43Questions);


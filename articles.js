// Article data (can be replaced with dynamic data later)
const articles = [
  {
    id: 1,
    title: 'The Sudanese Civil War',
    author: 'Tyam Mohamed',
    image: './Article/Sudanese Civil War.png',
    body: `What are the origins of the Sudanese Civil war?
Imagine having a worthless piece of gold; you might ask, "How does gold become worthless?" Well, this is the sad case for the country of Sudan. Even before gaining independence in 1956, Sudan had faced several civil wars and coups. The first major civil war lasted from 1955 to 1976, mostly due to the internal divide between the wealthier northern region, with a majority of Muslim Arabs, and the undeveloped southern region, with a majority of Christians. The southern regions rebelled against the centralized government in Khartoum. Considered one of the longest African civil wars, the death toll for the first Sudanese civil war was estimated to be 500,000 to 1 million deaths. Thankfully, the Addis Ababa agreement granted autonomy for the south temporarily; however, it didn't last long, since renewed tensions sparked in 1983, which lasted until 2006. Similarly, conflicts rose up in response to imposing the Islamic Law (Sharia) nationwide. The Sudan People's Liberation Army/Movement (SPLA/M) was a key player in the conflict that fought for the south. The turning point in this war was signing the Comprehensive Peace Agreement in 2005, which ended the war by granting the south a 6-year autonomy period, after which the south will gain independence. Subsequently, in 2011, South Sudan was announced as an independent country, making it the 54th African independent state. Despite the secession of South Sudan, internal conflicts continued in Sudan. The Darfur region, known for its violence and mass displacement, has been the focal point since the 2000s. After the revolution in December 2018, overthrowing the longtime dictator Omar Al-Bashir, there was great hope for turning Sudan into a democratic, civilian-led country; unfortunately, this hope didn't last long. In October 2021, two of the biggest military coups formed a joint government to rule the country: the Sudanese Armed Forces (SAF), led by General Abdel-Fattah Al-Burhan, and the Rapid Support Forces (RSF), led by General Mohamed Hammadan—also known as Hamediti. The weak alliance between them started gradually breaking until shots were unleashed on the 15th of April 2023, marking the beginning of a third civil war.

The RSF
Since the beginning of the 21st century, the Darfur region in Sudan, located in the western borders of Sudan, has had prolonged conflicts due to ethnic problems. 2003 marked the extreme rebelling of the Darfur region, which made the former president Omar Al-Bahir stop this rebel by force. That results in the Darfur war, which took away the lives of 300,000 and displaced 2.7 million people.
To destroy the uprising of non-Arabian tribes in the Nuba Mountains, located in South Sudan, Al-Bashir relied on a collection of Arab militias known as the Al-Janjaweed. In 2013, Al-Bashir announced that these militias would be known as the Rapid Support Force (RSF) and would be under the control of General Mohamed Hamdan, also known as Hamediti.
Al-Bashir relied on this force too often. In 2013, he sent them to fight against the rebels in Darfur and sent them to Libya and Yemen to fight. During this period, the RSF units developed relationships with the Russian private military Wagner Group. This secured thousands of weapons and personnel for them.

The Civil War
After tension between both sides, conflicts started growing rapidly, focusing on key locations. One of the most important locations is the capital, Khartoum. Khartoum instantly divided between the two forces, and Al-Burhan located his government in Port Sudan. At the beginning, the RSF managed to take control over the capital and the presidential palace; however, the SAF started slowly taking over control. It began by taking control over the center of Omdurman, one of the three cities that form Sudan's wide capital. In recent months, the army managed to recapture Al-Gezira and El-Fasher. Finally, as of May 2025, the SAF successfully took control over the majority of the capital and, most importantly, recaptured the presidential palace. After planning and occupying strategic locations on both the White and Blue Rivers, the SAF has imposed control on key locations. Outside the capital, the SAF managed to control the Red Sea shore, most of the North, the Ethiopian borders, and urban cities in Darfur.

How civilians are affected by the war
The civil war in Sudan has pretty huge costs, with over 150,000 deaths and over 14 million displacements. The RSF has besieged multiple urban cities and key institutions. The RSF has been accused of genocide and sexual violence. It was estimated as 30 cases of rape per day for women and girls as young as 15 years old in Khartoum, accompanied by severe beatings using sharp blades or gunfire. In addition to that, according to Action Against Hunger, over 35 million Sudanese people need food aid.

International involvements to stop war
After the war erupted, global attention was grabbed by the United Nations after the United Nations Human Rights Council called an immediate session to address the violence. On the 6th of May 2023, the RSF and the SAF's delegates met directly for the first time in Jeddah. After multiple negotiations, both delegates signed a treaty known as the Treaty of Jeddah on May 20 of the same year. It was signed by Saudi Arabia, the United States of America, and both Sudanese delegates. The treaty was made to ensure a long-term ceasefire between the two sides. The treaty stated the following:
• Agree that the interests and well-being of the Sudanese people are our top priority and to   ensure that civilians are protected at all times. 
•  Respect international humanitarian law and international human rights law; for instance, they obligate differentiation between civilians and military targets, not using civilians as human shields, and respecting public and private institutions.
• Commit to exert all efforts to ensure that these commitments—and all obligations of International Humanitarian Law—are fully disseminated within our ranks and appoint focal points to engage with humanitarian actors to facilitate their activities.
• Allow relevant actors, such as the Sudanese Red Crescent and/or the International Committee of the Red Cross, to take all steps needed to bury the dead in coordination with relevant authorities.
• Ensuring that all people operate under the instructions of the armed forces and the RSF abide by International Humanitarian Law.
• Prioritize talks to reach a short-term ceasefire to ease the delivery of urgent humanitarian aid and restore essential services, and commit to scheduling more expanded discussions to reach a permanent end to hostilities.
However, all these statements were broken only 48 hours after signing this treaty, after the RSF started shooting again in the capital of Khartoum`
  }
];

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalArticleImage = document.getElementById('modalArticleImage');
const modalArticleTitle = document.getElementById('modalArticleTitle');
const modalArticleAuthor = document.getElementById('modalArticleAuthor');
const modalArticleBody = document.getElementById('modalArticleBody');

function formatArticleBody(body) {
  // Titles to bold
  const titles = [
    'What are the origins of the Sudanese Civil war?',
    'The RSF',
    'The Civil War',
    'How civilians are affected by the war',
    'International involvements to stop war'
  ];

  // Handle lists: convert bullet points to <ul><li>...</li></ul>
  // Split by double newlines for paragraphs
  let paragraphs = body.split(/\n\n+/);
  let html = '';
  let inList = false;
  let listItems = [];

  for (let i = 0; i < paragraphs.length; i++) {
    let trimmed = paragraphs[i].trim();
    // Check if this paragraph is a list (starts with • or contains multiple •)
    if (trimmed.startsWith('•')) {
      // Split into lines and filter out empty ones
      let items = trimmed.split(/\n/).filter(line => line.trim().startsWith('•'));
      listItems = items.map(line => line.replace(/^•\s*/, '').trim());
      // Add a small margin before the list
      html += `<ul class='article-list'>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
      continue;
    }
    // Check if paragraph starts with a title
    let isTitle = false;
    for (const title of titles) {
      if (trimmed.startsWith(title)) {
        // Split title and the rest of the paragraph
        const rest = trimmed.slice(title.length).trim();
        html += `<strong style='display:block;margin-bottom:2px;'>${title}</strong>`;
        if (rest) {
          html += `<p style='text-indent:2em; margin:0 0 10px 0;'>${rest.replace(/\n/g, '<br>')}</p>`;
        }
        isTitle = true;
        break;
      }
    }
    if (!isTitle) {
      // Indent every normal paragraph
      html += `<p style='text-indent:2em; margin:0 0 10px 0;'>${trimmed.replace(/\n/g, '<br>')}</p>`;
    }
  }
  // Add author signature at the end, left-aligned
  html += "<div class='article-author-signature' style='text-align:left;'>Written by: Tyam Mohamed</div>";
  return html;
}

function openModal(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  modalArticleImage.style.backgroundImage = `url('${article.image}')`;
  modalArticleTitle.textContent = article.title;
  modalArticleBody.innerHTML = formatArticleBody(article.body);
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
  // Open modal on card click
  const cards = document.querySelectorAll('.article-card');
  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = parseInt(card.getAttribute('data-article'), 10);
      openModal(id);
    });
  });

  // Close modal on close button
  modalClose.addEventListener('click', closeModal);

  // Close modal on overlay click (but not modal content)
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}); 
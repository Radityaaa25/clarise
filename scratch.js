const fs = require('fs');
const content = fs.readFileSync('apps/app/scripts/seed-devops-aws-premium.ts', 'utf-8');
const modulesRegex = /modules:\s*\[([\s\S]*?)\]\s*}\);\s*}/;
const match = content.match(modulesRegex);
if (match) {
  const modulesString = match[1];
  const modules = modulesString.split('slug:').slice(1);
  modules.forEach((mod, i) => {
    const slugMatch = mod.match(/^\s*[\`"']([^`"']+)[\`"']/);
    const slidesBlock = mod.split('slides: [')[1];
    if (slidesBlock) {
      const slides = slidesBlock.split('type:').slice(1);
      console.log('Module ' + (i+1) + ' (' + (slugMatch ? slugMatch[1] : 'unknown') + '): ' + slides.length + ' slides');
      let countLesson = 0, countChallenge = 0, countQuiz = 0, countSummary = 0;
      slides.forEach(s => {
        if(s.includes('"lesson"')) countLesson++;
        if(s.includes('"challenge"')) countChallenge++;
        if(s.includes('"quiz"')) countQuiz++;
        if(s.includes('"summary"')) countSummary++;
      });
      console.log('  -> lessons: ' + countLesson + ', challenges: ' + countChallenge + ', summaries: ' + countSummary + ', quizzes: ' + countQuiz);
    }
  });
} else { console.log('regex mismatch'); }

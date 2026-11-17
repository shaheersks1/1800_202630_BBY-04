export function renderScheduleUI(jsonData, containerElement, onSaveProgress = null) {
  let goalTasksTotal = 0;
  let goalTasksCompleted = 0;

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const calendarData = {
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
  };

  jsonData.schedule.forEach(item => {
    const cat = (item.category || "").toLowerCase();
    item.isStatic = cat.includes('school') || cat.includes('work');
    item.completed = Boolean(item.completed);
    
    if (!item.isStatic) {
      goalTasksTotal++;
      if (item.completed) goalTasksCompleted++;
    }

    if (calendarData[item.day]) {
      calendarData[item.day].push(item);
    }
  });

  containerElement.innerHTML = '';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'schedule-header';
  
  const progressHtml = goalTasksTotal > 0 ? `
    <div class="progress-container">
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="goal-progress-fill"></div>
      </div>
      <p id="goal-progress-text">0 / ${goalTasksTotal} goal tasks completed</p>
    </div>
  ` : '';

  headerDiv.innerHTML = `<h2>Goal Plan: ${jsonData.goal}</h2>${progressHtml}`;
  containerElement.appendChild(headerDiv);

  const filterDiv = document.createElement('div');
  filterDiv.className = 'filter-container';
  filterDiv.innerHTML = `
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="static">School & Work Only</button>
    <button class="filter-btn" data-filter="goal">Goal Tasks Only</button>
  `;
  containerElement.appendChild(filterDiv);

  const calendarWrapper = document.createElement('div');
  calendarWrapper.className = 'calendar-wrapper';

  const updateProgress = () => {
    if (goalTasksTotal === 0) return;
    const percentage = (goalTasksCompleted / goalTasksTotal) * 100;
    document.getElementById('goal-progress-fill').style.width = `${percentage}%`;
    document.getElementById('goal-progress-text').innerText = `${goalTasksCompleted} / ${goalTasksTotal} goal tasks completed`;
  };

  updateProgress();

  const allEventElements = [];

  daysOfWeek.forEach(day => {
    const colDiv = document.createElement('div');
    colDiv.className = 'calendar-col';
    colDiv.innerHTML = `<div class="calendar-col-header">${day}</div>`;
    
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'calendar-events';

    const dayEvents = calendarData[day];
    dayEvents.sort((a, b) => (a.time || "").localeCompare(b.time || ""));

    dayEvents.forEach(item => {
      const eventBlock = document.createElement('div');
      eventBlock.className = `cal-event ${item.isStatic ? 'static' : 'interactive'}`;
      if (item.completed) eventBlock.classList.add('completed');
      eventBlock.dataset.type = item.isStatic ? 'static' : 'goal';
      
      eventBlock.innerHTML = `
        <span class="time-label">${item.time}</span>
        <p class="task-desc">${item.task}</p>
        <span class="cat-label">${item.category}</span>
      `;

      if (!item.isStatic) {
        eventBlock.addEventListener('click', () => {
          item.completed = !item.completed;
          eventBlock.classList.toggle('completed', item.completed);
          
          item.completed ? goalTasksCompleted++ : goalTasksCompleted--;
          updateProgress();

          if (onSaveProgress) {
            onSaveProgress(jsonData.schedule);
          }
        });
      }

      eventsContainer.appendChild(eventBlock);
      allEventElements.push(eventBlock);
    });

    colDiv.appendChild(eventsContainer);
    calendarWrapper.appendChild(colDiv);
  });

  containerElement.appendChild(calendarWrapper);

  const filterBtns = filterDiv.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const filterType = e.target.dataset.filter;
      
      allEventElements.forEach(ev => {
        if (filterType === 'all') {
          ev.style.display = 'block';
        } else if (filterType === 'static' && ev.dataset.type === 'static') {
          ev.style.display = 'block';
        } else if (filterType === 'goal' && ev.dataset.type === 'goal') {
          ev.style.display = 'block';
        } else {
          ev.style.display = 'none';
        }
      });
    });
  });
}